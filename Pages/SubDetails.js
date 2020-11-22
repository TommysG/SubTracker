import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import axios from "../axios";
import firebase from "../firebase";

export default function SubDetails({ route, navigation }) {
  const { item } = route.params;

  const addHistory = () => {
    axios({
      method: "post",
      url: "/subscriptions/history",
      data: {
        user_id: firebase.default.auth().currentUser.uid,
        name: item.name,
        description: item.description,
        fee: item.fee,
        period: item.period,
        end_date: Date.now(),
        image: item.image,
      },
    })
      .then((response) => console.log(response))
      .catch((err) => alert(err));
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          width: 100,
          height: 100,
          uri:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/1200px-Netflix_icon.svg.png",
        }}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text>${item.fee}</Text>

      <Button title="Pay" onPress={addHistory}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: "center",
  },

  name: {
    paddingTop: 10,
    fontSize: 25,
  },
});
