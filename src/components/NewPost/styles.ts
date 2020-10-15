import { StyleSheet } from "react-native";
import { getHeight, getWidth, colors } from "../../utils";

const styles = (colorScheme: any, showModal: boolean) =>
  StyleSheet.create({
    newPostContainer: {
      width: "100%",
      height: showModal ? "100%" : "0%",
      backgroundColor: colorScheme === "light" ? colors.white : colors.black,
      paddingLeft: getWidth(15),
      paddingRight: getWidth(15),
      paddingTop: getHeight(30),
      zIndex: 3,
      bottom: 0,
    },
    newPostCancel: {
      color: colors.cherry,
      fontSize: showModal ? getHeight(15) : 0,
      marginBottom: getHeight(20),
    },
    newPostUserImage: {
      width: showModal ? 50 : 0,
      height: showModal ? 50 : 0,
      backgroundColor: colors.dork,
      borderRadius: 100,
    },
    newPostInput: {
      width: showModal ? getWidth(230) : 0,
      right: 0,
      paddingLeft: showModal ? getWidth(10) : 0,
      paddingRight: showModal ? getWidth(10) : 0,
      paddingTop: showModal ? getHeight(10) : 0,
      paddingBottom: showModal ? getHeight(10) : 0,
      marginLeft: getWidth(10),
      justifyContent: "flex-end",
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    newPostAlign: {
      padding: 0,
      flexDirection: "row",
    },
  });

export default styles;
