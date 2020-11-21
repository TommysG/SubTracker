import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import firebase from "../firebase";

export default function Profile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ marginTop: StatusBar.currentHeight * 2, padding: 20 }}
      >
        {/* ACCOUNT SETTINGS HEADER */}

        <Header
          title="Account"
          subtitle="Edit manage your account details"
          icon={<Octicons name="settings" size={24} color="white" />}
        />
        <Button title="Logout" onPress={() => firebase.auth().signOut()} />

        {/* ACCOUNT SETTINGS CONTENT */}
        <View style={styles.settingsItems}>
          <MyInput title="Username" value={user.displayName} border />
          <MyInput title="Email" value={user.email} border />
          <MyInput title="Phone" value="5435345423" border />
          <MyInput title="Password" secure border />
          <MyInput title="Confirm password" secure />
        </View>

        {/* FAQ HEADER */}
        <Header
          title="Help & Feedpack"
          subtitle="Reach us with your feedback question"
          icon={<MaterialIcons name="message" size={24} color="white" />}
        />

        {/* FAQ CONTENT */}
        <View style={[styles.settingsItems, { marginBottom: 30 }]}>
          <MyButton title="FAQ and Videos" border />
          <MyButton title="Contact us" />
          <MyButton title="Contact us" />
          <MyButton title="Contact us" />
        </View>
      </ScrollView>
    </View>
  );
}

const MyButton = ({ title, border }) => {
  return (
    <TouchableOpacity
      style={[
        styles.textInput,
        { paddingTop: 15, paddingBottom: 20 },
        border && { borderBottomColor: "lightgray", borderBottomWidth: 1 },
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ flex: 1 }}>{title}</Text>
        <Ionicons name="ios-arrow-forward" size={24} color="#a7aeb0" />
      </View>
    </TouchableOpacity>
  );
};

const Header = ({ title, subtitle, icon }) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 20 }}>
      <View style={styles.settingHeader}>{icon}</View>
      <View>
        <Text style={styles.textBig}>{title}</Text>
        <Text style={styles.textGray}>{subtitle}</Text>
      </View>
    </View>
  );
};

const MyInput = ({ title, value, secure, border }) => {
  return (
    <View
      style={[
        styles.textInput,
        { paddingTop: 15, paddingBottom: 20 },
        border && { borderBottomColor: "lightgray", borderBottomWidth: 1 },
      ]}
    >
      <Text style={{ color: "#a7aeb0" }}>{title}</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{ flex: 1, color: "black" }}
          value={value}
          secureTextEntry={secure}
        />
        <Ionicons name="ios-arrow-forward" size={24} color="#a7aeb0" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight * 2,
    //padding: 20,
  },

  settingHeader: {
    backgroundColor: "#8963c6",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  settingsItems: {
    backgroundColor: "#e1e5eb",
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 10,
  },

  textInput: {
    padding: 10,
    marginHorizontal: 20,
  },

  textBig: {
    fontSize: 18,
  },

  textGray: {
    color: "gray",
  },
});
