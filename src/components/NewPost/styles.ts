import { StyleSheet } from "react-native";
import { getHeight, getWidth, colors } from "../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    newPostContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: colorScheme === "light" ? colors.white : colors.black,
      // paddingLeft: getWidth(10),
      // paddingRight: getWidth(10),
      paddingTop: getHeight(30),
      zIndex: 3,
      bottom: 0,
    },
    newPostCancel: {
      color: colors.cherry,
      fontSize: getHeight(15),
      marginBottom: getHeight(20),
    },
    newPostUserImage: {
      width: 50,
      height: 50,
      backgroundColor: colors.dork,
      borderRadius: 100,
    },
    newPostInput: {
      width: getWidth(230),
      right: 0,
      paddingLeft: getWidth(10),
      paddingRight: getWidth(10),
      paddingTop: getHeight(10),
      paddingBottom: getHeight(10),
      marginLeft: getWidth(10),
      justifyContent: "flex-end",
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    newPostAlign: {
      padding: 0,
      flexDirection: "row",
    },
    newPostSend: {
      top: 0,
      right: 0,
      zIndex: 2,
      color: colors.white,
      borderRadius: 100,
      alignItems: "center",
      position: "absolute",
      alignContent: "center",
      justifyContent: "center",
      width: 100,
      height: 30,
      marginTop: getHeight(25),
      backgroundColor: colors.cherry,
    },
    newPostSendDisabled: {
      top: 0,
      right: 0,
      zIndex: 2,
      color: colors.white,
      borderRadius: 100,
      alignItems: "center",
      position: "absolute",
      alignContent: "center",
      justifyContent: "center",
      width: 100,
      height: 30,
      marginTop: getHeight(25),
      backgroundColor: colorScheme === "light" ? colors.lightGray : colors.grok,
    },
    newPostSendText: {
      color: colors.white,
    },
  });

export default styles;
