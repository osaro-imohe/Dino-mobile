import { StyleSheet } from "react-native";
import { getHeight, getWidth, colors } from "../../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    loginContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: colorScheme === "light" ? colors.white : colors.black,
      paddingTop: getHeight(152),
    },
    loginHeader: {
      alignSelf: "center",
      fontSize: getWidth(40),
      fontWeight: "bold",
      marginBottom: getHeight(100),
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    loginButton: {
      width: getWidth(116),
      height: getHeight(49),
      backgroundColor: colors.cherry,
      borderRadius: getWidth(50),
      alignSelf: "center",
      marginTop: getHeight(20),
      justifyContent: "center",
    },
    loginButtonDisabled: {
      width: getWidth(116),
      height: getHeight(49),
      backgroundColor: colorScheme === "light" ? colors.lightGray : colors.grok,
      borderRadius: getWidth(50),
      alignSelf: "center",
      marginTop: getHeight(20),
      justifyContent: "center",
    },
    loginText: {
      color: colors.white,
      alignSelf: "center",
      fontSize: getHeight(16),
    },
    loginCaption: {
      color: colorScheme === "light" ? colors.black : colors.white,
      alignSelf: "center",
      marginTop: getHeight(30),
      fontWeight: "600",
    },
    loginHightlight: {
      color: colors.cherry,
    },
  });

export default styles;
