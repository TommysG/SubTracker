import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "../firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((value) => console.log("logged in"))
      .catch((err) => alert(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>

      <View style={styles.textInput}>
        <TextInput
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      <Button title="Login" onPress={login} />

      <View
        style={{
          paddingBottom: 20,
          alignItems: "center",
          position: "absolute",
          bottom: 0,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text>If you don't have an account SignUp</Text>
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
