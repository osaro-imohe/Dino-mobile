import { StyleSheet } from "react-native";
import { colors, getHeight, getWidth } from "../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    groupSegmentContainer: {
      width: "100%",
      flexDirection: "row",
      marginTop: getHeight(25),
      borderWidth: 1,
      borderRadius: 5,
      alignItems: "center",
      borderColor: colorScheme === "light" ? colors.lightGray : colors.darkGray,
    },
    groupSegmentImage: {
      width: 70,
      height: 70,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "transparent",
    },
    groupName: {
      fontSize: getHeight(16),
      marginLeft: getWidth(13),
      color: colorScheme === "light" ? colors.darkGray : colors.lightGray,
      fontWeight: "bold",
      overflow: "hidden",
      width: getWidth(120),
    },
    groupParticipantsContainer: {
      right: 0,
      position: "absolute",
      flexDirection: "row"
    },
    groupParticipantsHeader: {
      color: colors.dork,
      fontSize: getHeight(14),
      fontWeight: "400",
    },
    groupParticipantsNumber: {
      alignSelf: "flex-end",
      color: colorScheme === "light" ? colors.black : colors.lightGray,
      fontWeight: "500",
      fontSize: getHeight(15),
      marginRight: getWidth(10),
    },
  });

export default styles;
