import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

const AddWorkerScreen = ({ navigation }) => {
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [fullNames, setFullNames] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddWorker = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://android-api-7sy3.onrender.com/api/v1/Activity/recordActivity",
        {
          date,
          email,
          fullNames,
          phoneNumber,
          location,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Worker added successfully");
      navigation.goBack();
    } catch (error) {
      console.error(
        "Error adding Worker:",
        error.response.data || error.message
      );
      Alert.alert("Error", "Failed to add worker. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add your Worker here!</Text>
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Names"
        value={fullNames}
        onChangeText={(text) => setFullNames(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <Button title="Add Worker" onPress={handleAddWorker} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default AddWorkerScreen;
