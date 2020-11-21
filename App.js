import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import History from "./Pages/History.js";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile.js";

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

export default function Auth() {
  const user = 1;

  return !user ? (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <App />
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator shifting initialRouteName="Subs">
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarColor: "#8963c6",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="history" size={26} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Subs"
          component={Home}
          options={{
            tabBarColor: "#8963c6",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="library-books" size={26} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarColor: "#8963c6",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person" size={26} color="white" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
