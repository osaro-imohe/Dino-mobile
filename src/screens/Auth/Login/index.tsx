import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { ScreenProp } from "../../../definition";
import getStyles from "../../Auth/Login/styles";
import { useColorScheme } from "react-native-appearance";
import { Context } from "../../../context/index";
import { checkValidEmail } from "../../../utils/";
import { colors } from "../../../utils";
import { SignIn } from "../../../graphql/mutations/Auth";
import { useMutation } from "@apollo/client";
import { AuthError } from "../../../components/Errors/index";
import {
  CustomLoginInput,
  CustomPasswordInput,
} from "../../../components/CustomInputs";

const Login = ({ navigation }: ScreenProp) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  //signIn mutation, data and mutation attributes
  const [signIn, { loading }] = useMutation(SignIn, {
    onCompleted: async (data) => {
      console.log(data);
      try {
        await AsyncStorage.setItem("token", `${data.SignIn.token}`);
        await AsyncStorage.setItem("userId", `${data.SignIn.user_id}`);
        await AsyncStorage.setItem("firstName", `${data.SignIn.first_name}`);
        await AsyncStorage.setItem("lastName", `${data.SignIn.last_name}`);
        await AsyncStorage.setItem("email", `${data.SignIn.email}`);
        if (data.SignIn.profile_picture_url === null) {
          await AsyncStorage.setItem("profile_picture_url", "");
        } else {
          await AsyncStorage.setItem(
            "profile_picture_url",
            `${data.SignIn.profile_picture_url}`
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
    onError: async (error) => {
      setIsError({
        error: error.message,
        showError: true,
      });
    },
  });

  //global application state
  const { state, setState, resetState } = useContext(Context);

  //local component state
  const [isError, setIsError] = useState({
    error: "",
    showError: false,
  });

  //function to check if form is complete
  const checkValid = () => {
    if (!checkValidEmail(state.email)) return true;
    else if (state.password.length < 5 || state.password === "") return true;
    return false;
  };

  //reset user name email and password values when component unmounts
  useEffect(() => {
    resetState();
  }, []);

  const authenticateUser = () => {
    setIsError({
      error: "",
      showError: false,
    });
    signIn({ variables: { email: state.email, password: state.password } });
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginHeader}>Dino</Text>
      {isError.showError ? <AuthError errorMessage={isError.error} /> : null}
      <CustomLoginInput />
      <CustomPasswordInput />
      <TouchableOpacity
        style={checkValid() ? styles.loginButtonDisabled : styles.loginButton}
        disabled={checkValid()}
        onPress={authenticateUser}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <Text style={styles.loginText}>Log In</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.loginCaption}>
        Don't have an account?{"  "}
        <Text
          style={styles.loginHightlight}
          onPress={() => navigation.navigate("Signup")}
        >
          Sign up
        </Text>
      </Text>
    </View>
  );
};

export default Login;
