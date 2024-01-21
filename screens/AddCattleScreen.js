import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const AddCattleScreen = ({ navigation }) => {
  const [earTag, setEarTag] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [breedType, setBreedType] = useState("");
  const [status, setStatus] = useState("");
  const [calfNumber, setCalfNumber] = useState("");
  const [lactating, setLactating] = useState("");
  const [numberOfCalving, setNumberOfCalving] = useState("");
  const [litresOfMilkItProduces, setLitresOfMilkItProduces] = useState("");
  const [inseminationPeriod, setInseminationPeriod] = useState("");

  const handleAddActivity = async () => {
    try {
      const response = await axios.post(
        "https://android-api-7sy3.onrender.com/api/v1/createCow/recordCow",
        {
          earTag,
          categoryType,
          breedType,
          status,
          calfNumber,
          lactating,
          numberOfCalving,
          litresOfMilkItProduces,
          inseminationPeriod,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Cow added successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding Cow:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add your Cow here!</Text>
      <TextInput
        style={styles.input}
        placeholder="Ear Tag"
        value={earTag}
        onChangeText={(text) => setEarTag(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Category Type"
        value={categoryType}
        onChangeText={(text) => setCategoryType(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Breed Type"
        value={breedType}
        onChangeText={(text) => setBreedType(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={(text) => setStatus(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Calf Number"
        value={calfNumber}
        onChangeText={(text) => setCalfNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Lactating"
        value={lactating}
        onChangeText={(text) => setLactating(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Calving"
        value={numberOfCalving}
        onChangeText={(text) => setNumberOfCalving(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Litres of Milk It Produces"
        value={litresOfMilkItProduces}
        onChangeText={(text) => setLitresOfMilkItProduces(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Insemination Period"
        value={inseminationPeriod}
        onChangeText={(text) => setInseminationPeriod(text)}
      />

      <Button title="Add Cow" onPress={handleAddActivity} />
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

export default AddCattleScreen;
