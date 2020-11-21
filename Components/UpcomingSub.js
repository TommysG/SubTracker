import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function UpcomingSub() {
  return (
    <View style={styles.container}>
      <View style={styles.upcomingSub}>
        <Image
          style={{ borderRadius: 15 }}
          source={{
            width: 50,
            height: 50,
            uri:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/1200px-Netflix_icon.svg.png",
          }}
        />

        <View style={styles.infoContainer}>
          <Text>$15</Text>
          <Text>Monthly</Text>
        </View>
      </View>

      <View style={{ paddingVertical: 10 }}>
        <Text style={{ flexShrink: 1 }}>Netflix standard</Text>
        <Text>6 days remain</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    maxWidth: 150,
    overflow: "hidden",
  },
  upcomingSub: {
    flexDirection: "row",
  },

  infoContainer: {
    paddingLeft: 10,
  },
});
