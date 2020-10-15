import React from "react";
import { View, Text, ScrollView } from "react-native";
import getStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import Message from "../../../components/Message";

const Messages = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageHeader}>Messages</Text>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <Message name="Jerry" newestMessage="How was your day?" time="3:06" />
        <Message
          name="Sandra"
          newestMessage="Turn in the assingment"
          time="2:04"
        />
        <Message name="Donald" newestMessage="Submitted mine" time="4:20" />
      </ScrollView>
    </View>
  );
};

export default Messages;
