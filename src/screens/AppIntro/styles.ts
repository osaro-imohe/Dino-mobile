import { StyleSheet } from "react-native";
import { getWidth } from "../../utils";
import { getHeight } from "../../utils";
import { colors } from "../../utils";
import { ColorScheme } from "../../definition";
import { Appearance, useColorScheme } from "react-native-appearance";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    appIntroContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: colorScheme === "light" ? colors.white : colors.black,
      paddingTop: getHeight(138),
    },
    appIntroLogo: {
      width: 280,
      height: 280,
      alignSelf: "center",
    },
    appIntroHeader: {
      color: colorScheme === "light" ? colors.black : colors.white,
      alignSelf: "center",
      width: getWidth(270),
      height: getHeight(62),
      flexWrap: "wrap-reverse",
      fontSize: getHeight(20),
      textAlign: "center",
      marginTop: getHeight(50),
      fontWeight: "bold",
    },
    appIntroSubHeader: {
      alignSelf: "center",
      width: getWidth(270),
      height: getHeight(62),
      fontSize: getHeight(16),
      textAlign: "center",
      marginTop: getHeight(5),
      fontWeight: "200",
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    appIntroHightlight: {
      color: colors.cherry,
    },
    appIntroButton: {
      width: getWidth(143),
      height: getHeight(49),
      backgroundColor: colors.cherry,
      alignSelf: "center",
      borderRadius: getWidth(39),
      alignItems: "center",
      justifyContent: "center",
      marginTop: getHeight(62),
    },
    appIntroButtonText: {
      color: colors.white,
    },
  });

export default styles;
