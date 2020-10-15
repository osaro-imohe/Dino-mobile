import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export const AuthError = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <View style={styles.authErrorContainer}>
      <Text style={styles.authErrorMessage}>{errorMessage}</Text>
    </View>
  );
};

export const GroupError = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <View style={styles.authErrorContainer}>
      <Text style={styles.authErrorMessage}>{errorMessage}</Text>
    </View>
  );
};
