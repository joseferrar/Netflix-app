import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../screens/Search";
import Coming from "../screens/Coming";
import Ionicons from "react-native-vector-icons/Ionicons";
import TabHeader from "../Navbar/TabHeader";
import More from "../screens/More";

const Tab = createBottomTabNavigator();

const TabNavbar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Coming Soon") {
            iconName = focused ? "easel" : "easel";
          } else if (route.name === "Search") {
            iconName = focused ? "ios-search" : "ios-search";
          } else if (route.name === "Home") {
            iconName = focused ? "home-outline" : "home-outline";
          } else if (route.name === "More") {
            iconName = focused ? "options-outline" : "options-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: "gray",
        style: {
          backgroundColor: "#000",
          elevation: 4,
          borderTopWidth: 0,
          height: 50,
        },
      }}
    >
      <Tab.Screen name="Home" component={TabHeader} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Coming Soon" component={Coming} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

export default TabNavbar;

const styles = StyleSheet.create({});
