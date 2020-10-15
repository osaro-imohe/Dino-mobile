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
      setIsLoading(false);
      try {
        await AsyncStorage.setItem("token", `${data.SignIn.token}`);
        const token = await AsyncStorage.getItem("token");
        setState({
          token: token,
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    onError: async (error) => {
      setIsLoading(false);
      setIsError({
        error: error.message,
        showError: true,
      });
    },
  });

  //global application state
  const { state, setState, resetState } = useContext(Context);

  //local component state
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
        {isLoading ? (
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
