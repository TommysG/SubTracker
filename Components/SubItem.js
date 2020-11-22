import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { FontAwesome5 } from '@expo/vector-icons';

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

        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="trash" size={22} color="black" />
        </TouchableOpacity>
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

  button: {
    marginLeft: 15,
    paddingTop: 10,
  }
});
