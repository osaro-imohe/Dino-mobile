import { StyleSheet } from "react-native";
import { colors, getHeight, getWidth } from "../../utils";

const styles = (colorScheme: any) =>
  StyleSheet.create({
    newCommentContainer: {
      backgroundColor: colorScheme === "light" ? colors.white : colors.black,
      width: "100%",
      borderColor: colors.dork,
      borderBottomWidth: getHeight(1),
      borderTopWidth: getHeight(1),
      paddingBottom: getHeight(10),
      paddingTop: getHeight(10),
      marginBottom: getHeight(5),
    },
    newCommentHeader: {
      marginBottom: getHeight(10),
      color: colors.dork,
    },
    newCommentInput: {
      borderColor: colors.dork,
      borderWidth: 1,
      borderRadius: getHeight(5),
      paddingLeft: getHeight(5),
      paddingRight: getHeight(5),
      paddingTop: getHeight(5),
      paddingBottom: getHeight(5),
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    newCommentHeaderBolds: {
      color: colorScheme === "light" ? colors.black : colors.white,
    },
    newCommentButton: {
      backgroundColor: colors.cherry,
      paddingTop: getHeight(5),
      paddingBottom: getHeight(5),
      paddingLeft: getWidth(5),
      paddingRight: getWidth(5),
      marginTop: getHeight(5),
      borderRadius: getHeight(5),
    },
    newCommentButtonDisabled: {
      backgroundColor: colors.dork,
      paddingTop: getHeight(5),
      paddingBottom: getHeight(5),
      paddingLeft: getWidth(5),
      paddingRight: getWidth(5),
      marginTop: getHeight(5),
      borderRadius: getHeight(5),
    },
    newCommentButtonText: {
      color: colors.white,
    },
  });

export default styles;
