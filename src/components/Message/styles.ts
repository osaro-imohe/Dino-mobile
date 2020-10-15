import { StyleSheet } from "react-native";
import { colors, getHeight, getWidth } from "../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    messageContainer: {
      width: "100%",
      paddingTop: getHeight(10),
      paddingBottom: getHeight(10),
      paddingRight: getWidth(10),
      flexDirection: "row",
    },
    messageImage: {
      width: 50,
      height: 50,
      backgroundColor: colors.dork,
      borderRadius: 100,
    },
    messageTime: {
      right: 0,
      position: "absolute",
      marginTop: getHeight(10),
      marginRight: getHeight(10),
      color: colorScheme === "light" ? colors.darkGray : colors.dork,
    },
    messageAlign: {
      flexDirection: "column",
      marginLeft: getWidth(10),
    },
    messageNotificationContainer: {
      height: 50,
      width: 10,
      justifyContent: "center",
      marginRight: 5,
    },
    messageNotification: {
      width: 10,
      height: 10,
      borderRadius: 100,
      backgroundColor: colors.cherry,
    },
    messageName: {
      color: colorScheme === "light" ? colors.black : colors.white,
      marginBottom: getHeight(5),
    },
    messageRecent: {
      color: colorScheme === "light" ? colors.black : colors.white,
    },
  });

export default styles;
