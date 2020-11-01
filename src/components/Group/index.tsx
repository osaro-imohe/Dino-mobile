import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useColorScheme } from "react-native-appearance";
import getStyles from "./styles";
import { currentGroupVar } from "../../graphql/reactivevariables";

type Props = {
  groupId: number;
  photoUrl: string;
  groupName: string;
  inviteCode: string;
  description: string;
  adminUserId: number;
  numberOfMembers: number;
  onPress?: any;
};

const Group = ({
  groupId,
  groupName,
  photoUrl,
  inviteCode,
  description,
  adminUserId,
  numberOfMembers,
}: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  return (
    <TouchableOpacity
      onPress={() =>
        currentGroupVar({
          id: groupId,
          name: groupName,
          photoUrl: photoUrl,
          inviteCode: inviteCode,
          description: description,
          adminUserId: adminUserId,
          numberOfMembers: numberOfMembers,
        })
      }
    >
      <View style={styles.groupSegmentContinaer}>
        <Image source={{ uri: photoUrl }} style={styles.groupSegmentImage} />
        <Text style={styles.groupName} numberOfLines={1}>
          {groupName}
        </Text>
        <View style={styles.groupParticipantsContainer}>
          <Text style={styles.groupParticipantsHeader}>
            Number of participants
          </Text>
          <Text style={styles.groupParticipantsNumber}>{numberOfMembers}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Group;
