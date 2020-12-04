import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import getStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import Icon from "../../assets/icons";
import { currentPostVar } from "../../graphql/reactivevariables";
import { colors, getHeight, getWidth } from "../../utils";
import ImageLoader from "../ImageLoader";

type Post = {
  id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  post: string;
  image_url: string;
  navigation: any;
  number_of_comments: any;
  number_of_likes: any;
  created_at: string;
};

const Post = ({
  id,
  first_name,
  last_name,
  profile_image_url,
  post,
  image_url,
  navigation,
  number_of_comments,
  number_of_likes,
  created_at,
}: Post) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const [liked, setLiked] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => {
        currentPostVar({
          id,
          firstName: first_name,
          lastName: last_name,
          message: post,
          numberOfLikes: 0,
          numberOfComments: 0,
          postImageUrl: image_url,
          profileImageUrl: profile_image_url,
        });
        navigation.navigate("Post");
      }}
    >
      <View style={styles.postAlign}>
        {profile_image_url === "" ? (
          <View style={styles.noPostProfileImage}>
            <Icon name="user" color={colors.dork} />
          </View>
        ) : (
          <Image source={{ uri: "hello" }} style={styles.postProfileImage} />
        )}
        <Text style={styles.postUser}>
          {first_name} {last_name}
        </Text>
        <Text style={styles.postTime}>
          Posted {new Date(parseInt(created_at)).toDateString()}
        </Text>
      </View>

      {image_url === "" ? null : (
        <View>
          <Image
            source={{ uri: image_url }}
            style={styles.postImage}
            onLoad={() => setImageLoading(false)}
          />
          {imageLoading ? (
            <ImageLoader
              width="80%"
              height={getHeight(120)}
              marginLeft={50 + getWidth(10)}
              marginBottom={10}
              borderRadius={8}
              colorScheme={colorScheme}
            />
          ) : null}
        </View>
      )}

      <Text style={styles.postMessage}>{post}</Text>
      <View style={styles.postIconsAlign}>
        <View style={styles.postAlign}>
          <Icon name="comments" />
          <Text style={styles.postActivityCounter}>{number_of_comments}</Text>
        </View>
        <TouchableOpacity style={styles.postAlign}>
          {liked ? (
            <Icon name="liked" style={styles.postLike} />
          ) : (
            <Icon name="like" style={styles.postLike} />
          )}
          <Text style={styles.postActivityCounter}>{number_of_likes}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Post;
