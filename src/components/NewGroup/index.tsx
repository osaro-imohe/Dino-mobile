import React, {
  useLayoutEffect,
  createContext,
  useContext,
  useState,
  useRef,
} from "react";
import { useColorScheme } from "react-native-appearance";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import getStyles from "./styles";
import Icon from "../../assets/icons";
import { colors, getHeight } from "../../utils";
import { Modalize } from "react-native-modalize";
import { CreateGroup, JoinGroup } from "../../graphql/mutations/Groups";
import { useMutation } from "@apollo/client";
import { Context } from "../../context";
import { GetGroups } from "../../graphql/queries/Groups";
import { NewGroupError } from "../Errors/index";
import { currentGroupVar } from "../../graphql/reactivevariables";
import client from "../../graphql/client";
import { cache } from "../../graphql/cache";

type Props = {
  isOpen: boolean;
};

export const NewGroupModalContext = createContext<{
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isOpen: false,
  setOpen: () => {},
});

const NewGroup = ({ isOpen }: Props) => {
  const modalizeRef = useRef<Modalize>(null);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  const context = useContext(NewGroupModalContext);

  const { state, setState } = useContext(Context);

  const [route, setRoute] = useState(1);

  const [joinCode, setJoinCode] = useState("");
  const [groupName, setGroupName] = useState("");

  const [error, setError] = useState({
    showError: false,
    error_message: "",
  });

  const showRoute = () => {
    const checkJoinInput = () => {
      if (joinCode.length < 10) return true;
      return false;
    };

    const [
      createGroup,
      { data: createData, loading: createLoading, error: createError },
    ] = useMutation(CreateGroup, {
      update(cache, { data }) {
        const newGroup = data?.CreateGroup.groups;
        const existingGroups: any = cache.readQuery({
          query: GetGroups,
          variables: {
            user_id: parseInt(state.userId),
          },
        });
        cache.writeQuery({
          query: GetGroups,
          variables: {
            user_id: parseInt(state.userId),
          },
          data: {
            GetGroups: {
              groups: [...existingGroups?.GetGroups.groups, newGroup],
            },
          },
        });
      },
      onError: (error) => {
        throw new Error(`error: ${error.message}`);
      },
      onCompleted: () => {
        const groups: any = cache.readQuery({
          query: GetGroups,
          variables: {
            user_id: parseInt(state.userId),
          },
        });
        const newestGroup =
          groups.GetGroups.groups[groups.GetGroups.groups.length - 1];
        currentGroupVar({
          id: newestGroup.id,
          name: newestGroup.name,
          photoUrl: newestGroup.photo_url,
          inviteCode: newestGroup.invite_code,
          description: newestGroup.description,
          adminUserId: newestGroup.admin_user_id,
          numberOfMembers: newestGroup.number_of_members,
        });
      },
    });

    const [
      joinGroup,
      { data: joinData, loading: joinLoading, error: joinError },
    ] = useMutation(JoinGroup, {
      update(cache, { data }) {
        const newGroup = data?.JoinGroup.groups;
        const existingGroups: any = cache.readQuery({
          query: GetGroups,
          variables: {
            user_id: parseInt(state.userId),
          },
        });
        cache.writeQuery({
          query: GetGroups,
          variables: {
            user_id: parseInt(state.userId),
          },
          data: {
            GetGroups: {
              groups: [...existingGroups.GetGroups.groups, newGroup],
            },
          },
        });
      },
      onError: (error) => {
        throw new Error(`error: ${error.message}`);
      },
      onCompleted: () => {
        const groups: any = cache.readQuery({
          query: GetGroups,
          variables: {
            user_id: parseInt(state.userId),
          },
        });
        const newestGroup =
          groups.GetGroups.groups[groups.GetGroups.groups.length - 1];
        currentGroupVar({
          id: newestGroup.id,
          name: newestGroup.name,
          photoUrl: newestGroup.photo_url,
          inviteCode: newestGroup.invite_code,
          description: newestGroup.description,
          adminUserId: newestGroup.admin_user_id,
          numberOfMembers: newestGroup.number_of_members,
        });
      },
    });

    const checkGroupName = () => {
      if (groupName.length < 1) return true;
      return false;
    };

    const newGroup = () => {
      createGroup({
        variables: {
          user_id: parseInt(state.userId),
          name: groupName,
          photo_url: "",
        },
      });
    };

    const joinExistingGroup = () => {
      joinGroup({
        variables: {
          user_id: parseInt(state.userId),
          invite_code: joinCode,
        },
      });
    };

    const showCreateLoader = () => {
      return createLoading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Icon name="groupplus" color={colors.white} />
      );
    };

    const showJoinLoader = () => {
      return joinLoading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Icon name="groupplus" color={colors.white} />
      );
    };

    const showCreateError = () => {
      return createError ? (
        <NewGroupError errorMessage={createError.message} />
      ) : null;
    };

    const showJoinError = () => {
      return joinError ? (
        <NewGroupError errorMessage={joinError.message} />
      ) : null;
    };

    switch (route) {
      case 1:
        return (
          <>
            <TouchableOpacity
              style={styles.newGroupOptions}
              onPress={() => setRoute(2)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon name="link" />
                  <Text style={styles.newGroupHeader}>Join a group</Text>
                </View>
                <Icon
                  name="rightarrow"
                  color={
                    colorScheme === "light"
                      ? colors.lightGray
                      : colors.whitesmoke
                  }
                  style={styles.newGroupRightArrow}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.newGroupOptions}
              onPress={() => setRoute(3)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon name="magicwand" />
                  <Text style={styles.newGroupHeader}>Create a group</Text>
                </View>
                <Icon
                  name="rightarrow"
                  color={
                    colorScheme === "light"
                      ? colors.lightGray
                      : colors.whitesmoke
                  }
                  style={styles.newGroupRightArrow}
                />
              </View>
            </TouchableOpacity>
          </>
        );
      case 2:
        return (
          <View style={styles.newGroupJoinContainer}>
            <View style={styles.newGroupBackContainer}>
              <TouchableOpacity
                onPress={() => {
                  setRoute(1);
                }}
              >
                <Text style={styles.newGroupBack}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={styles.newGroupJoin}
                placeholder="Invite Code"
                placeholderTextColor={colors.dork}
                onChangeText={(text) => setJoinCode(text)}
              />
              <TouchableOpacity
                disabled={checkJoinInput()}
                style={
                  checkJoinInput()
                    ? styles.newGroupJoinButtonDisabled
                    : styles.newGroupJoinButton
                }
                onPress={joinExistingGroup}
              >
                {showJoinLoader()}
              </TouchableOpacity>
            </View>
            {showJoinError()}
          </View>
        );
      case 3:
        return (
          <View style={styles.newGroupJoinContainer}>
            <View style={styles.newGroupBackContainer}>
              <TouchableOpacity
                onPress={() => {
                  setRoute(1);
                }}
              >
                <Text style={styles.newGroupBack}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={styles.newGroupJoin}
                placeholder="Group name"
                placeholderTextColor={colors.dork}
                onChangeText={(text) => setGroupName(text)}
              />
              <TouchableOpacity
                disabled={checkGroupName()}
                style={
                  checkGroupName()
                    ? styles.newGroupJoinButtonDisabled
                    : styles.newGroupJoinButton
                }
                onPress={newGroup}
              >
                {showCreateLoader()}
              </TouchableOpacity>
            </View>
            {showCreateError()}
          </View>
        );
      default:
        break;
    }
  };

  useLayoutEffect(() => {
    const modal = modalizeRef.current;
    if (isOpen) {
      modal?.open();
    } else {
      modal?.close();
    }
  }, [context.isOpen]);

  const onClosed = () => {
    context.setOpen(false);
    setRoute(1);
  };
  return (
    <Modalize
      modalStyle={styles.newGroupModal}
      ref={modalizeRef}
      modalHeight={getHeight(350)}
      onClose={onClosed}
    >
      {showRoute()}
    </Modalize>
  );
};

export default NewGroup;
