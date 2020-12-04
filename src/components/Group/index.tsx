import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useColorScheme } from "react-native-appearance";
import getStyles from "./styles";
import { currentGroupVar } from "../../graphql/reactivevariables";
import Icon from "../../assets/icons";
import { colors } from "../../utils";

type Props = {
  groupId: number;
  photoUrl: string;
  groupName: string;
  inviteCode: string;
  description: string;
  adminUserId: number;
  numberOfMembers: number;
  onPress?: any;
  navigation: any;
};

const Group = ({
  groupId,
  groupName,
  photoUrl,
  inviteCode,
  description,
  adminUserId,
  numberOfMembers,
  navigation,
}: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  return (
    <TouchableOpacity
      onPress={() => {
        currentGroupVar({
          id: groupId,
          name: groupName,
          photoUrl: photoUrl,
          inviteCode: inviteCode,
          description: description,
          adminUserId: adminUserId,
          numberOfMembers: numberOfMembers,
        });
        navigation.navigate("Home");
      }}
    >
      <View style={styles.groupSegmentContainer}>
        <Image source={{ uri: "hello.jpg" }} style={styles.groupSegmentImage} />
        <Text style={styles.groupName} numberOfLines={1}>
          {groupName}
        </Text>
        <View style={styles.groupParticipantsContainer}>
          <Icon name="users" color={colors.dork} />
          <Text style={styles.groupParticipantsNumber}>
            {"  "}
            {numberOfMembers}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Group;
