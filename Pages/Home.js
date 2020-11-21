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
import { createStackNavigator } from "@react-navigation/stack";
import { Searchbar } from "react-native-paper";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import SubItem from "../Components/SubItem";
import UpcomingSub from "../Components/UpcomingSub";
import NewSub from "./NewSub";
import SubDetails from "./SubDetails";

const info = [
  { id: "1", name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
  { id: "2", name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
  { id: "3", name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
  { id: "4", name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
  { id: "5", name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
  { id: "6", name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
  { id: "7", name: "Netflix", date: "21 May", fee: 15, period: "Monthly" },
];

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: true, gestureDirection: "horizontal" }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="New Subscription" component={NewSub} />
      <Stack.Screen name="SubDetails" component={SubDetails} />
    </Stack.Navigator>
  );
}

export function Home({ navigation }) {
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
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate("New Subscription")}
          >
            <MaterialIcons name="add" size={26} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("hide upcoming view")}>
            <MaterialIcons name="search" size={26} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Subs List */}
      <View style={{ flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={info}
          style={{ flex: 1 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("SubDetails", { item })}
            >
              <SubItem
                name={item.name}
                fee={item.fee}
                period={item.period}
                date={item.date}
              />
            </TouchableOpacity>
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
    paddingVertical: 20,
  },

  upcomingHeader: {
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 20,
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
