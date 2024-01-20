// Import the necessary components and modules
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import LoginScreen from "../screens/LoginScreen";

// Create a BottomTabNavigator
const BottomTab = createBottomTabNavigator();

// Main function for BottomTabNavigator
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Setting"
        component={TabTwoNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings-outline" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Login"
        component={TabThreeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="log-in-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// Custom TabBarIcon component
function TabBarIcon({ name, color }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} name={name} color={color} />;
}

// Create a stack navigator for TabOneScreen
const TabOneStack = createStackNavigator();
function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Home" }}
      />
    </TabOneStack.Navigator>
  );
}

// Create a stack navigator for TabTwoScreen
const TabTwoStack = createStackNavigator();
function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Setting" }}
      />
    </TabTwoStack.Navigator>
  );
}

// Create a stack navigator for LoginScreen
const TabThreeStack = createStackNavigator();
function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: "Login" }}
      />
    </TabThreeStack.Navigator>
  );
}
