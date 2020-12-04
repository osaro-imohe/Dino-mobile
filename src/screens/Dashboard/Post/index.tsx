import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import getStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import { useReactiveVar } from "@apollo/client";
import NewComment from "../../../components/NewComment";
import { currentPostVar } from "../../../graphql/reactivevariables";
import { colors, getHeight, getWidth } from "../../../utils";
import { GetComments } from "../../../graphql/queries/Comments";
import { useLazyQuery } from "@apollo/client";
import Comment from "../../../components/Comment";
import { LoadCommentsError } from "../../../components/Errors/index";
import Icon from "../../../assets/icons";
import ImageLoader from "../../../components/ImageLoader";

type UserType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

type CommentType = {
  id: number;
  post_id: number;
  message: string;
  User: UserType;
};

const Post = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const currentPost = useReactiveVar(currentPostVar);
  const [latestCommentId, setLatestCommentId] = useState(0);
  const [oldestCommentId, setOldestCommentId] = useState(0);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [imageLoading, setImageLoading] = useState(true);

  const [getComments, { loading, error, data }] = useLazyQuery(GetComments, {
    fetchPolicy: "network-only",
    variables: {
      post_id: currentPost.id,
      referenceCommentId: latestCommentId,
      reference: "new",
    },
    onCompleted: (data) => {
      if (comments.length > 0) {
        let returnedData = [...data.GetComments];
        const dataIds = new Set(comments.map(({ id }) => id));

        const combined = [
          ...returnedData.filter(({ id }) => !dataIds.has(id)),
          ...comments,
        ];
        setComments([...combined]);
      } else {
        setComments([...data.GetComments, ...comments]);
      }
      if (data.GetComments[0]) {
        const latest = data.GetComments[0];
        const oldest = data.GetComments[data.GetComments.length - 1];
        setLatestCommentId(latest.id);
        setOldestCommentId(oldest.id);
      }
      console.log(latestCommentId);
      console.log(oldestCommentId);
    },
  });

  useEffect(() => {
    getComments();
    console.log(data);
    return () => {
      currentPostVar({
        id: 0,
        firstName: "",
        lastName: "",
        message: "",
        numberOfLikes: 0,
        numberOfComments: 0,
        postImageUrl: "",
        profileImageUrl: "",
      });
    };
  }, []);

  useEffect(() => {});

  const FlatListHeader = () => {
    return (
      <>
        <View style={{ width: "100%" }}>
          <View style={styles.postAlign}>
            {currentPost.profileImageUrl === "" ||
            currentPost.profileImageUrl === null ? (
              <View style={styles.noPostProfileImage}>
                <Icon name="user" color={colors.dork} />
              </View>
            ) : (
              <Image
                source={{ uri: "hello" }}
                style={styles.postProfileImage}
              />
            )}
            <Text style={styles.postUser}>
              {currentPost.firstName} {currentPost.lastName}
            </Text>
          </View>
          <Text style={styles.postMessage}>{currentPost.message}</Text>
          {currentPost.postImageUrl !== "" ? (
            <View>
              <Image
                source={{ uri: currentPost.postImageUrl }}
                style={styles.postImage}
                onLoad={() => setImageLoading(false)}
              />
              {imageLoading ? (
                <ImageLoader
                  width="100%"
                  height={getHeight(150)}
                  marginTop={getHeight(10)}
                  marginBottom={getHeight(10)}
                  borderRadius={8}
                  colorScheme={colorScheme}
                />
              ) : null}
            </View>
          ) : null}
        </View>
        <NewComment
          userName={`${currentPost.firstName} ${currentPost.lastName}`}
          postId={currentPost.id}
          comments={comments}
          setComments={setComments}
        />
      </>
    );
  };

  const FlatListFooter = () => {
    let data = null;
    if (error) data = <LoadCommentsError errorMessage={error.message} />;
    return data;
  };

  const renderItems = ({ item }: { item: any }) => {
    console.log(JSON.stringify(item.User.profile_picture_url));
    return (
      <Comment
        first_name={item.User.first_name}
        last_name={item.User.last_name}
        comment={item.message}
        profile_picture_url={item.User.profile_picture_url}
      />
    );
  };

  return (
    <SafeAreaView style={styles.postContainer}>
      <Text style={styles.postHeader}>Post</Text>
      <FlatList
        ListHeaderComponent={FlatListHeader}
        ListFooterComponent={FlatListFooter}
        style={styles.postFlatList}
        data={comments}
        renderItem={renderItems}
        onRefresh={getComments}
        refreshing={loading}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* {error ? <LoadCommentsError errorMessage={error.message}/> : null } */}
    </SafeAreaView>
  );
};

export default Post;
