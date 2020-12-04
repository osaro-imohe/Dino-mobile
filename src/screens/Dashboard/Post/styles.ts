import { StyleSheet } from "react-native";
import { colors, getHeight, getWidth } from "../../../utils/";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    postContainer: {
      height: "100%",
      backgroundColor: colorScheme === "light" ? colors.white : colors.black,
    },
    postHeader: {
      color: colorScheme === "light" ? colors.black : colors.white,
      fontSize: getHeight(20),
      fontWeight: "700",
      alignItems: "flex-start",
      marginTop: getHeight(10),
      marginLeft: getWidth(20),
      backgroundColor: colorScheme === "light" ? colors.white : colors.black,
    },
    postImage: {
      width: "100%",
      height: getHeight(150),
      marginTop: getHeight(10),
      marginBottom: getHeight(10),
      borderRadius: 10,
    },
    postAlign: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: getHeight(10),
    },
    postProfileImage: {
      width: 50,
      height: 50,
      backgroundColor: colors.dork,
      borderRadius: 100,
    },
    postUser: {
      marginLeft: getWidth(10),
      marginBottom: 0,
      fontSize: getHeight(16),
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    postMessage: {
      marginTop: getHeight(10),
      marginBottom: getHeight(20),
      color: colorScheme === "light" ? colors.black : colors.white,
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
    postFlatList: {
      marginTop: getHeight(20),
      paddingLeft: getWidth(20),
      paddingRight: getWidth(20),
    },
  });

export default styles;
