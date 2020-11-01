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
});

export default styles;
