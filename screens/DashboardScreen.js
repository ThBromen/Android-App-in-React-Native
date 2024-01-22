import React, { useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ActivityScreen from "./ActivityScreen";
import WorkerScreen from "./WorkerScreen";
import FinancialScreen from "./FinancialScreen";
import PastureScreen from "./PastureScreen";
import LogoutScreen from "./LogoutScreen";
import CattleScreen from "./CowCattleScreen";

const Tab = createBottomTabNavigator();

const DashboardScreen = ({ navigation }) => {
  const handleTabPress = useCallback(
    (routeName) => {
      navigation.push(routeName);
    },
    [navigation]
  );

  const getTabBarIcon = (routeName, focused, color, size) => {
    const iconMapping = {
      Activity: "play-circle",
      Cattle: "paw",
      Financial: "cash",
      Pasture: "leaf",
      Logout: "exit",
      Worker: "people",
    };

    const iconName = iconMapping[routeName] || "information-circle";

    return (
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress(routeName)}
      >
        <Ionicons name={iconName} size={size} color={color} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
            getTabBarIcon(route.name, focused, color, size),
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          style: {
            display: "flex",
          },
        }}
      >
        <Tab.Screen name="Activity" component={ActivityScreen} />
        <Tab.Screen name="Cattle" component={CattleScreen} />
        <Tab.Screen name="Financial" component={FinancialScreen} />
        <Tab.Screen name="Pasture" component={PastureScreen} />
        <Tab.Screen name="Worker" component={WorkerScreen} />
        <Tab.Screen name="Logout" component={LogoutScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
});

export default DashboardScreen;
