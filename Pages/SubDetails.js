import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function SubDetails({ route, navigation }) {
  const { item } = route.params;

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
  }
});
