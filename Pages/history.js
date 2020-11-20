import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Dimensions } from "react-native";
import {LineChart} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100],
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
      strokeWidth: 2 
    }
  ],
};

const chartConfig = {
    backgroundGradientFrom: "#edf4fc",
    backgroundGradientTo: "#edf4fc",	
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
    propsForDots: {
        r: "3",
        stroke: "#ffffff"
      }
};

const latestPayments = [
    {
        name: "Netflix",
        paid_day: "12 May",
        fee: "15$"
    },
    {
        name: "Spotify",
        paid_day: "15 May",
        fee: "10$"
    },
    {
        name: "Gym",
        paid_day: "4 May",
        fee: "30$"
    },    
]

const Item = ({ name, paid, fee, }) => (
    <View style={styles.item}>
       <View style={styles.rowContainer}>
           <Text style={styles.side}>ICON</Text>
           <View style={styles.middle}>
                <Text style={{fontSize: 20}}>{name}</Text>
                <Text style={{color: 'gray'}}>{paid}</Text>
           </View>
           <Text style={styles.side}>30$</Text>
       </View>
    </View>
);

export default function history() {
  const renderItem = ({ item }) => {
    return (
      <Item name={item.name} paid={item.paid_day} />
    );
  };
    return (
        <View style={styles.container}>
            <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                withHorizontalLines = {false}
                withVerticalLines = {false}
                bezier
            />
            <View style={styles.rowContainer}>
                <Text style={styles.listHeader}>Recent payments</Text>
                <Text style={{
                     paddingTop: 10,
                     marginEnd: 30
                }}> 90/Month</Text>
            </View>
            <FlatList
                data={latestPayments}
                renderItem={renderItem}
                style={styles.list}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    rowContainer: {
        flexDirection: 'row'
    },
    list:{
        flex: 5,
    },
    item: {
        borderRadius: 10,
        padding: 10,
        margin: 5
    },

    listHeader: {
        flex: 1,
        paddingTop:10,
        marginLeft: 20,
        fontSize: 22,
    },
    middle: {
        paddingLeft: 20,
        flex: 3,
    },

    side: {
        textAlign: "center",
        flex: 1,
        backgroundColor: '#ededed',
        padding: 10,
        borderRadius: 10
    }
});