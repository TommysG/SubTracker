import React from "react";
import { View, Text, TextInput, StyleSheet, Switch } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function Notification() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Feather
          style={{ marginTop: 45, marginRight: 20 }}
          name="calendar"
          size={24}
          color="#8963c6"
        />
        <Text style={{ marginTop: 45, marginRight: 20 }}>Notify me </Text>
        <View style={styles.textInputBox}>
          <TextInput
            value="3"
            keyboardType="number-pad"
            style={{ paddingLeft: 10, fontSize: 18 }}
          />
        </View>
        <Text style={{ marginTop: 45, marginLeft: 20 }}>days before</Text>
      </View>
      <View style={styles.row}>
        <Ionicons
          style={{ marginRight: 30 }}
          name="ios-notifications"
          size={24}
          color="#8963c6"
        />

        <Text style={{ flex: 1, paddingBottom: 20 }}>Enable notifications</Text>
        <Switch></Switch>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 25,
  },
  textInputBox: {
    marginTop: 40,
    borderColor: "#8963c6",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#8963c6",
    paddingBottom: 10,
  },
});
