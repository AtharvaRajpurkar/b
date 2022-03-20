import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

// screens
import Technology from "./screens/Technology";
import Mathematics from "./screens/Mathematics";
import Topics from "./screens/Topics";
import Engineering from "./screens/Engineering";
import Result from "./screens/Result";
import Science from "./screens/Science";



export default function App() {
  const Stack = createStackNavigator();

  const globalScreenOptions = {
    headerTintColor: "black",
    headerTitleAlign: "center",
    headerBackground: () => (
      <LinearGradient
        colors={["#acb6e5", "white"]}
        style={{ flex: 1 }}
        start={[0, 0]}
        end={[1, 0]}
      />
    ),
  };

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Topics"
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen component={Topics} name="Topics" />
        <Stack.Screen component={Science} name="Science" />
        <Stack.Screen component={Engineering} name="Engineering" />
        <Stack.Screen component={Result} name="Result" />
        <Stack.Screen component={Mathematics} name="Mathematics" />
        <Stack.Screen component={Technology} name="Technology" />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
