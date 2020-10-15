import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../screens/AppIntro/styles";
import getStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import { Image } from "react-native";
import { colors } from "../../utils";

type Props = {
  showModal: boolean;
  setShowModal: any;
};

const NewPost = ({ showModal, setShowModal }: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme, showModal);

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
      <View style={styles.newPostAlign}>
        <Image style={styles.newPostUserImage} />
        <TextInput
          style={styles.newPostInput}
          multiline={true}
          selectionColor={colors.cherry}
          placeholder="What's going on?"
          placeholderTextColor={colors.dork}
        />
      </View>
    </View>
  );
};

export default NewPost;
