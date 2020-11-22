import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const currencies = [
  {
    id: 0,
    name: "Euro",
    symbol: "€",
    flag:
      "data:image/png;base64,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",
  },
  {
    id: 1,
    name: "US Dollar",
    symbol: "$",
    flag:
      "data:image/png;base64,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",
  },
  {
    id: 2,
    name: "Pound",
    symbol: "£",
    flag:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png",
  },
];

const renderItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.row}>
      <Image
        style={{ margin: 10 }}
        source={{ width: 45, height: 25, uri: item.flag }}
      />
      <Text style={{ flex: 1, margin: 10, paddingLeft: 20, fontSize: 18 }}>
        {item.name}
      </Text>
      <Text style={{ margin: 10, paddingLeft: 20, fontSize: 18 }}>
        {item.symbol}
      </Text>
    </TouchableOpacity>
  );
};
export default function Currency() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FlatList
        data={currencies}
        renderItem={renderItem}
        style={styles.list}
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
  row: {
    marginTop: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#8963c6",
    paddingBottom: 10,
  },
});
