import React, { useEffect, useState } from "react";
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
  RefreshControl,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Searchbar } from "react-native-paper";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import SubItem from "../Components/SubItem";
import UpcomingSub from "../Components/UpcomingSub";
import NewSub from "./NewSub";
import SubDetails from "./SubDetails";
import axios from "../axios";
import firebase from "../firebase";
import { sub } from "react-native-reanimated";

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
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubs = () => {
    axios({
      method: "get",
      url: `/subscriptions/${firebase.default.auth().currentUser.uid}`,
    })
      .then((response) => {
        setSubs(response.data.subscriptions);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchSubs();
  }, [subs]);

  const deleteSub = (item) => {
    axios({
      method: "delete",
      url: `subscriptions/delete?user_id=${
        firebase.default.auth().currentUser.uid
      }&item_id=${item._id}`,
    })
      .then((response) => {
        console.log(response);
        fetchSubs();
      })
      .catch((err) => alert(err));
  };

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
          data={subs}
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchSubs} />
          }
          renderItem={({ item }) => (
            <SubItem
              name={item.name}
              fee={item.fee}
              period={item.period}
              date={item.date}
              image={item.image}
              onNamePress={() => navigation.navigate("SubDetails", { item })}
              onPress={() => deleteSub(item)}
            />
          )}
          keyExtractor={(item) => item._id}
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
