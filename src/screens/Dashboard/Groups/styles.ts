import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import { getHeight, getWidth, colors } from "../../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    groupsContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: colorScheme === "light" ? colors.white : colors.black,
      paddingLeft: getWidth(20),
      paddingRight: getWidth(20),
      paddingTop: getHeight(60),
    },
    groupsHeader: {
      color: colorScheme === "light" ? colors.black : colors.white,
      fontSize: getHeight(30),
      fontWeight: "700",
    },
    groupJoinLogoContainer: {
      width: 50,
      height: 50,
      borderColor: colorScheme === "light" ? colors.lightGray : colors.darkGray,
      borderRadius: 5,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    groupJoinContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      marginTop: getHeight(23),
      marginBottom: getHeight(23),
    },
    groupJoinText: {
      color: colorScheme === "light" ? colors.black : colors.white,
      marginLeft: getWidth(13),
      fontSize: getHeight(18),
      fontWeight: "400",
    },
    groupTouch: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    groupScrollView: {
      width: "100%",
      height: "100%",
    },
  });

export default styles;
