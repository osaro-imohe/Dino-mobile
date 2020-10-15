import { StyleSheet } from "react-native";
import { colors, getHeight, getWidth } from "../../../utils";

const styles = (colorScheme: any) => ({
  messageContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: colorScheme === "light" ? colors.white : colors.black,
    paddingLeft: getWidth(20),
    paddingRight: getWidth(20),
    paddingTop: getHeight(60),
  },
  messageHeader: {
    color: colorScheme === "light" ? colors.black : colors.white,
    fontSize: getHeight(30),
    fontWeight: "700",
    marginBottom: getHeight(15),
  },
});

export default styles;
