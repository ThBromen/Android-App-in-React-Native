import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    clearAsyncStorage();
  }, []);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("user");
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error.message);
    }
  };

  const handleLogout = () => {
    clearAsyncStorage();

    navigation.navigate("Bromen.com");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to log out?</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

export default LogoutScreen;
