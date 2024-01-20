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
        const unsubscribe = navigation.addListener("focus", () => {
            setLoading(true);
            setError(null);
            fetchActivities();
        }, [navigation]);

        return unsubscribe;
    }, [navigation]);

    const handleAddActivity = () => {
        navigation.navigate("AddActivity");
    };

    const handleViewDetails = (id) => {
        console.log(`View details for activity with id ${id}`);
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
    const [date, setDate] = useState(selectedData?.date || "");
    const [earTag, setEarTag] = useState("");
    const [activityType, setActivityType] = useState("");
    const [notes, setNotes] = useState("");
    const [howItWent, setHowItWent] = useState("");
    const [dosageInml, setDosageInml] = useState("");
    const [description, setDescription] = useState("");

    const handleEditActivity = async (id) => {
        try {
            const response = await axios.put(
                `https://android-api-7sy3.onrender.com/api/v1/Activity/updateActivity/${selectedData._id}`,
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
            navigation.navigate("EditActivity", { activityDetails });
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
                            {/* Display activity details */}
                            {/* ... (other fields) */}
                            <Text>{item.earTag}</Text>
                            <Text>{item.dosageInml}</Text>
                            <Text>{item.howItWent}</Text>
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
                                    onRequestClose={setEditVisible(false)}
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
                                        <ItemCard
                                            name={"description"}
                                            value={selectedData?.description}
                                        />
                                        <ItemCard name={"notes"} value={selectedData?.notes} />
                                        <ItemCard name={"How it went"} value={selectedData?.howItWent} />
                                    </View>
                                </Modal>

                                <Button
                                    title="Edit"
                                    onPress={() => {
                                        setEditVisible(true);
                                        setSelectedData(item);
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
                }}
            // onRequestClose={setEditVisible(false)}
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
                <Text>Edit activity model</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Date"
                    value={date}
                    onChangeText={(text) => setDate(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ear Tag"
                    value={earTag}
                    onChangeText={(text) => setEarTag(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Activity Type"
                    value={activityType}
                    onChangeText={(text) => setActivityType(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Notes"
                    value={notes}
                    onChangeText={(text) => setNotes(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="How It Went"
                    value={howItWent}
                    onChangeText={(text) => setHowItWent(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Dosage (in ml)"
                    value={dosageInml}
                    onChangeText={(text) => setDosageInml(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
                <Button title="Add Activity" onPress={handleEditActivity} />
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
        width: "80%",
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
});

export default ActivityScreen;
