import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import getStyles from "./styles";
import { useColorScheme } from "react-native";
import { getHeight, getWidth } from "../../utils";

type Props = {
  name: string;
  newestMessage: string;
  time: string;
};

const Message = ({ name, newestMessage, time }: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return (
    <TouchableOpacity>
      <View style={styles.messageContainer}>
        <View style={styles.messageNotificationContainer}>
          <View style={styles.messageNotification}></View>
        </View>
        <Image style={styles.messageImage} />
        <View style={styles.messageAlign}>
          <Text style={styles.messageName}>{name}</Text>
          <Text style={styles.messageRecent}>{newestMessage}</Text>
        </View>
        <Text style={styles.messageTime}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Message;
