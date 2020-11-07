import React, { Fragment, useContext, useEffect } from "react";
import { View, Text } from "react-native";
import getStyles from "./styles";
import { useColorScheme } from "react-native";
import Icon from "../../../assets/icons";
import { colors } from "../../../utils";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Group from "../../../components/Group";
import { NewGroupModalContext } from "../../../components/NewGroup";
import { Context } from "../../../context";
import { useQuery } from "@apollo/client";
import { GetGroups } from "../../../graphql/queries/Groups";
import { useLazyQuery } from "@apollo/client";
import { GroupError } from "../../../components/Errors";

const Groups = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const context = useContext(NewGroupModalContext);

  const { state, setState } = useContext(Context);

  const [getGroups, { data, loading, error }] = useLazyQuery(GetGroups);

  const openModal = () => {
    context.setOpen(true);
  };

  useEffect(() => {
    console.log(state.userId);
    getGroups({
      variables: {
        user_id: parseInt(state.userId),
      },
    });
  }, []);

  const showGroupsOrError = () => {
    return error ? (
      <GroupError errorMessage={`${error.message}, click here to retry`} />
    ) : data && data.GetGroups.groups.length ? (
      data.GetGroups.groups.map((group: any) => {
        return (
          <Group
            key={group.id}
            groupId={group.id}
            groupName={group.name}
            //uncomment the line below and delete photoUrl = 'hello' once you've started saving strings
            // photoUrl={group.photo_url}
            photoUrl="hello"
            inviteCode={group.photo_url}
            description={group.description}
            adminUserId={group.admin_user_id}
            numberOfMembers={group.number_of_members}
          />
        );
      })
    ) : (
      <>
        <Text style={styles.nogroups}>
          Looks like you aren't in any groups, join or create a group to get
          started.
        </Text>
      </>
    );
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
        {showGroupsOrError()}
      </ScrollView>
    </View>
  );
};

export default Groups;
