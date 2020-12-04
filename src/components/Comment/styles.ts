import { StyleSheet } from "react-native";
import { colors, getHeight, getWidth } from "../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    commentAlign: {
      flexDirection: "row",
      marginTop: getHeight(20),
      paddingBottom: getHeight(20),
      borderBottomWidth: getHeight(1),
      borderColor: colorScheme === "light" ? colors.lightGray : colors.darkGray,
    },
    commentProfileImage: {
      width: 50,
      height: 50,
      backgroundColor: colors.dork,
      borderRadius: 100,
    },
    commentUser: {
      marginLeft: getWidth(10),
      marginBottom: 0,
      fontSize: getHeight(12),
      color: colorScheme === "light" ? colors.dork : colors.dork,
    },
    commentMessage: {
      marginLeft: getWidth(10),
      marginTop: getHeight(5),
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    bar: {
      backgroundColor: colors.dork,
      width: getWidth(2),
      marginLeft: 25,
      marginBottom: 10,
      height: getHeight(30),
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
  });

export default styles;
