import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  Clipboard,
  TouchableOpacity,
} from "react-native";
import getStyles from "./styles";
import { useReactiveVar } from "@apollo/client";
import { currentGroupVar } from "../../../graphql/reactivevariables";
import { useColorScheme } from "react-native-appearance";
import { TextInput } from "react-native-gesture-handler";

const NoGroupImage = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return <View style={styles.noGroupImage}></View>;
};

const GroupSettings = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const [isEditing, setIsEditing] = useState(false);
  const currentGroup = useReactiveVar(currentGroupVar);
  return (
    <SafeAreaView style={styles.groupContainer}>
      {currentGroup.photoUrl === "" ? (
        <NoGroupImage />
      ) : (
        <Image source={{ uri: "hello" }} style={styles.groupImage} />
      )}
      <Text style={styles.groupHeader}>{currentGroup.name}</Text>
      <Text style={styles.groupNoOfMembers}>
        Number of members - {currentGroup.numberOfMembers}
      </Text>
      <Text style={styles.groupDescriptionHeader}>Group description: </Text>
      {isEditing ? (
        <>
          <TextInput
            style={styles.descriptionInput}
            multiline={true}
            value={currentGroup.description}
            maxLength={250}
          ></TextInput>
          <TouchableOpacity>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={styles.descriptionPrompt}>
            Looks like you don't have a description. Write something short to
            let new memebers know what this group is about.
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.inviteCodeRow}>
        <Text style={styles.inviteCodeText}>Invite code </Text>
        <TouchableOpacity
          onPress={() => Clipboard.setString(`${currentGroup.inviteCode}`)}
        >
          <Text style={styles.inviteCodeButton}>{currentGroup.inviteCode}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GroupSettings;
