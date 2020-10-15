import { StyleSheet } from "react-native";
import { getHeight, getWidth, colors } from "../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    emailInput: {
      backgroundColor: colorScheme === "light" ? colors.sigh : colors.grok,
      height: getHeight(50),
      width: getWidth(325),
      alignSelf: "center",
      borderRadius: getWidth(15),
      marginBottom: getHeight(15),
      color: colorScheme === "light" ? colors.black : colors.white,
      paddingLeft: getWidth(15),
      paddingRight: getWidth(15),
      paddingTop: getHeight(15),
      paddingBottom: getHeight(15),
    },
    nameInput: {
      backgroundColor: colorScheme === "light" ? colors.sigh : colors.grok,
      height: getHeight(50),
      width: getWidth(325),
      alignSelf: "center",
      borderRadius: getWidth(15),
      marginBottom: getHeight(15),
      color: colorScheme === "light" ? colors.black : colors.white,
      paddingLeft: getWidth(15),
      paddingRight: getWidth(15),
      paddingTop: getHeight(15),
      paddingBottom: getHeight(15),
    },
    passwordInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      height: getHeight(50),
      width: getWidth(325),
      alignSelf: "center",
      padding: 0,
      flexWrap: "nowrap",
      justifyContent: "flex-end",
    },
    passwordInputLogo: {
      marginRight: getWidth(15),
    },
    passwordInput: {
      backgroundColor: colorScheme === "light" ? colors.sigh : colors.grok,
      height: "100%",
      width: "100%",
      alignSelf: "center",
      borderRadius: getWidth(15),
      color: colorScheme === "light" ? colors.black : colors.white,
      paddingLeft: getWidth(15),
      paddingRight: getWidth(15),
      paddingTop: getHeight(15),
      paddingBottom: getHeight(15),
      position: "absolute",
      zIndex: -1,
    },
  });

export default styles;
