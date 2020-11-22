import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import SubItem from "../Components/SubItem.js";

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [
        1, 3, 6, 2, 5, 4
      ],
      color: (opacity = 1) => `rgb(137, 99, 198, ${opacity})`, // optional
      strokeWidth: 2,
    },
  ],
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

const latestPayments = [
  {
    id: "1",
    name: "Netflix",
    paid_day: "12 May",
    fee: "15",
  },
  {
    id: "2",
    name: "Spotify",
    paid_day: "15 May",
    fee: "10",
  },
  {
    id: "3",
    name: "Gym",
    paid_day: "4 May",
    fee: "30",
  },
];


export default function history() {
  const renderItem = ({ item }) => {
    return <SubItem 
                name={item.name}
                fee={item.fee}
                date={item.paid_day} 
            />;
  };
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.header}>Total expenses</Text>
      </View>
      <LineChart
        data={data}
        width={screenWidth-screenWidth*0.15}
        height={220}
        chartConfig={chartConfig}
        withHorizontalLines={false}
        withVerticalLines={false}
        bezier
        style={{
          paddingTop: 15,
          borderRadius: 20
      }}
      />
      <View style={styles.rowContainer}>
        <Text style={styles.header}>Recent payments</Text>
      </View>
      <FlatList
        data={latestPayments}
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
    paddingTop: 30,
    paddingHorizontal: 25
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
