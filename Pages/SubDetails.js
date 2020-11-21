import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SubDetails({ route, navigation }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text>{item.name}</Text>
      <Text>${item.fee}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
