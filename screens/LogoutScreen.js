import { AsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

const LogoutScreen = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      if (route && route.params && route.params._id) {
        const id = route.params._id;
        const response = await axios.get(
          `https://smart-farming-api.onrender.com/api/v1/user/userbyid/${id}`
        );

        if (response.ok) {
          setUserData(response.data);
        } else {
          console.error("Failed to fetch user data:", response.data);
        }
      } else {
        console.error("Invalid or missing user ID in route params");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (route && route.params && route.params._id) {
        const id = route.params._id;
        const response = await fetch(
          `https://smart-farming-api.onrender.com/api/v1/user/deleteuser/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          Alert.alert(
            "Account Deleted",
            "Your account has been successfully deleted."
          );
          navigation.navigate("Home");
        } else {
          const errorData = await response.json();
          console.error("Failed to delete account:", errorData);
        }
      } else {
        console.error("Invalid or missing user ID in route params");
      }
    } catch (error) {
      console.error("Error deleting account:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("user");
      await AsyncStorage.clear();
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <View>
          <Text style={styles.text}>Date: {userData.date}</Text>
          <Text style={styles.text}>Email: {userData.email}</Text>
          <Text style={styles.text}>Full Names: {userData.fullNames}</Text>
          <Text style={styles.text}>Phone Number: {userData.phoneNumber}</Text>
          <Text style={styles.text}>Location: {userData.location}</Text>

          <Button
            title="Delete Account"
            onPress={handleDeleteAccount}
            color="red"
          />
        </View>
      ) : (
        <Text style={styles.text}>Loading user data...</Text>
      )}
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
