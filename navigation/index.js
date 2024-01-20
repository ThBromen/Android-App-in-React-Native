import React from "react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ActivityScreen from "../screens/ActivityScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CattleScreen from "../screens/CowCattleScreen";
import FinancialScreen from "../screens/FinancialScreen";
import PastureScreen from "../screens/PastureScreen";
import LogoutScreen from "../screens/LogoutScreen";
import WorkerScreen from "../screens/WorkerScreen";
import AddActivityScreen from '../screens/AddActivityScreen';
import LinkingConfiguration from "./LinkingConfiguration";


export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Cattle" component={CattleScreen} />
      <Stack.Screen name="Financial" component={FinancialScreen} />
      <Stack.Screen name="Pasture" component={PastureScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
      <Stack.Screen name="Worker" component={WorkerScreen} />
      <Stack.Screen name="AddActivity" component={AddActivityScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
    </Stack.Navigator>
  );
}
