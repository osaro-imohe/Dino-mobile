import { NavigationContainer, StackActions } from "@react-navigation/native";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppIntro from "../screens/AppIntro/appintro";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AppIntro" component={AppIntro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
