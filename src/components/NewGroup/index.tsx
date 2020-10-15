import React, {
  useLayoutEffect,
  createContext,
  useContext,
  useState,
  useRef,
  Fragment,
  useEffect,
} from "react";
import { useColorScheme } from "react-native-appearance";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import getStyles from "./styles";
import Icon from "../../assets/icons";
import { colors, getHeight } from "../../utils/";
import { Modalize } from "react-native-modalize";
import { CreateGroup } from "../../graphql/mutations/Groups";
import { useMutation } from "@apollo/client";
import { GroupError } from "../Errors/index";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { Context } from "../../context";

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
  const [loading, setLoading] = useState(false);

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

    const [createGroup, { data }] = useMutation(CreateGroup, {
      onCompleted: async (data) => {
        setLoading(false);
        console.log(data);
        try {
          let groups = await AsyncStorage.getItem("groups");
          if(groups === null) await AsyncStorage.setItem("groups", JSON.stringify([]))
          if(groups !== null) {
            const groups_array = JSON.parse(groups)
            groups_array.push(data.CreateGroup)
            await AsyncStorage.setItem("groups",JSON.stringify(groups_array))
            setState({
              groups: [...state.groups, data.CreateGroup]
            })
          }
        } catch (error) {
          throw new Error(error);
        }
      },
      onError: (error) => {
        setLoading(false);
      },
    });

    const checkGroupName = () => {
      if (groupName.length < 1) return true;
      return false;
    };

    const newGroup = () => {
      setLoading(true);
      console.log(state.userId);
      createGroup({
        variables: {
          user_id: parseInt(state.userId),
          name: groupName,
          photo_url: "",
        },
      });
    };

    switch (route) {
      case 1:
        return (
          <Fragment>
            <TouchableOpacity
              style={styles.newGroupOptions}
              onPress={() => setRoute(2)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch",
                  alignItems: "center",
                }}
              >
                <Icon name="link" />
                <Text style={styles.newGroupHeader}>Join a group</Text>
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
                }}
              >
                <Icon name="magicwand" />
                <Text style={styles.newGroupHeader}>Create a group</Text>
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
          </Fragment>
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
              >
                {loading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Icon name="groupplus" color={colors.white} />
                )}
              </TouchableOpacity>
            </View>
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
                {loading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Icon name="groupplus" color={colors.white} />
                )}
              </TouchableOpacity>
            </View>
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
      modalHeight={getHeight(250)}
      onClose={onClosed}
    >
      {showRoute()}
    </Modalize>
  );
};

export default NewGroup;
