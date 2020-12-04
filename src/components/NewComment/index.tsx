import React, { useState, useContext } from "react";
import { useColorScheme } from "react-native-appearance";
import getStyles from "./styles";
import { Context } from "../../context";
import { View, Text, TextInput } from "react-native";
import { useMutation } from "@apollo/client";
import { CreateNewComment } from "../../graphql/mutations/Comments";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  userName: string;
  postId: number;
  comments: any;
  setComments: any;
};

const NewComment = ({ userName, postId, comments, setComments }: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  const { state, setState } = useContext(Context);

  const [comment, setComment] = useState("");
  const [
    createComment,
    {
      loading: createCommentLoading,
      error: createCommentError,
      data: createDataError,
    },
  ] = useMutation(CreateNewComment, {
    onCompleted: (data) => {
      setComment("");
      setComments([data.CreateComment, ...comments]);
    },
  });

  return (
    <View style={styles.newCommentContainer}>
      <Text style={styles.newCommentHeader}>
        Replying - <Text style={styles.newCommentHeaderBolds}>{userName}</Text>
      </Text>
      <TextInput
        style={styles.newCommentInput}
        multiline={true}
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <TouchableOpacity
        style={
          comment === ""
            ? styles.newCommentButtonDisabled
            : styles.newCommentButton
        }
        disabled={comment === "" ? true : false}
        onPress={() =>
          createComment({
            variables: {
              user_id: parseInt(state.userId),
              post_id: postId,
              message: comment,
            },
          })
        }
      >
        <Text style={styles.newCommentButtonText}>Reply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewComment;
