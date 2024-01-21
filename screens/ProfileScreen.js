// ProfileScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

const ProfileScreen = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const id = route.params.userId; // Get the user ID from the route parameters
      const response = await fetch(
        `https://smart-farming-api.onrender.com/api/v1/user/userbyid/${id}`
      );
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        // Handle error, maybe show an error message to the user
        console.error("Failed to fetch user data:", data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const id = route.params.userId; // Get the user ID from the route parameters
      const response = await fetch(
        `https://smart-farming-api.onrender.com/api/v1/user/deleteuser/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Account deleted successfully
        // You might want to navigate the user to a different screen or perform any additional actions
        Alert.alert(
          "Account Deleted",
          "Your account has been successfully deleted."
        );
        navigation.navigate("Home"); // Navigate to the Home screen after deleting the account
      } else {
        // Handle error, maybe show an error message to the user
        const errorData = await response.json();
        console.error("Failed to delete account:", errorData);
      }
    } catch (error) {
      console.error("Error deleting account:", error.message);
    }
  };

  const handleLogout = () => {
    // You can add your logout logic here
    // For example, clearing user data from AsyncStorage, etc.
    // Then navigate to the Home screen
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {userData?.name}</Text>
      {userData ? (
        <View>
          {Object.entries(userData).map(([key, value]) => (
            <Text style={styles.text} key={key}>
              {key}: {value}
            </Text>
          ))}
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

export default ProfileScreen;
