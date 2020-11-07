import { StyleSheet } from "react-native";
import { getWidth, getHeight, colors } from "../../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    homeContainer: {
      width: "100%",
      height: "100%",
      flex: 1,
      paddingLeft: getWidth(20),
      paddingRight: getWidth(20),
      paddingTop: getHeight(60),
      backgroundColor: colorScheme === "light" ? colors.white : colors.black,
    },
    homeGroupName: {
      color: colorScheme === "light" ? colors.black : colors.white,
      fontSize: getHeight(20),
      fontWeight: "700",
      marginBottom: getHeight(10),
    },
    homeScrollView: {
      width: "100%",
      height: "100%",
    },
    newPost: {
      height: 50,
      width: 50,
      borderRadius: 100,
      zIndex: 2,
      position: "absolute",
      bottom: 0,
      right: 0,
      marginBottom: getHeight(10),
      marginRight: getWidth(20),
      backgroundColor: colors.cherry,
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    newPostTouch: {},
  });

export default styles;
