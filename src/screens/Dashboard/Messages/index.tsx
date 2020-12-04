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
        {/* example of message component below */}
        {/* <Message name="Jerry" newestMessage="How was your day?" time="3:06" /> */}
        <Text style={styles.messageFeatureComing}>Coming soon</Text>
      </ScrollView>
    </View>
  );
};

export default Messages;
