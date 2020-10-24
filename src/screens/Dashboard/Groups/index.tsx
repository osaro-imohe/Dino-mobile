import React, { useContext } from "react";
import { View, Text } from "react-native";
import getStyles from "./styles";
import { useColorScheme } from "react-native";
import Icon from "../../../assets/icons";
import { colors } from "../../../utils";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Group from "../../../components/Group";
import { NewGroupModalContext } from "../../../components/NewGroup";
import { Context } from "../../../context";

const url1 = `https://images.unsplash.com/photo-1554475901-4538ddfbccc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80`;
const url2 = `https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1537&q=80`;
const url3 = `https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80`;

const Groups = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const context = useContext(NewGroupModalContext);

  const { state, setState } = useContext(Context);

  const openModal = () => {
    context.setOpen(true);
  };

  return (
    <View style={styles.groupsContainer}>
      <Text style={styles.groupsHeader}>Groups</Text>
      <View style={styles.groupJoinContainer}>
        <TouchableOpacity style={styles.groupTouch} onPress={openModal}>
          <View style={styles.groupJoinLogoContainer}>
            <Icon
              name="plus"
              color={colorScheme === "light" ? colors.black : colors.white}
            />
          </View>
          <Text style={styles.groupJoinText}>Add a group</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.groupScrollView}>
        <Group groupName="Physics" logoUrl={url2} numberOfParticipants={69} />
        <Group groupName="Math" logoUrl={url3} numberOfParticipants={53} />
      </ScrollView>
    </View>
  );
};

export default Groups;
