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

const CattleScreen = ({ navigation }) => {
  const [cows, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCow = async () => {
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
        fetchCow();
      },
      [navigation]
    );

    return unsubscribe;
  }, [navigation]);

  const handleAddCow = () => {
    navigation.navigate("AddActivity");
  };
  const handleDeleteCow = async (id) => {
    Alert.alert("Are your sure?", "Are you sure you want to delete activity", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            const response = await axios.delete(
              `https://android-api-7sy3.onrender.com/api/v1/createCow/deleteCow/${id}`
            );
            console.log(response.data);
            fetchCow();
          } catch (error) {
            console.error("Error deleting activity:", error.message);
          }
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]);
  };

  const [editVisible, setEditVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [earTag, setEarTag] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [breedType, setBreedType] = useState("");
  const [status, setStatus] = useState("");
  const [calfNumber, setCalfNumber] = useState("");
  const [lactating, setLactating] = useState("");
  const [numberOfCalving, setNumberOfCalving] = useState("");
  const [litresOfMilkItProduces, setLitresOfMilkItProduces] = useState("");
  const [inseminationPeriod, setInseminationPeriod] = useState("");

  const handleEditCow = async () => {
    try {
      const response = await axios.put(
        `https://android-api-7sy3.onrender.com/api/v1/createCow/updateCow/${selectedData.earTag}`,
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
        }
      );
      console.log(response.data);
      fetchCow();
      setEditVisible(false);
    } catch (error) {
      console.log(error.response.data);
      console.error("Error updating Cow:", error.message);
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
      <Button title="Add Cow" onPress={handleAddCow} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <FlatList
          data={cows}
          keyExtractor={(item) => item.earTag}
          renderItem={({ item }) => (
            <View style={styles.activityContainer}>
              <View>
                <ItemCard name="Ear Tag" value={item.earTag} />
                <ItemCard name="Category Type" value={item.categoryType} />
                <ItemCard name="Breed Type" value={item.breedType} />
                <ItemCard name="Status" value={item.status} />
                <ItemCard name="Calf Number" value={item.calfNumber} />
                <ItemCard name="Lactating" value={item.lactating} />
                <ItemCard
                  name="Number of Calving"
                  value={item.numberOfCalving}
                />
                <ItemCard
                  name="Litres of Milk"
                  value={item.litresOfMilkItProduces}
                />
                <ItemCard
                  name="Insemination Period"
                  value={item.inseminationPeriod}
                />
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
                      setViewVisible(true);
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
                    <ItemCard name={"Ear tag"} value={selectedData?.earTag} />
                    <ItemCard name={"Date"} value={selectedData?.Date} />
                    <ItemCard
                      name={"categoryType"}
                      value={selectedData?.categoryType}
                    />
                    <ItemCard
                      name={"breedType"}
                      value={selectedData?.breedType}
                    />
                    <ItemCard name={"status"} value={selectedData?.status} />
                    <ItemCard
                      name={"calfNumber"}
                      value={selectedData?.calfNumber}
                    />
                    <ItemCard
                      name={"lactating"}
                      value={selectedData?.lactating}
                    />
                    <ItemCard
                      name={"numberOfCalving"}
                      value={selectedData?.numberOfCalving}
                    />
                    <ItemCard
                      name={"litresOfMilkItProduces"}
                      value={selectedData?.litresOfMilkItProduces}
                    />
                    <ItemCard
                      name={"inseminationPeriod"}
                      value={selectedData?.inseminationPeriod}
                    />
                  </View>
                </Modal>

                <Button
                  title="Edit"
                  onPress={() => {
                    setEditVisible(true);
                    setSelectedData(item);
                    setEarTag(item.Date);
                    setEarTag(item.earTag);
                    setCategoryType(item.categoryType);
                    setBreedType(item.breedType);
                    setStatus(item.status);
                    setCalfNumber(item.calfNumber);
                    setLactating(item.lactating);
                    setNumberOfCalving(item.numberOfCalving);
                    setLitresOfMilkItProduces(item.litresOfMilkItProduces);
                    setInseminationPeriod(item.inseminationPeriod);
                  }}
                />
                <Button
                  title="Delete"
                  onPress={() => handleDeleteCow(item._id)}
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
            setEditVisible(true);
          }}
        >
          n<Text>Close</Text>
        </TouchableOpacity>
        <Text>Edit One Cow </Text>

        <TextInput
          style={styles.input}
          placeholder="Date"
          value={selectedData?.Date}
          onChangeText={(text) => setDate(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ear Tag"
          value={selectedData?.earTag}
          onChangeText={(text) => setEarTag(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Activity Type"
          value={selectedData?.activityType}
          onChangeText={(text) => setActivityType(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Notes"
          value={selectedData?.notes}
          onChangeText={(text) => setNotes(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="How It Went"
          value={selectedData?.howItWent}
          onChangeText={(text) => setHowItWent(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Dosage (in ml)"
          value={selectedData?.dosageInml}
          onChangeText={(text) => setDosageInml(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={selectedData?.description}
          onChangeText={(text) => setDescription(text)}
        />
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
    width: "80 %",
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

export default CattleScreen;
