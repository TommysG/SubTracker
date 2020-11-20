import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import home from "./Pages/home.js";
import history from "./Pages/history.js";
import { MaterialIcons } from '@expo/vector-icons';


const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="History" component={history}
         options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={20} color="white" />
          ),
          }}/>
        <Tab.Screen name="Subs" component={home} 
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="library-books" size={20} color="white" />
            ),
          }}/>
        <Tab.Screen name="Profile" component={home} 
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person-outline" size={24} color="white" />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );  
}

const styles = StyleSheet.create({
});
