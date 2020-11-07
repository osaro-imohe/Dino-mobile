import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../screens/AppIntro/styles";
import getStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import { Image } from "react-native";
import { colors } from "../../utils";
import { Context } from "../../context";
import { NewPostError } from "../Errors/index";
import { useMutation, useReactiveVar } from "@apollo/client";
import { CreatePost } from "../../graphql/mutations/Posts";
import { currentGroupVar } from "../../graphql/reactivevariables";

type Props = {
  showModal: boolean;
  setShowModal: any;
};

const NewPost = ({ showModal, setShowModal }: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  const { state, setState } = useContext(Context);

  const [post, setPost] = useState("");

  const [
    createPost,
    {
      loading: createPostLoading,
      error: createPostError,
      data: createPostData,
    },
  ] = useMutation(CreatePost, {
    onError: (error) => {
      console.log(`error: ${error.message}`);
    },
    onCompleted: () => {
      setPost("");
      setShowModal(!showModal);
    },
  });

  const currentGroup = useReactiveVar(currentGroupVar);

  const submitPost = () => {
    createPost({
      variables: {
        message: post,
        user_id: parseInt(state.userId),
        group_id: currentGroup.id,
      },
    });
  };

  return (
    <View style={styles.newPostContainer}>
      <Text
        style={styles.newPostCancel}
        onPress={() => {
          setShowModal(!showModal);
        }}
      >
        Cancel
      </Text>
      {createPostError ? (
        <NewPostError errorMessage={createPostError?.message} />
      ) : null}
      <View style={styles.newPostAlign}>
        <Image style={styles.newPostUserImage} />
        <TextInput
          value={post}
          multiline={true}
          style={styles.newPostInput}
          selectionColor={colors.cherry}
          placeholder="What's going on?"
          placeholderTextColor={colors.dork}
          onChangeText={(text) => setPost(text)}
        />
      </View>
      <TouchableOpacity
        style={
          post.length > 0 ? styles.newPostSend : styles.newPostSendDisabled
        }
        disabled={post.length > 0 ? false : true}
        onPress={submitPost}
      >
        <Text style={styles.newPostSendText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewPost;
