import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import getStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import Post from "../../../components/Post";
import { colors } from "../../../utils";
import Icon from "../../../assets/icons";
import { useState } from "react";
import NewPost from "../../../components/NewPost";
import { useReactiveVar } from "@apollo/client";
import { currentGroupVar } from "../../../graphql/reactivevariables";

const url = `https://images.unsplash.com/photo-1503963325714-4b88d72d7ada?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80`;

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const currentGroup = useReactiveVar(currentGroupVar);

  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return (
    <View style={styles.homeContainer}>
      <NewPost showModal={showModal} setShowModal={setShowModal} />
      <Text style={styles.homeGroupName}>{currentGroup.name}</Text>
      <ScrollView style={styles.homeScrollView}>
        {/* below is a post component */}
        {/* <Post
          first_name="james"
          last_name="dashner"
          profile_image_url=""
          image_url={url}
          post="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio ullam nobis, totam dolore ipsum voluptates corporis pariatur cupiditate consectetur eaque amet aut ab animi labore nostrum alias illo facilis tempore?"
        />
        */}
      </ScrollView>
      <TouchableOpacity
        style={styles.newPost}
        onPress={() => setShowModal(!showModal)}
      >
        <Icon name="pen" color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
