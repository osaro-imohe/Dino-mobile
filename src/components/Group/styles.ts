import { StyleSheet } from "react-native";
import { colors, getHeight, getWidth } from "../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    groupSegmentContinaer: {
      width: "100%",
      flexDirection: "row",
      marginTop: getHeight(25),
    },
    groupSegmentImage: {
      width: 50,
      height: 50,
      borderRadius: 5,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "transparent",
      backgroundColor:
        colorScheme === "light" ? colors.lightGray : colors.darkGray,
    },
    groupName: {
      fontSize: getHeight(16),
      marginLeft: getWidth(13),
      color: colorScheme === "light" ? colors.black : colors.white,
      fontWeight: "bold",
    },
    groupParticipantsContainer: {
      right: 0,
      position: "absolute",
    },
    groupParticipantsHeader: {
      color: colors.dork,
      fontSize: getHeight(14),
      fontWeight: "400",
    },
    groupParticipantsNumber: {
      alignSelf: "flex-end",
      color: colorScheme === "light" ? colors.black : colors.white,
      fontWeight: "500",
      fontSize: getHeight(16),
      marginTop: getHeight(2),
    },
  });

export default styles;
