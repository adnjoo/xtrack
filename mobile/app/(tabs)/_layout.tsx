import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: "#ffffff",
        tabBarInactiveBackgroundColor: "white",
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Spending",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={24} name="attach-money" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cog" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  tabIndicator: {
    backgroundColor: "blue",
    height: 3,
  },
});
