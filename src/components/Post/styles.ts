import { isNonEmptyArray } from "@apollo/client/utilities";
import { StyleSheet } from "react-native";
import { colors, getHeight, getWidth } from "../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    postContainer: {
      width: "100%",
      paddingTop: getHeight(10),
      paddingBottom: getHeight(10),
      paddingLeft: getWidth(5),
      paddingRight: getWidth(5),
      marginBottom: getHeight(5),
      backgroundColor: colorScheme === "light" ? colors.white : colors.black,
    },
    postAlign: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: getHeight(10),
    },
    postIconsAlign: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: getHeight(10),
      alignSelf: "flex-start",
      marginTop: getHeight(10),
      marginLeft: 50 + getWidth(10),
    },
    postProfileImage: {
      width: 50,
      height: 50,
      backgroundColor: colors.dork,
      borderRadius: 100,
    },
    noPostProfileImage: {
      width: 50,
      height: 50,
      borderColor: colors.dork,
      borderWidth: 1,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    postUser: {
      marginLeft: getWidth(10),
      marginBottom: 0,
      fontSize: getHeight(16),
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    postTime: {
      color: colors.dork,
      fontSize: getHeight(12),
      marginLeft: getWidth(5),
      marginTop: getHeight(4),
    },
    postMessage: {
      marginTop: 0,
      marginLeft: 50 + getWidth(10),
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    postImage: {
      width: "80%",
      height: getHeight(120),
      marginBottom: getHeight(10),
      borderRadius: 10,
      borderWidth: 0,
      marginLeft: 50 + getWidth(10),
    },
    postLike: {
      marginLeft: getWidth(10),
    },
    postActivityCounter: {
      color: colors.dork,
      marginLeft: getWidth(4),
    },
  });

export default styles;
