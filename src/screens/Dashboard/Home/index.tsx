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

const url = `https://images.unsplash.com/photo-1503963325714-4b88d72d7ada?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80`;

const Home = () => {
  const currentGroup = useReactiveVar(currentGroupVar);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0);

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
      currentGroupVar({
        id: newestGroup.id,
        name: newestGroup.name,
        photoUrl: newestGroup.photo_url,
        inviteCode: newestGroup.invite_code,
        description: newestGroup.description,
        adminUserId: newestGroup.admin_user_id,
        numberOfMembers: newestGroup.number_of_members,
      });
    },
  });

  const [getPosts,{
    loading: getPostsLoading,
    error: getPostsError,
    data: getPostsData,
  }] = useLazyQuery(GetPosts, {
    variables: {
      group_id: currentGroup.id,
      page,
    },
  });

  useEffect(() => {
    getPosts()
  }, [])

  const renderPost = ({ item }: any) => (
    <Post
      first_name={item.User.first_name}
      last_name={item.User.last_name}
      profile_image_url=""
      post={item?.message}
      image_url=""
      key={item?.id}
      // when you add images put their url in the properties below to render them
      // profile_image_url={item.profile_image_url}
      // image_url={item.image_url}
    />
  );

  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return getGroupsData?.GetGroups?.groups?.length !== 0 ? (
    <View style={styles.homeContainer}>
      {showModal ? (
        <NewPost showModal={showModal} setShowModal={setShowModal} />
      ) : null}
      <Text style={styles.homeGroupName}>{currentGroup.name}</Text>
      <View style={{ height: "100%" }}>
        {getPostsError ? (
          <TouchableOpacity
            onPress={() => refetchPosts()}
          >
            <GetPostsError
            errorMessage={`${getPostsError.message}, click here to retry`}
          />
          </TouchableOpacity>
        ) : null}
        {getPostsLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={getPostsData?.GetPosts.posts}
            renderItem={renderPost}
            onEndReached={() => {
              setPage(page + 1)   
              getPosts()       
            }}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.newPost}
        onPress={() => setShowModal(!showModal)}
      >
        <Icon name="pen" color={colors.white} />
      </TouchableOpacity>
      <Text>{JSON.stringify(getPostsData ? getPostsData : null)}</Text>
    </View>
  ) : (
    <View style={styles.homeContainer}>
      <Text style={styles.homeGroupName}>You aren't in any groups</Text>
    </View>
  );
};

export default Home;
