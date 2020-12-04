import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import getStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import { colors, getHeight, getWidth } from "../../../utils";
import Icon from "../../../assets/icons";
import { AsyncStorage, Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Context } from "../../../context/index";
import client from "../../../graphql/client";
import { cache } from "../../../graphql/cache";

type imageProps = any | null;

const Account = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const { state, setState } = useContext(Context);

  const [image, setImage] = useState<imageProps>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const clear = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("firstName");
      await AsyncStorage.removeItem("lastName");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("profilePictureUrl");
      setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        token: "",
        userId: 0,
        profilePictureUrl: "",
      });
    } catch (error) {
      throw new Error(error);
    }
    await client.resetStore();
  };
  return (
    <View style={styles.accountContainer}>
      <Text style={styles.accountHeader}>Account</Text>
      <View style={{ flexDirection: "row", marginBottom: getHeight(45) }}>
        <TouchableOpacity onPress={pickImage}>
          {state.profilePictureUrl === null || !state.profilePictureUrl ? (
            <View style={styles.noAccountImage}>
              <Icon name="user" color={colors.dork} />
            </View>
          ) : (
            <Image source={{ uri: "hello" }} style={styles.accountImage} />
          )}
        </TouchableOpacity>
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
