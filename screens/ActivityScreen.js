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

const ActivityScreen = ({ navigation }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await axios.get(
        "https://android-api-7sy3.onrender.com/api/v1/Activity/getAllActivity",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      //   console.log(response.data.data);
      setActivities(response.data.data);
    } catch (error) {
      setError(error.message);
      console.log(error.response.data);
      console.log("hjgjhghj");
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
    navigation.navigate("AddActivity");
  };

  const handleDeleteActivity = async (id) => {
    Alert.alert("Are your sure?", "Are you sure you want to delete activity", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            const response = await axios.delete(
              `https://android-api-7sy3.onrender.com/api/v1/Activity/deleteActivity/${id}`
            );
            console.log(response.data);
            fetchActivities();
          } catch (error) {
            console.error("Error deleting activity:", error.message);
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
  const [date, setDate] = useState(selectedData?.date || "");
  const [earTag, setEarTag] = useState(selectedData?.earTag || "");
  const [activityType, setActivityType] = useState("");
  const [notes, setNotes] = useState("");
  const [howItWent, setHowItWent] = useState("");
  const [dosageInml, setDosageInml] = useState("");
  const [description, setDescription] = useState("");

  const [editData, setEditData] = useState({
    date: "",
    earTag: "",
    activityType: "",
    notes: "",
    howItWent: "",
    dosageInml: "",
    description: "",
  });

  const handleEditActivity = async (id) => {
    console.log(id);
    console.log({
      date,
      earTag,
      activityType,
      notes,
      howItWent,
      dosageInml,
    });

    try {
      const response = await axios.put(
        `https://android-api-7sy3.onrender.com/api/v1/Activity/updateActivity/${id}`,
        {
          date,
          earTag,
          activityType,
          notes,
          howItWent,
          dosageInml,
        }
      );
      console.log(response.data);
      setEditVisible(false)
      fetchActivities()
    } catch (error) {
      console.log(error.response.data);
      console.error("Error fetching activity details:", error.message);
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
      <Text>List of all Activities</Text>
      <Button title="Add Activity" onPress={handleAddActivity} />
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
                <Text>{item.earTag}</Text>
                <Text>{item.dosageInml}</Text>
                <Text>{item.howItWent}</Text>
                <Text>{item.activityType}</Text>
                <Text>{item.notes}</Text>
                <Text>{item.description}</Text>
                <Text>{item.date}</Text>
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
        <Text>Edit One activity </Text>

        <TextInput
          style={styles.input}
          placeholder="Date"
          value={Date || selectedData?.Date}
          onChangeText={(text) => setDate(text)}
          defaultValue={
            selectedData?.Date
       }
        />
        <TextInput
          style={styles.input}
          placeholder="Ear Tag"
          value={earTag || selectedData?.earTag}
          onChangeText={(text) => setEarTag(text)}
          defaultValue={
            selectedData?.earTag
       }
        />
        <TextInput
          style={styles.input}
          placeholder="Activity Type"
          value={activityType || selectedData?.activityType}
          onChangeText={(text) => setActivityType(text)}
          defaultValue={
            selectedData?.notes
       }
        />
        <TextInput
          style={styles.input}
          value={notes || selectedData?.notes}
          placeholder="Notes"
          onChangeText={(text) => setNotes(text)}
          defaultValue={
            selectedData?.notes
       }
        />
        <TextInput
          style={styles.input}
          placeholder="How It Went"
          value={howItWent || selectedData?.howItWent}
          onChangeText={(text) => setHowItWent(text)}
          defaultValue={
            selectedData?.howItWent
       }

        />
        <TextInput
          style={styles.input}
          placeholder="Dosage (in ml)"
          value={dosageInml || selectedData?.dosageInml}
          onChangeText={(text) => setDosageInml(text)}
          defaultValue={
            selectedData?.dosageInml
       }
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description || selectedData?.description}
          onChangeText={(text) => setDescription(text)}
          defaultValue={
               selectedData?.description
          }
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
        <Text>View one activity </Text>
        <View
          style={{
            gap: 10,
            padding: 20,
          }}
        >
          <ItemCard name={"Ear tag"} value={selectedData?.earTag} />
          <ItemCard name={"Date"} value={selectedData?.Date} />
          <ItemCard name={"description"} value={selectedData?.description} />
          <ItemCard name={"notes"} value={selectedData?.notes} />
          <ItemCard name={"How it went"} value={selectedData?.howItWent} />
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
export default ActivityScreen;
