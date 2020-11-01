import { NavigationContainer, StackActions } from "@react-navigation/native";
import React, { Fragment, useEffect, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppIntro from "../screens/AppIntro";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import Home from "../screens/Dashboard/Home";
import Groups from "../screens/Dashboard/Groups";
import Messages from "../screens/Dashboard/Messages";
import Account from "../screens/Dashboard/Account";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../assets/icons";
import { colors } from "../utils";
import { useColorScheme } from "react-native-appearance";
import { AsyncStorage } from "react-native";
import { Context } from "../context/index";
import { set } from "react-native-reanimated";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor;
          if (route.name === "Home") {
            iconName = "home";
            iconColor = focused ? colors.cherry : colors.dork;
          } else if (route.name === "Groups") {
            iconName = "groups";
            iconColor = focused ? colors.cherry : colors.dork;
          } else if (route.name === "Messages") {
            iconName = "messages";
            iconColor = focused ? colors.cherry : colors.dork;
          } else if (route.name === "Account") {
            iconName = "account";
            iconColor = focused ? colors.cherry : colors.dork;
          }
          return <Icon name={iconName} color={iconColor} />;
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor:
            colorScheme === "light" ? colors.white : colors.black,
          borderTopWidth: 0,
        },
        showLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Groups" component={Groups} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const Navigation = () => {
  const { state, setState } = useContext(Context);
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId");
        const firstName = await AsyncStorage.getItem("firstName");
        const lastName = await AsyncStorage.getItem("lastName");
        const email = await AsyncStorage.getItem("email");
        const groups = await AsyncStorage.getItem("groups");
        setState({
          token,
          userId,
          firstName,
          lastName,
          email,
          groups,
          password: "",
        });
      } catch (error) {
        throw new Error(error);
      }
    };
    getToken();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="AppIntro"
      >
        {state.token == "" ? (
          <>
            <Stack.Screen name="AppIntro" component={AppIntro} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : (
          <Stack.Screen name="Dashboard" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
