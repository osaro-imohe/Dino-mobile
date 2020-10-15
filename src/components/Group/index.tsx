import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useColorScheme } from "react-native-appearance";
import getStyles from "./styles";

type Props = {
  groupName: string;
  logoUrl: string;
  numberOfParticipants: number;
  onPress?: any;
};

const Group = ({ groupName, logoUrl, numberOfParticipants }: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  return (
    <View style={styles.groupSegmentContinaer}>
      <Image source={{ uri: logoUrl }} style={styles.groupSegmentImage} />
      <Text style={styles.groupName}>{groupName}</Text>
      <View style={styles.groupParticipantsContainer}>
        <Text style={styles.groupParticipantsHeader}>
          Number of participants
        </Text>
        <Text style={styles.groupParticipantsNumber}>
          {numberOfParticipants}
        </Text>
      </View>
    </View>
  );
};

export default Group;
