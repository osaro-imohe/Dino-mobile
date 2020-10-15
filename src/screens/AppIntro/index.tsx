import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ScreenProp } from "../../definition";
import { useColorScheme } from "react-native-appearance";
import getStyles from "./styles";

const AppIntro = ({ navigation }: ScreenProp) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return (
    <View style={styles.appIntroContainer}>
      <Image
        source={require("../../assets/images/bullhorn.png")}
        style={styles.appIntroLogo}
      />
      <Text style={styles.appIntroHeader}>
        The new way to{" "}
        <Text style={styles.appIntroHightlight}>communicate</Text> in class
      </Text>
      <Text style={styles.appIntroSubHeader}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Text>
      <TouchableOpacity
        style={styles.appIntroButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.appIntroButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppIntro;
