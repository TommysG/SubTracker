import React from "react";
import {
  Image,
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
function LandStack() {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: true, gestureDirection: "horizontal" }}
    >
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          width: 200,
          height: 200,
          uri: "./logo.png",
        }}
      />
      <Text style={styles.appName}>Sub micro</Text>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={{ color: "white" }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerBtn}>
        <Text style={{ color: "black" }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "purple",
    flex: 1,
    paddingHorizontal: 25,
  },
  appName: {
    borderTopWidth: 1,
    borderTopColor: "grey",
    fontSize: 25,
    textAlign: "center",
    padding: 20,
  },

  loginBtn: {
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    margin: 20,
    padding: 20,
  },

  registerBtn: {
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    margin: 20,
    padding: 20,
  },
});
