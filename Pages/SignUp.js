import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SignUp({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <TextInput placeholder="Email" />
      </View>

      <View style={styles.textInput}>
        <TextInput secureTextEntry placeholder="Password" />
      </View>

      <Button title="SignUp" onPress={() => console.log("SignUp")} />

      <View
        style={{
          paddingBottom: 20,
          alignItems: "center",
          position: "absolute",
          bottom: 0,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>If you already have an account Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },

  bottomButton: {
    position: "absolute",
    bottom: 0,
  },
});
