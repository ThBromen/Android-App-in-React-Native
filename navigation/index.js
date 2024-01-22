import React, { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AddActivityScreen from "../screens/AddActivityScreen";
import AddFinancialScreen from "../screens/AddFinancialScreen";
import AddCattleScreen from "../screens/AddCattleScreen";
import AddPastureScreen from "../screens/AddPastureScreen";
import AddWorkerScreen from "../screens/AddWorkerScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import { getData } from "../.expo/storage/storage";
import LogoutScreen from "../screens/LogoutScreen";
import TabOneScreen from "../screens/TabOneScreen";

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const setUserData = async () => {
      setUser(await getData("user"));
    };
    setUserData();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Authenticated" component={AuthenticatedStack} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Unauthenticated"
            component={UnauthenticatedStack}
          />
        </>
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

const AuthenticatedStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="AddActivity" component={AddActivityScreen} />
    <Stack.Screen name="AddCattle" component={AddCattleScreen} />
    <Stack.Screen name="AddFinancial" component={AddFinancialScreen} />
    <Stack.Screen name="AddPasture" component={AddPastureScreen} />
    <Stack.Screen name="AddWorker" component={AddWorkerScreen} />
    <Stack.Screen name="Logout" component={LogoutScreen} />
  </Stack.Navigator>
);

const UnauthenticatedStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Bromen.com" component={BottomTabNavigator} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
  </Stack.Navigator>
);
