import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import getStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import Icon from "../../assets/icons";
import { Video } from "expo-av";
import { assertStatusValuesInBounds } from "expo-av/build/AV";
import { colors, getWidth } from "../../utils";

type Post = {
  first_name: string;
  last_name: string;
  profile_image_url: string;
  post: string;
  image_url: string;
};

const Post = ({
  first_name,
  last_name,
  profile_image_url,
  post,
  image_url,
}: Post) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  const showImage = () => {
    if (image_url !== "")
      return (
        <Image
          source={{
            uri: `https://images.unsplash.com/photo-1503963325714-4b88d72d7ada?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80`,
          }}
          style={styles.postImage}
        />
      );
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postAlign}>
        <Image source={{ uri: "hello" }} style={styles.postProfileImage} />
        <Text style={styles.postUser}>
          {first_name} {last_name}
        </Text>
        <Text style={styles.postTime}>Posted 30 minutes ago</Text>
      </View>
      {showImage()}
      <Text style={styles.postMessage}>{post}</Text>
      <View style={styles.postIconsAlign}>
        <View style={styles.postAlign}>
          <Icon name="comments" />
          <Text style={styles.postActivityCounter}>10</Text>
        </View>
        <View style={styles.postAlign}>
          <Icon name="like" style={styles.postLike} />
          <Text style={styles.postActivityCounter}>10</Text>
        </View>
      </View>
    </View>
  );
};

export default Post;
