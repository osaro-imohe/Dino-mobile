import { StyleSheet } from "react-native";
import { colors, getWidth, getHeight } from "../../utils/index";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    authErrorContainer: {
      borderWidth: 1,
      borderColor: colors.cherry,
      paddingTop: getHeight(10),
      paddingBottom: getHeight(10),
      paddingLeft: getWidth(10),
      paddingRight: getWidth(10),
      width: getWidth(325),
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      borderRadius: 10,
      marginBottom: 10,
    },
    authErrorMessage: {
      color: colors.cherry,
      fontSize: getHeight(16),
    },
    joinErrorMessage: {
      color: colors.dork,
      fontSize: getHeight(14),
      marginTop: getHeight(15),
    },
    newPostErrorContainer: {
      borderWidth: 1,
      borderColor:
        colorScheme === "light" ? colors.whitesmoke : colors.darkGray,
      paddingTop: getHeight(10),
      paddingBottom: getHeight(10),
      paddingLeft: getWidth(5),
      paddingRight: getWidth(5),
      width: getWidth(325),
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      borderRadius: 10,
      marginTop: getHeight(20),
      marginBottom: getHeight(20),
    },
    newPostErrorMessage: {
      color: colors.dork,
      fontSize: getHeight(16),
    },
    loadCommentsErrorMessage: {
      color: colors.dork,
      fontSize: getHeight(13),
      alignSelf: "center",
      fontWeight: "200",
      marginTop: getHeight(10),
    },
    loadCommentsErrorMessageSub: {
      color: colors.dork,
      fontSize: getHeight(13),
      alignSelf: "center",
      fontWeight: "200",
      marginTop: getHeight(2),
      marginBottom: getHeight(10),
    },
  });

export default styles;
