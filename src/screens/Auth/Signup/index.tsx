import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenProp } from "../../../definition";
import getStyles from "./styles";
import {
  CustomLoginInput,
  CustomPasswordInput,
  CustomFirstNameInput,
  CustomLastNameInput,
} from "../../../components/CustomInputs";
import { useColorScheme } from "react-native-appearance";
import { Context } from "../../../context";
import { checkValidEmail, colors } from "../../../utils";
import { SignUp } from "../../../graphql/mutations/Auth";
import { useMutation } from "@apollo/client";
import { AuthError } from "../../../components/Errors/index";
import { AsyncStorage } from "react-native";

const signup = ({ navigation }: ScreenProp) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  //global application state
  const { state, setState, resetState } = useContext(Context);

  //signUp mutation, data and mutation attributes
  const [signUp, { loading }] = useMutation(SignUp, {
    onCompleted: async (data) => {
      setIsLoading(false);
      try {
        await AsyncStorage.setItem("token", `${data.SignUp.token}`);
        await AsyncStorage.setItem("userId", `${data.SignUp.user_id}`);
        await AsyncStorage.setItem("firstName", `${data.SignUp.first_name}`);
        await AsyncStorage.setItem("lastName", `${data.SignUp.last_name}`);
        await AsyncStorage.setItem("email", `${data.SignUp.email}`);
        if (data.SignUp.profile_picture_url === null) {
          await AsyncStorage.setItem("profile_picture_url", "");
        } else {
          await AsyncStorage.setItem(
            "profile_picture_url",
            `${data.SignUp.profile_picture_url}`
          );
        }
        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId");
        const firstName = await AsyncStorage.getItem("firstName");
        const lastName = await AsyncStorage.getItem("lastName");
        const email = await AsyncStorage.getItem("email");
        const profilePictureUrl = await AsyncStorage.getItem(
          "profile_picture_url"
        );
        setState({
          token,
          userId,
          firstName,
          lastName,
          email,
          profilePictureUrl,
          password: "",
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    onError: (error) => {
      setIsLoading(false);
      setIsError({
        error: error.message,
        showError: true,
      });
    },
  });

  //local component state
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    error: "",
    showError: false,
  });

  //function to check if form is complete
  const checkValid = () => {
    if (state.firstName === "") return true;
    else if (state.lastName === "") return true;
    else if (!checkValidEmail(state.email)) return true;
    else if (state.password.length < 5 || state.password === "") return true;
    return false;
  };

  const createAccount = () => {
    setIsLoading(true);
    setIsError({
      error: "",
      showError: false,
    });
    signUp({
      variables: {
        email: state.email,
        password: state.password,
        first_name: state.firstName,
        last_name: state.lastName,
      },
    });
  };

  //reset user name email and password values when component unmounts
  // useEffect(() => {
  //   resetState();
  // }, []);

  return (
    <View style={styles.signupContainer}>
      <Text style={styles.signupHeader}>Dino</Text>
      {isError.showError ? <AuthError errorMessage={isError.error} /> : null}
      <CustomFirstNameInput />
      <CustomLastNameInput />
      <CustomLoginInput />
      <CustomPasswordInput />
      <TouchableOpacity
        style={
          checkValid() === true
            ? styles.signupButtonDisabled
            : styles.signupButton
        }
        disabled={checkValid()}
        onPress={createAccount}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <Text style={styles.signupText}>Sign up</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.signupCaption}>
        Already have an account?{"  "}
        <Text
          style={styles.signupHightlight}
          onPress={() => navigation.navigate("Login")}
        >
          Log in
        </Text>
      </Text>
    </View>
  );
};

export default signup;
