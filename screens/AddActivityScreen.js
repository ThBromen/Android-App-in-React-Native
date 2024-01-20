import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddActivityScreen = ({ navigation }) => {
    const [date, setDate] = useState('');
    const [earTag, setEarTag] = useState('');
    const [activityType, setActivityType] = useState('');
    const [notes, setNotes] = useState('');
    const [howItWent, setHowItWent] = useState('');
    const [dosageInml, setDosageInml] = useState('');
    const [description, setDescription] = useState('');

    const handleAddActivity = async () => {
        try {
            const response = await axios.post('https://android-api-7sy3.onrender.com/api/v1/Activity/addActivity', {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date,
                    earTag,
                    activityType,
                    notes,
                    howItWent,
                    dosageInml,
                    description,
                }),
            });


            console.log('Activity added successfully');

            navigation.goBack();
        } catch (error) {
            console.error('Error adding activity:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Add your Activity here!</Text>
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
            <Button title="Add Activity" onPress={handleAddActivity} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
});

export default AddActivityScreen;
