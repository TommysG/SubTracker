import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function SubItem(props) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          width: 50,
          height: 50,
          uri:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/1200px-Netflix_icon.svg.png",
        }}
      />
      <View style={styles.info}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{props.name}</Text>
          <Text>
            ${props.fee}/{props.period}
          </Text>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.date}>{props.date}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "yellow",
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    paddingVertical: 10,
  },

  info: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "green",
    paddingHorizontal: 10,
  },

  dateContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
  },

  date: {
    backgroundColor: "#e5e0ff",
    padding: 10,
    borderRadius: 30,
    color: "#8963c6",
  },
});
