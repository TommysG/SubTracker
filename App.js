import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import History from "./Pages/History.js";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "./firebase";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { selectUser, login, logout } from "./features/userSlice";

import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import LandingPage from "./Pages/LandingPage.js";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile.js";

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

export default function AppProvider() {
  return (
    <Provider store={store}>
      <Auth />
    </Provider>
  );
}

function Auth() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        const token = authUser.getIdToken().then((token) => {
          dispatch(
            login({
              uid: authUser.uid,
              email: authUser.email,
              displayName: authUser.displayName,
              token: token,
            })
          );
        });

        alert("Καλησπέρα τι κάνεις εσύ?");
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {user ? (
        <UserDashboard />
      ) : (
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingPage} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function UserDashboard() {
  return (
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
  );
}

const styles = StyleSheet.create({});
