import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const AddPastureScreen = ({ navigation }) => {
  const [pastureName, setPastureName] = useState("");
  const [owner, setOwner] = useState("");
  const [area, setArea] = useState("");
  const [numberOfCattles, setNumberOfCattles] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddPasture = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://android-api-7sy3.onrender.com/api/v1/pasture/addPasture",
        {
          pastureName,
          owner,
          area,
          numberOfCattles,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Pasture added successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding pasture:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add your Pasture here!</Text>
      <TextInput
        style={styles.input}
        placeholder="Pasture Name"
        value={pastureName}
        onChangeText={(text) => setPastureName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Owner"
        value={owner}
        onChangeText={(text) => setOwner(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Area"
        value={area}
        onChangeText={(text) => setArea(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Cattles"
        value={numberOfCattles}
        onChangeText={(text) => setNumberOfCattles(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Pasture" onPress={handleAddPasture} />
        {loading && <ActivityIndicator style={styles.loader} />}
      </View>
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
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  loader: {
    marginLeft: 10,
  },
});

export default AddPastureScreen;
