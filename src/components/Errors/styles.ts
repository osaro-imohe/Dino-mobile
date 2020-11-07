import { StyleSheet } from "react-native";
import { colors, getWidth, getHeight } from "../../utils/index";

const styles = StyleSheet.create({
  authErrorContainer: {
    borderWidth: 1,
    borderColor: colors.cherry,
    paddingTop: getHeight(10),
    paddingBottom: getHeight(10),
    paddingLeft: getWidth(10),
    paddingRight: getWidth(10),
    width: getWidth(325),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  authErrorMessage: {
    color: colors.cherry,
    fontSize: getHeight(16),
  },
  joinErrorMessage: {
    color: colors.cherry,
    fontSize: getHeight(16),
    marginTop: getHeight(10),
  },
  newPostErrorContainer: {
    borderWidth: 1,
    borderColor: colors.cherry,
    paddingTop: getHeight(10),
    paddingBottom: getHeight(10),
    paddingLeft: getWidth(5),
    paddingRight: getWidth(5),
    width: getWidth(325),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: getHeight(20),
    marginBottom: getHeight(20),
  },
  newPostErrorMessage: {
    color: colors.cherry,
    fontSize: getHeight(16),
  },
});

export default styles;
