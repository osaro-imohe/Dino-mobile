import { StyleSheet } from "react-native";
import { colors, getWidth, getHeight } from "../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    newGroupModal: {
      width: "100%",
      position: "absolute",
      bottom: 0,
      alignSelf: "center",
      borderTopLeftRadius: 20,
      paddingTop: getHeight(10),
      paddingLeft: getWidth(10),
      paddingRight: getWidth(10),
      borderTopRightRadius: getHeight(20),
      backgroundColor: colorScheme === "light" ? colors.white : colors.black,
    },
    newGroupOptions: {
      width: "100%",
      height: getHeight(70),
      marginTop: getHeight(20),
      borderWidth: 1,
      borderColor: colorScheme === "light" ? colors.lightGray : colors.dork,
      borderRadius: 10,
      justifyContent: "center",
      paddingLeft: getWidth(10),
      paddingRight: getWidth(10),
    },
    newGroupHeader: {
      fontSize: getHeight(16),
      fontWeight: "bold",
      marginLeft: getWidth(10),
      color: colorScheme === "light" ? colors.darkGray : colors.whitesmoke,
    },
    newGroupRightArrow: {
      justifyContent: "center",
    },
    newGroupJoinContainer: {
      width: "100%",
      height: getHeight(200),
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    newGroupJoin: {
      width: getWidth(300),
      height: getHeight(60),
      borderRadius: 10,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 10,
      paddingBottom: 10,
      color: colors.black,
      backgroundColor:
        colorScheme === "light" ? colors.lightGray : colors.white,
    },
    newGroupJoinButton: {
      height: getHeight(60),
      width: getWidth(60),
      position: "absolute",
      borderRadius: 10,
      right: 0,
      backgroundColor: colors.cherry,
      alignItems: "center",
      justifyContent: "center",
    },
    newGroupJoinButtonDisabled: {
      height: getHeight(60),
      width: getWidth(60),
      position: "absolute",
      borderRadius: 10,
      right: 0,
      backgroundColor: colors.lightGray,
      alignItems: "center",
      justifyContent: "center",
    },
    newGroupBackContainer: {
      width: "100%",
      height: getHeight(30),
      position: "absolute",
      paddingLeft: getWidth(15),
      bottom: 0,
    },
    newGroupBack: {
      alignSelf: "flex-start",
      justifyContent: "flex-start",
      left: 0,
      fontWeight: "600",
      color: colorScheme === "light" ? colors.dork : colors.whitesmoke,
    },
  });

export default styles;
