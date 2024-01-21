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

const PastureScreen = ({ navigation }) => {
  const [pastures, setPastures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPastures = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await axios.get(
        "https://android-api-7sy3.onrender.com/api/v1/pasture/getPasture",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setPastures(response.data.data);
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
        fetchPastures();
      },
      [navigation]
    );

    return unsubscribe;
  }, [navigation]);

  const handleAddPasture = () => {
    navigation.navigate("AddPasture");
  };

  const handleDeletePasture = async (id) => {
    Alert.alert("Are your sure?", "Are you sure you want to delete pasture", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            const response = await axios.delete(
              `https://android-api-7sy3.onrender.com/api/v1/pasture/deletePasture/${id}`
            );
            console.log(response.data);
            fetchPastures();
          } catch (error) {
            console.error("Error deleting pasture:", error.message);
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
  const [selectedPasture, setSelectedPasture] = useState(null);
  const [pastureName, setPastureName] = useState("");
  const [Owner, setOwner] = useState("");
  const [area, setArea] = useState("");
  const [numberOfCattles, setNumberOfCattles] = useState("");

  const [editData, setEditData] = useState({
    pastureName: "",
    Owner: "",
    area: "",
    numberOfCattles: "",
  });

  const handleEditPasture = async (id) => {
    try {
      const response = await axios.put(
        `https://android-api-7sy3.onrender.com/api/v1/pasture/updatepasture/${id}`,
        {
          pastureName,
          Owner,
          area,
          numberOfCattles,
        }
      );
      console.log(response.data);
      setEditVisible(false);
      fetchPastures();
    } catch (error) {
      console.log(error.response.data);
      console.error(
        "Error updating pasture details:Error fetching pasture details:",
        error.message
      );
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
      <Text>List of all Pastures</Text>
      <Button title="Add Pasture" onPress={handleAddPasture} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <FlatList
          data={pastures}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.activityContainer}>
              <View style={styles.columnContainer}>
                <Text>{item.pastureName}</Text>
                <Text>{item.Owner}</Text>
                <Text>{item.area}</Text>
                <Text>{item.numberOfCattles}</Text>
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
                    setSelectedPasture(item);
                  }}
                />
                <Button
                  title="Edit"
                  onPress={() => {
                    setSelectedPasture(item);
                    console.log(item);
                    setEditVisible(true);
                  }}
                />
                <Button
                  title="Delete"
                  onPress={() => handleDeletePasture(item._id)}
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
        <Text>Edit One Pasture </Text>

        <TextInput
          style={styles.input}
          placeholder="Pasture Name"
          value={pastureName || selectedPasture?.pastureName}
          onChangeText={(text) => setPastureName(text)}
          defaultValue={selectedPasture?.pastureName}
        />
        <TextInput
          style={styles.input}
          placeholder="Owner"
          value={Owner || selectedPasture?.Owner}
          onChangeText={(text) => setOwner(text)}
          defaultValue={selectedPasture?.Owner}
        />
        <TextInput
          style={styles.input}
          placeholder="Area"
          value={area || selectedPasture?.area}
          onChangeText={(text) => setArea(text)}
          defaultValue={selectedPasture?.area}
        />
        <TextInput
          style={styles.input}
          placeholder="Number of Cattles"
          value={numberOfCattles || selectedPasture?.numberOfCattles}
          onChangeText={(text) => setNumberOfCattles(text)}
          defaultValue={selectedPasture?.numberOfCattles}
        />
        <Button
          title="update"
          onPress={() => handleEditPasture(selectedPasture._id)}
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
        <Text>View one Pasture </Text>
        <View
          style={{
            gap: 10,
            padding: 20,
          }}
        >
          <ItemCard
            name={"pasture Name "}
            value={selectedPasture?.pastureName}
          />
          <ItemCard name={"Pasture ouner"} value={selectedPasture?.Owner} />
          <ItemCard name={"Pasture Area"} value={selectedPasture?.area} />

          <ItemCard
            name={"number Of Cattles"}
            value={selectedPasture?.numberOfCattles}
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

export default PastureScreen;
