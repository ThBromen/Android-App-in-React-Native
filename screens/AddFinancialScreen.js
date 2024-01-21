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

const AddFinancialScreen = ({ navigation }) => {
  const [animalEarTag, setAnimalEarTag] = useState("");
  const [sales, setSales] = useState("");
  const [litresSold, setLitresSold] = useState("");
  const [notes, setNotes] = useState("");
  const [financeType, setFinanceType] = useState("");
  const [dateOfRecord, setDateOfRecord] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [amount, setAmount] = useState("");
  const [administrator, setAdministrator] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddActivity = async () => {
    try {
      // Set loading to true to show the indicator
      setLoading(true);

      const response = await axios.post(
        "https://android-api-7sy3.onrender.com/api/v1/financial/addFinancial",
        {
          animalEarTag,
          sales,
          litresSold,
          notes,
          financeType,
          dateOfRecord,
          paymentDate,
          amount,
          administrator,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Financial added successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding Financial:", error.message);
    } finally {
      // Set loading to false to hide the indicator
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add your Financial here!</Text>
      <TextInput
        style={styles.input}
        placeholder="Animal Ear Tag"
        value={animalEarTag}
        onChangeText={(text) => setAnimalEarTag(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sales"
        value={sales}
        onChangeText={(text) => setSales(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Litres Sold"
        value={litresSold}
        onChangeText={(text) => setLitresSold(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={(text) => setNotes(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Finance Type"
        value={financeType}
        onChangeText={(text) => setFinanceType(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Record"
        value={dateOfRecord}
        onChangeText={(text) => setDateOfRecord(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Payment Date"
        value={paymentDate}
        onChangeText={(text) => setPaymentDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Administrator"
        value={administrator}
        onChangeText={(text) => setAdministrator(text)}
      />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <Button title="Add Financial" onPress={handleAddActivity} />
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

export default AddFinancialScreen;
