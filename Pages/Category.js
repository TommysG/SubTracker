import React, { useState } from "react";
import {
  Button,
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const CategoryItem = ({ name }) => {
  return (
    <View style={styles.categoryItem}>
      <MaterialIcons name="label" size={24} color="#8963c6" />
      <Text style={styles.name}>{name}</Text>
      <Feather name="delete" size={24} color="black" />
    </View>
  );
};
export default function Category() {
  const [data, setData] = useState([
    {
      id: 0,
      name: "Game",
    },
    {
      id: 1,
      name: "Daily",
    },
    {
      id: 2,
      name: "Music",
    },
  ]);
  const renderItem = ({ item }) => {
    return <CategoryItem name={item.name} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputBox}>
        <TextInput
          placeholder="Add new category"
          style={{ flex: 1, fontSize: 18 }}
        />
        <TouchableOpacity>
          <Text style={{ paddingRight: 10, fontSize: 22 }}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  textInputBox: {
    flexDirection: "row",
    marginTop: 30,
    borderColor: "#8963c6",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: "row",
    flex: 5,
    padding: 10,
  },
  name: {
    paddingLeft: 10,
    flex: 3,
  },
});
