import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

import SubItem from "../Components/SubItem";
import UpcomingSub from "../Components/UpcomingSub";

const info = [
  { id: 1, name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
  { id: 2, name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
  { id: 3, name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
  { id: 4, name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
  { id: 5, name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
  { id: 6, name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
  { id: 7, name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textBig}>Good Morning</Text>
        <Text style={[styles.textBold, styles.textBig]}>Tommys Gian 👏</Text>
      </View>

      <View style={styles.upcomingPayments}>
        {/* Header upcoming payments */}
        <View style={styles.upcomingHeader}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Upcoming</Text>
          <Text style={{ fontSize: 24, fontFamily: "sans-serif-light" }}>
            Payment
          </Text>
        </View>

        {/* Upcoming Subs */}
        <View style={styles.upcomingList}>
          <UpcomingSub />
          <UpcomingSub />
        </View>
      </View>

      {/* Active subscriptions */}
      <View>
        <View style={{ flexDirection: "row", paddingBottom: 5 }}>
          <Text style={{ fontSize: 18, flex: 1 }}>Active Subscriptions</Text>
          <TouchableOpacity onPress={() => console.log("hide upcoming view")}>
            <AntDesign name="search1" size={20} />
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          data={info}
          renderItem={({ item }) => (
            <SubItem
              name={item.name}
              fee={item.fee}
              period={item.period}
              date={item.date}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + 20,
    backgroundColor: "#fafafc",
    paddingHorizontal: 25,
    flex: 1,
  },

  upcomingPayments: {
    // backgroundColor: "purple",
    paddingVertical: 50,
  },

  upcomingHeader: {
    alignItems: "center",

    paddingTop: 5,
    paddingBottom: 40,
  },
  upcomingList: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  textBig: {
    fontSize: 20,
  },

  textBold: {
    fontWeight: "bold",
  },
});
