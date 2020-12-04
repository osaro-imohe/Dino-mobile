import React from "react";
import getStyles from "./styles";
import Icon from "../../assets/icons";
import { colors } from "../../utils";
import { useColorScheme } from "react-native-appearance";
import { View, Text, TouchableOpacity, Image } from "react-native";

type Props = {
  first_name: string;
  last_name: string;
  comment: string;
  profile_picture_url: string;
};

const Comment = ({
  first_name,
  last_name,
  comment,
  profile_picture_url,
}: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return (
    <TouchableOpacity>
      <View style={styles.commentAlign}>
        {profile_picture_url === "" || profile_picture_url === null ? (
          <View style={styles.noPostProfileImage}>
            <Icon name="user" color={colors.dork} />
          </View>
        ) : (
          <Image
            source={{ uri: profile_picture_url }}
            style={styles.commentProfileImage}
          />
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.commentUser}>
            {first_name} {last_name}
          </Text>
          <Text style={styles.commentMessage}>{comment}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Comment;
