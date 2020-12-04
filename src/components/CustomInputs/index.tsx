import React, { useContext } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import Icon from "../../assets/icons";
import getStyles from "./styles";
import { colors } from "../../utils";
import { useState } from "react";
import { useColorScheme } from "react-native-appearance";
import { Context } from "../../context";

export const CustomFirstNameInput = () => {
  const { state, setState } = useContext(Context);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return (
    <TextInput
      placeholder="First Name"
      placeholderTextColor={colors.dork}
      style={styles.nameInput}
      onChangeText={(text) => setState({ ...state, firstName: text })}
    />
  );
};

export const CustomLastNameInput = () => {
  const { state, setState } = useContext(Context);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return (
    <TextInput
      placeholder="Last Name"
      placeholderTextColor={colors.dork}
      style={styles.nameInput}
      onChangeText={(text) => setState({ ...state, lastName: text })}
    />
  );
};

export const CustomLoginInput = () => {
  const { state, setState } = useContext(Context);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return (
    <TextInput
      placeholder="Email"
      placeholderTextColor={colors.dork}
      style={styles.emailInput}
      onChangeText={(text) => setState({ ...state, email: text })}
    />
  );
};

export const CustomPasswordInput = () => {
  const { state, setState } = useContext(Context);
  const [visibility, setVisibility] = useState(false);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  return (
    <View style={styles.passwordInputContainer}>
      <TouchableOpacity onPress={() => setVisibility(!visibility)}>
        <Icon
          name={visibility ? "eyeclosed" : "eyeopen"}
          style={styles.passwordInputLogo}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.dork}
        style={styles.passwordInput}
        secureTextEntry={visibility ? true : false}
        onChangeText={(text) => setState({ ...state, password: text })}
      />
    </View>
  );
};
