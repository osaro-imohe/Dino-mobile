import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import getStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import { colors, getHeight, getWidth } from "../../../utils";
import Icon from "../../../assets/icons";
import { AsyncStorage } from "react-native";
import { Context } from "../../../context/index";

const Account = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const { state, setState } = useContext(Context);
  const clear = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("firstName");
      await AsyncStorage.removeItem("lastName");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("userId");

      setState({
        token: "",
      });
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <View style={styles.accountContainer}>
      <Text style={styles.accountHeader}>Account</Text>
      <View style={{ flexDirection: "row", marginBottom: getHeight(45) }}>
        <Image style={styles.accountImage} />
        <View style={styles.accountInfo}>
          <Text style={styles.accountInfoName}>{state.firstName}</Text>
          <Text style={styles.accountInfoEmail}>{state.email}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <View style={styles.accountOptionsAlign}>
          <Text style={styles.accountPassword}>Password</Text>
          <Icon
            name="rightarrow"
            color={colors.dork}
            style={styles.accountPasswordIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.accountSignOut} onPress={clear}>
        <Text style={styles.accountLogoutText}>Sign out</Text>
        <Icon
          name="logout"
          color={colorScheme === "light" ? colors.black : colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Account;
