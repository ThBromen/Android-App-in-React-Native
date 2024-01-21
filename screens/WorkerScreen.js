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

const WorkerScreen = ({ navigation }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await axios.get(
        "https://android-api-7sy3.onrender.com/api/v1/Worker/getWorker",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data.data);
      setActivities(response.data.data);
    } catch (error) {
      setError(error.message);
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
    navigation.navigate("AddWorker");
  };

  const handleDeleteActivity = async (id) => {
    Alert.alert("Are your sure?", "Are you sure you want to delete worker", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            const response = await axios.delete(
              `https://android-api-7sy3.onrender.com/api/v1/Worker/deleteWorker/${id}`
            );
            console.log(response.data);
            fetchActivities();
          } catch (error) {
            console.error("Error deleting Worker:", error.message);
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
  const [date, setDate] = useState(selectedData?.Date || "");
  const [email, setEmail] = useState(selectedData?.email || "");
  const [fullNames, setFullNames] = useState(selectedData?.fullNames || "");
  const [phoneNumber, setPhoneNumber] = useState(
    selectedData?.phoneNumber || ""
  );
  const [location, setLocation] = useState(selectedData?.location || "");

  const [editData, setEditData] = useState({
    date: "",
    email: "",
    fullNames: "",
    phoneNumber: "",
    location: "",
  });

  const handleEditActivity = async (id) => {
    try {
      const response = await axios.put(
        `https://android-api-7sy3.onrender.com/api/v1/Worker/updateWorker/${id}`,
        {
          date,
          email,
          fullNames,
          phoneNumber,
          location,
        }
      );
      console.log(response.data);
      setEditVisible(false);
      fetchActivities();
    } catch (error) {
      console.log(error.response.data);
      console.error("Error fetching Worker details:", error.message);
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
      <Text>List of all Worker</Text>
      <Button title="Add Worker" onPress={handleAddActivity} />
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
                <Text>{item.date}</Text>
                <Text>{item.email}</Text>
                <Text>{item.fullNames}</Text>
                <Text>{item.phoneNumber}</Text>
                <Text>{item.location}</Text>
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
        <Text>Edit One Worker </Text>

        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date || selectedData?.Date}
          onChangeText={(text) => setDate(text)}
          defaultValue={selectedData?.Date}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email || selectedData?.email}
          onChangeText={(text) => setEmail(text)}
          defaultValue={selectedData?.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Names"
          value={fullNames || selectedData?.fullNames}
          onChangeText={(text) => setFullNames(text)}
          defaultValue={selectedData?.fullNames}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber || selectedData?.phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          defaultValue={selectedData?.phoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location || selectedData?.location}
          onChangeText={(text) => setLocation(text)}
          defaultValue={selectedData?.location}
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
        <Text>View one Worker </Text>
        <View
          style={{
            gap: 10,
            padding: 20,
          }}
        >
          <ItemCard name={"Date"} value={selectedData?.Date} />
          <ItemCard name={"Email"} value={selectedData?.email} />
          <ItemCard name={"Full Names"} value={selectedData?.fullNames} />
          <ItemCard name={"Phone Number"} value={selectedData?.phoneNumber} />
          <ItemCard name={"Location"} value={selectedData?.location} />
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

export default WorkerScreen;
