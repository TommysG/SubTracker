import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SubItem(props) {
  const properDay = () => {
    var dd = String(props.date.getDate()).padStart(2, "0");
    var mm = String(props.date.getMonth() + 1).padStart(2, "0");
    var today = mm + "/" + dd;
    return today;
  };
  const image = props.image;
  return (
    <View style={styles.container}>
      <Image
        style={{ borderRadius: 10 }}
        source={{
          width: 50,
          height: 50,
          uri: image,
        }}
      />
      <View style={styles.info}>
        <TouchableOpacity onPress={props.onNamePress}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{props.name}</Text>
          <Text>
            ${props.fee}/{props.period}
          </Text>
        </TouchableOpacity>

        <View style={styles.dateContainer}>
          <Text style={styles.date}>{properDay()}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={props.onPress}>
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
  },
});
