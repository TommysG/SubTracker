import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Axios from "axios";
import SubItem from "../Components/SubItem.js";
import firebase from "../firebase";

const screenWidth = Dimensions.get("window").width;

const getMonths = () => {
  var day = new Date();
  var currMonth = day.getMonth();

  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var result = [];

  for (let i = 0; i < 6; i++) {
    result.push(months[(currMonth + i) % 12]);
  }

  return result;
};

const chartConfig = {
  backgroundGradientFrom: "#e5e0ff",
  backgroundGradientTo: "#e5e0ff",
  fillShadowGradientOpacity: 0.2,
  fillShadowGradient: "#8963c6",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  propsForDots: {
    r: "3",
    stroke: "#ffffff",
  },
};

const getIndex = () => {
  let day = new Date();
  let month = day.getMonth();

  return month;
};

export default function history() {
  const [expenses, setData] = useState([]);
  const [historySubs, setHistorySubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = () => {
    let one = `http://192.168.2.7:3006/subscriptions/history/${
      firebase.default.auth().currentUser.uid
    }`;
    let two = `http://192.168.2.7:3006/subscriptions/history/graph/${
      firebase.default.auth().currentUser.uid
    }`;

    const requestOne = Axios.get(one);
    const requestTwo = Axios.get(two);

    Axios.all([requestOne, requestTwo])
      .then(
        Axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];

          setHistorySubs(responseOne.data.history);
          setLoading(false);
          setData(responseTwo);

          console.log(responseTwo);
        })
      )
      .catch((errors) => {
        // react on errors.
        alert(errors);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <SubItem
        name={item.name}
        fee={item.fee}
        date={item.paid_day}
        image={item.image}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.header}>Total expenses</Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.header}>Recent payments</Text>
      </View>
      <FlatList
        data={historySubs}
        renderItem={renderItem}
        style={styles.list}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchHistory} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 25,
  },
  rowContainer: {
    flexDirection: "row",
  },
  list: {
    flex: 5,
  },
  item: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },

  header: {
    flex: 1,
    paddingTop: 10,
    textAlign: "center",
    fontSize: 22,
  },
});
