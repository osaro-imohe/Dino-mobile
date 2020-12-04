import { StyleSheet } from "react-native";
import { colors } from "../../../utils";
import { getWidth, getHeight } from "../../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    groupContainer: {
      width: "100%",
      height: "100%",
      flex: 1,
      paddingLeft: getWidth(20),
      paddingRight: getWidth(20),
      paddingTop: getHeight(60),
      backgroundColor: colorScheme === "light" ? colors.white : colors.black,
    },
    noGroupImage: {
      width: "100%",
      height: getHeight(200),
      backgroundColor:
        colorScheme === "light" ? colors.whitesmoke : colors.darkGray,
    },
    groupImage: {
      width: "100%",
      height: getHeight(200),
    },
    groupHeader: {
      marginLeft: getWidth(20),
      marginTop: getHeight(20),
      fontSize: getHeight(20),
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    descriptionInput: {
      marginLeft: getWidth(20),
      marginTop: getHeight(10),
      marginRight: getWidth(20),
      paddingTop: getHeight(20),
      paddingBottom: getHeight(20),
      paddingLeft: getHeight(10),
      paddingRight: getHeight(10),
      color: colorScheme === "light" ? colors.black : colors.white,
      backgroundColor:
        colorScheme === "light" ? colors.whitesmoke : colors.darkGray,
    },
    groupNoOfMembers: {
      marginLeft: getWidth(20),
      marginTop: getHeight(20),
      fontSize: getHeight(15),
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    groupDescriptionHeader: {
      marginLeft: getWidth(20),
      marginTop: getHeight(30),
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    descriptionPrompt: {
      marginLeft: getWidth(20),
      marginTop: getHeight(10),
      marginRight: getWidth(20),
      color: colorScheme === "light" ? colors.lightGray : colors.darkGray,
    },
    doneButtonText: {
      color: colors.cherry,
      fontSize: getHeight(15),
      padding: getHeight(20),
      marginRight: getHeight(20),
      alignSelf: "flex-end",
      borderWidth: 1,
      borderColor: colors.cherry,
      borderRadius: getHeight(10),
      marginTop: getHeight(10),
    },
    inviteCodeRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginLeft: getHeight(20),
      marginTop: getHeight(40),
      marginRight: getHeight(20),
      marginBottom: getHeight(40),
    },
    inviteCodeButton: {
      backgroundColor: colors.dork,
      padding: 20,
    },
    inviteCodeText: {
      padding: 20,
      paddingLeft: 0,
      color: colorScheme === "light" ? colors.black : colors.white,
    },
  });

export default styles;
