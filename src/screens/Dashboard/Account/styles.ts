import { StyleSheet } from "react-native";
import { colors, getHeight, getWidth } from "../../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    accountContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: colorScheme === "light" ? colors.white : colors.black,
      paddingLeft: getWidth(20),
      paddingRight: getWidth(20),
      paddingTop: getHeight(60),
    },
    accountHeader: {
      color: colorScheme === "light" ? colors.black : colors.white,
      fontSize: getHeight(30),
      fontWeight: "700",
      marginBottom: getHeight(27),
    },
    accountImage: {
      width: 100,
      height: 100,
      backgroundColor: colors.darkGray,
      borderRadius: 10,
    },
    noAccountImage: {
      width: 100,
      height: 100,
      borderColor: colors.dork,
      borderWidth: 1,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    accountInfo: {
      marginLeft: getWidth(18),
    },
    accountInfoName: {
      fontWeight: "bold",
      fontSize: getHeight(18),
      marginBottom: getHeight(4),
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    accountInfoEmail: {
      color: colors.dork,
      fontSize: getHeight(18),
    },
    accountOptionsAlign: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    accountPassword: {
      left: 0,
      position: "absolute",
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    accountPasswordIcon: {
      alignItems: "flex-end",
    },
    accountSignOut: {
      height: getHeight(44),
      width: getWidth(135),
      borderRadius: 10,
      flexDirection: "row",
      position: "absolute",
      bottom: 0,
      alignSelf: "center",
      marginBottom: getHeight(53),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colorScheme === "light" ? colors.sigh : colors.grok,
    },
    accountLogoutText: {
      fontSize: getHeight(16),
      marginRight: getWidth(11),
      color: colorScheme === "light" ? colors.black : colors.white,
    },
  });

export default styles;
