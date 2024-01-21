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
        "https://android-api-7sy3.onrender.com/api/v1/createCow/getCow",
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
    navigation.navigate("AddCattle");
  };

  const handleDeleteActivity = async (id) => {
    Alert.alert("Are your sure?", "Are you sure you want to delete Cow", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            const response = await axios.delete(
              `https://android-api-7sy3.onrender.com/api/v1/createCow/deleteCow/${id}`
            );
            console.log(response.data);
            fetchActivities();
          } catch (error) {
            console.error("Error deleting Cow:", error.message);
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
  const [earTag, setEarTag] = useState(selectedData?.earTag || "");
  const [categoryType, setCategoryType] = useState("");
  const [breedType, setBreedType] = useState("");
  const [status, setStatus] = useState("");
  const [calfNumber, setCalfNumber] = useState("");
  const [lactating, setLactating] = useState("");
  const [numberOfCalving, setNumberOfCalving] = useState("");
  const [litresOfMilkItProduces, setLitresOfMilkItProduces] = useState("");
  const [inseminationPeriod, setInseminationPeriod] = useState("");

  const [editData, setEditData] = useState({
    Date: "",
    earTag: "",
    categoryType: "",
    breedType: "",
    status: "",
    calfNumber: "",
    lactating: "",
    numberOfCalving: "",
    litresOfMilkItProduces: "",
    inseminationPeriod: "",
  });

  const handleEditActivity = async (id) => {
    try {
      const response = await axios.put(
        `https://android-api-7sy3.onrender.com/api/v1/createCow/updateCow/${earTag}`,
        {
          Date,
          earTag,
          categoryType,
          breedType,
          status,
          calfNumber,
          lactating,
          numberOfCalving,
          litresOfMilkItProduces,
          inseminationPeriod,
        }
      );
      console.log(response.data);
      setEditVisible(false);
      fetchActivities();
    } catch (error) {
      console.log(error.response.data);
      console.error("Error fetching Cow details:", error.message);
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
      <Text>List of all Cows</Text>
      <Button title="Add Cow" onPress={handleAddActivity} />
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
                <Text>{item.Date}</Text>
                <Text>{item.earTag}</Text>
                <Text>{item.categoryType}</Text>
                <Text>{item.breedType}</Text>
                <Text>{item.status}</Text>
                <Text>{item.calfNumber}</Text>
                <Text>{item.lactating}</Text>
                <Text>{item.numberOfCalving}</Text>
                <Text>{item.litresOfMilkItProduces}</Text>
                <Text>{item.inseminationPeriod}</Text>
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
        <Text>Edit One Cow </Text>

        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date || selectedData?.Date}
          onChangeText={(text) => setDate(text)}
          defaultValue={selectedData?.date}
        />
        <TextInput
          style={styles.input}
          placeholder="Ear Tag"
          value={earTag || selectedData?.earTag}
          onChangeText={(text) => setEarTag(text)}
          defaultValue={selectedData?.earTag}
        />
        <TextInput
          style={styles.input}
          placeholder="Category Type"
          value={categoryType || selectedData?.categoryType}
          onChangeText={(text) => setCategoryType(text)}
          defaultValue={selectedData?.categoryType}
        />
        <TextInput
          style={styles.input}
          placeholder="Breed Type"
          value={breedType || selectedData?.breedType}
          onChangeText={(text) => setBreedType(text)}
          defaultValue={selectedData?.breedType}
        />
        <TextInput
          style={styles.input}
          placeholder="Status"
          value={status || selectedData?.status}
          onChangeText={(text) => setStatus(text)}
          defaultValue={selectedData?.status}
        />
        <TextInput
          style={styles.input}
          placeholder="Calf Number"
          value={calfNumber || selectedData?.calfNumber}
          onChangeText={(text) => setCalfNumber(text)}
          defaultValue={selectedData?.calfNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Lactating"
          value={lactating || selectedData?.lactating}
          onChangeText={(text) => setLactating(text)}
          defaultValue={selectedData?.lactating}
        />
        <TextInput
          style={styles.input}
          placeholder="Number of Calving"
          value={numberOfCalving || selectedData?.numberOfCalving}
          onChangeText={(text) => setNumberOfCalving(text)}
          defaultValue={selectedData?.numberOfCalving}
        />
        <TextInput
          style={styles.input}
          placeholder="Litres of Milk It Produces"
          value={litresOfMilkItProduces || selectedData?.litresOfMilkItProduces}
          onChangeText={(text) => setLitresOfMilkItProduces(text)}
          defaultValue={selectedData?.litresOfMilkItProduces}
        />
        <TextInput
          style={styles.input}
          placeholder="Insemination Period"
          value={inseminationPeriod || selectedData?.inseminationPeriod}
          onChangeText={(text) => setInseminationPeriod(text)}
          defaultValue={selectedData?.inseminationPeriod}
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
        <Text>View one Cow </Text>
        <View
          style={{
            gap: 10,
            padding: 20,
          }}
        >
          <ItemCard name={"Ear Tag"} value={selectedData?.earTag} />
          <ItemCard name={"Date"} value={selectedData?.Date} />
          <ItemCard name={"Category Type"} value={selectedData?.categoryType} />
          <ItemCard name={"Breed Type"} value={selectedData?.breedType} />
          <ItemCard name={"Status"} value={selectedData?.status} />
          <ItemCard name={"Calf Number"} value={selectedData?.calfNumber} />
          <ItemCard name={"Lactating"} value={selectedData?.lactating} />
          <ItemCard
            name={"Number of Calving"}
            value={selectedData?.numberOfCalving}
          />
          <ItemCard
            name={"Litres of Milk It Produces"}
            value={selectedData?.litresOfMilkItProduces}
          />
          <ItemCard
            name={"Insemination Period"}
            value={selectedData?.inseminationPeriod}
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
export default ActivityScreen;
