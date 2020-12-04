import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import getStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import Post from "../../../components/Post";
import { colors } from "../../../utils";
import Icon from "../../../assets/icons";
import { useState } from "react";
import { Context } from "../../../context";
import NewPost from "../../../components/NewPost";
import { useReactiveVar } from "@apollo/client";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GetPostsError } from "../../../components/Errors";
import { GetGroups } from "../../../graphql/queries/Groups";
import { GetPosts } from "../../../graphql/queries/Posts";
import { currentGroupVar } from "../../../graphql/reactivevariables";
import { ScreenProp } from "../../../definition";

type UserTypes = {
  id: number;
  email: number;
  first_name: string;
  last_name: string;
};

type PostType = {
  id: number;
  message: string;
  user_id: number;
  group_id: number;
  number_of_likes: number;
  Number_of_comments: number;
  User: UserTypes;
};

const Home = ({ navigation }: ScreenProp) => {
  const currentGroup = useReactiveVar(currentGroupVar);
  const [showModal, setShowModal] = useState(false);
  const [latestPostId, setLatestPostId] = useState(0);
  const [oldestPostId, setOldestPostId] = useState(0);
  const [data, setData] = useState<PostType[]>([]);

  const { state } = useContext(Context);

  const {
    loading: getGroupsLoading,
    error: getGroupsError,
    data: getGroupsData,
    refetch: refetchPosts,
  } = useQuery(GetGroups, {
    variables: {
      user_id: parseInt(state.userId),
    },
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.log(error.message);
    },
    onCompleted: () => {
      const groups = getGroupsData.GetGroups.groups;
      const newestGroup = groups[groups.length - 1];
      if (newestGroup) {
        currentGroupVar({
          id: newestGroup.id,
          name: newestGroup.name,
          photoUrl: newestGroup.photo_url,
          inviteCode: newestGroup.invite_code,
          description: newestGroup.description,
          adminUserId: newestGroup.admin_user_id,
          numberOfMembers: newestGroup.number_of_members,
        });
      }
    },
  });

  const [
    getLatestPosts,
    {
      loading: getLatestPostsLoading,
      error: getLatestPostsError,
      data: getLatestPostsData,
    },
  ] = useLazyQuery(GetPosts, {
    fetchPolicy: "network-only",
    variables: {
      group_id: currentGroup.id,
      referencePostId: latestPostId,
      reference: "new",
    },
    onCompleted: async (newdata) => {
      console.log("new data:", newdata);
      //check for and remove duplicates in list
      if (data.length > 0) {
        let returnedData = [...newdata.GetPosts.posts];

        const dataIds = new Set(data.map(({ id }) => id));
        const combined = [
          ...returnedData.filter(({ id }) => !dataIds.has(id)),
          ...data,
        ];
        setData([...combined]);
      } else {
        setData([...newdata.GetPosts.posts, ...data]);
      }
      if (newdata.GetPosts.posts[0]) {
        const latest = newdata.GetPosts.posts[0];
        const oldest =
          newdata.GetPosts.posts[newdata.GetPosts.posts.length - 1];
        setOldestPostId(oldest.id);
        setLatestPostId(latest.id);
      }
      console.log(latestPostId, oldestPostId);
    },
  });

  const [
    getOlderPosts,
    {
      loading: getOlderPostsLoading,
      error: getOlderPostsError,
      data: getOlderPostsData,
    },
  ] = useLazyQuery(GetPosts, {
    fetchPolicy: "network-only",
    variables: {
      group_id: currentGroup.id,
      referencePostId: oldestPostId,
      reference: "old",
    },
    onCompleted: (newdata) => {
      console.log("new data:", newdata);
      if (newdata.GetPosts.posts[0]) {
        const oldest =
          newdata.GetPosts.posts[newdata.GetPosts.posts.length - 1];
        setOldestPostId(oldest.id);
      }
      setData([...data, ...newdata.GetPosts.posts]);
    },
  });

  useEffect(() => {
    setData([]);
    setLatestPostId(0);
    getLatestPosts();
  }, [currentGroup.id]);

  const renderPost = ({ item }: any) => (
    <Post
      id={item.id}
      first_name={item.User.first_name}
      last_name={item.User.last_name}
      profile_image_url=""
      post={item?.message}
      number_of_comments={item?.number_of_comments}
      number_of_likes={item?.number_of_likes}
      image_url={item?.image_url}
      created_at={item?.createdAt}
      navigation={navigation}
    />
  );

  const noPosts = () => {
    let message = null;
    if (!getLatestPostsLoading && data.length === 0) {
      message = (
        <Text style={styles.noposts}>
          There aren't any posts in this group. Say hi or share a status update.
        </Text>
      );
    } else {
      message = null;
    }
    return message;
  };

  const oldPostsLoading = () => {
    let loader;
    if (getOlderPostsLoading) {
      loader = <ActivityIndicator />;
    } else {
      loader = null;
    }
    return loader;
  };

  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return getGroupsData?.GetGroups?.groups?.length !== 0 ? (
    <View style={styles.homeContainer}>
      {showModal ? (
        <NewPost
          showModal={showModal}
          setShowModal={setShowModal}
          setData={setData}
          data={data}
        />
      ) : null}
      <TouchableOpacity onPress={() => navigation.navigate("GroupSettings")}>
        <Text style={styles.homeGroupName}>{currentGroup.name}</Text>
      </TouchableOpacity>
      <View style={{ height: "100%" }}>
        {getLatestPostsError ? (
          <TouchableOpacity onPress={() => refetchPosts()}>
            <GetPostsError
              errorMessage={`${getLatestPostsError.message}, click here to retry`}
            />
          </TouchableOpacity>
        ) : null}

        <FlatList
          data={data}
          renderItem={renderPost}
          ListEmptyComponent={noPosts}
          ListFooterComponent={oldPostsLoading}
          onRefresh={getLatestPosts}
          refreshing={getLatestPostsLoading}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <TouchableOpacity
        style={styles.newPost}
        onPress={() => setShowModal(!showModal)}
      >
        <Icon name="pen" color={colors.white} />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.homeContainer}>
      <Text style={styles.homeNoGroups}>
        Welcome to School & I!
        {"\n"}
        Join or create a group to get started
      </Text>
    </View>
  );
};

export default Home;
