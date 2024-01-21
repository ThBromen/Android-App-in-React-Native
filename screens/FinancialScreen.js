import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const FinancialScreen = ({ navigation }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await axios.get(
        "https://android-api-7sy3.onrender.com/api/v1/financial/getFinancial",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setActivities(response.data.data);
    } catch (error) {
      setError(error.message);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        setLoading(true);
        setError(null);
        fetchActivities();
      },
      [navigation]
    );

    return unsubscribe;
  }, [navigation]);

  const handleAddActivity = () => {
    navigation.navigate("AddFinancial");
  };

  const handleDeleteActivity = async (id) => {
    Alert.alert("Are your sure?", "Are you sure you want to delete activity", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            const response = await axios.delete(
              `https://android-api-7sy3.onrender.com/api/v1/financial/deleteFinancial/${id}`
            );
            console.log(response.data);
            fetchActivities();
          } catch (error) {
            console.error("Error deleting Financial:", error.message);
          }
        },
      },
      {
        text: "No",
      },
    ]);
  };

  const [editVisible, setEditVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [date, setDate] = useState(selectedData?.dateOfRecord || "");
  const [animalEarTag, setAnimalEarTag] = useState(
    selectedData?.animalEarTag || ""
  );
  const [sales, setSales] = useState("");
  const [litresSold, setLitresSold] = useState("");
  const [financeType, setFinanceType] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [amount, setAmount] = useState("");
  const [administrator, setAdministrator] = useState("");

  const [editData, setEditData] = useState({
    animalEarTag: "",
    sales: "",
    litresSold: "",
    notes: "",
    financeType: "",
    dateOfRecord: "",
    paymentDate: "",
    amount: "",
    administrator: "",
  });

  const handleEditActivity = async (id) => {
    try {
      const response = await axios.put(
        `https://android-api-7sy3.onrender.com/api/v1/financial/updateFinancial/${id}`,
        {
          animalEarTag,
          sales,
          litresSold,
          financeType,
          notes,
          dateOfRecord,
          paymentDate,
          amount,
          administrator,
        }
      );
      setEditVisible(false);
      fetchActivities();
    } catch (error) {
      console.log(error.response.data);
      console.error("Error fetching Financial details:", error.message);
    }
  };

  const ItemCard = ({ name, value }) => {
    return (
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text>{name}</Text>

        <Text>{value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>List of all Financial</Text>
      <Button title="Add Financial" onPress={handleAddActivity} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <FlatList
          data={activities}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.activityContainer}>
              <View style={styles.columnContainer}>
                <Text>{item.animalEarTag}</Text>
                <Text>{item.sales}</Text>
                <Text>{item.litresSold}</Text>
                <Text>{item.financeType}</Text>
                <Text>{item.notes}</Text>
                <Text>{item.dateOfRecord}</Text>
                <Text>{item.paymentDate}</Text>
                <Text>{item.amount}</Text>
                <Text>{item.administrator}</Text>
              </View>
              <View
                style={{
                  gap: 10,
                }}
              >
                <Button
                  title="View Details"
                  onPress={() => {
                    setViewVisible(true);
                    setSelectedData(item);
                  }}
                />
                <Button
                  title="Edit"
                  onPress={() => {
                    setSelectedData(item);
                    console.log(item);
                    setEditVisible(true);
                  }}
                />
                <Button
                  title="Delete"
                  onPress={() => handleDeleteActivity(item._id)}
                />
              </View>
            </View>
          )}
        />
      )}

      <Modal
        animationType="slide"
        visible={editVisible}
        style={{
          height: "80%",
          width: "80%",
          marginLeft: "20",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setEditVisible(false);
          }}
        >
          <Text>Close</Text>
        </TouchableOpacity>
        <Text>Edit One Financial </Text>

        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date || selectedData?.dateOfRecord}
          onChangeText={(text) => setDate(text)}
          defaultValue={selectedData?.dateOfRecord}
        />
        <TextInput
          style={styles.input}
          placeholder="Animal Ear Tag"
          value={animalEarTag || selectedData?.animalEarTag}
          onChangeText={(text) => setAnimalEarTag(text)}
          defaultValue={selectedData?.animalEarTag}
        />
        <TextInput
          style={styles.input}
          placeholder="Sales"
          value={sales || selectedData?.sales}
          onChangeText={(text) => setSales(text)}
          defaultValue={selectedData?.sales}
        />
        <TextInput
          style={styles.input}
          placeholder="Litres Sold"
          value={litresSold || selectedData?.litresSold}
          onChangeText={(text) => setLitresSold(text)}
          defaultValue={selectedData?.litresSold}
        />
        <TextInput
          style={styles.input}
          placeholder="Finance Type"
          value={financeType || selectedData?.financeType}
          onChangeText={(text) => setFinanceType(text)}
          defaultValue={selectedData?.financeType}
        />
        <TextInput
          style={styles.input}
          placeholder="Notes"
          value={notes || selectedData?.notes}
          onChangeText={(text) => setNotes(text)}
          defaultValue={selectedData?.notes}
        />
        <Button
          title="update"
          onPress={() => handleEditActivity(selectedData._id)}
        />
      </Modal>
      <Modal
        animationType="slide"
        visible={viewVisible}
        style={{
          height: "80%",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setViewVisible(false);
          }}
        >
          <Text>Close</Text>
        </TouchableOpacity>
        <Text>View one Financial </Text>
        <View
          style={{
            gap: 10,
            padding: 20,
          }}
        >
          <ItemCard
            name={"Animal Ear Tag"}
            value={selectedData?.animalEarTag}
          />
          <ItemCard name={"Sales"} value={selectedData?.sales} />
          <ItemCard name={"Litres Sold"} value={selectedData?.litresSold} />
          <ItemCard name={"Finance Type"} value={selectedData?.financeType} />
          <ItemCard name={"Notes"} value={selectedData?.notes} />
          <ItemCard
            name={"Date of Record"}
            value={selectedData?.dateOfRecord}
          />
          <ItemCard name={"Payment Date"} value={selectedData?.paymentDate} />
          <ItemCard name={"Amount"} value={selectedData?.amount} />
          <ItemCard
            name={"Administrator"}
            value={selectedData?.administrator}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityContainer: {
    margin: 20,
    width: "90 %",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    borderColor: "gray",
  },
  input: {
    height: 40,
    width: "60%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default FinancialScreen;
