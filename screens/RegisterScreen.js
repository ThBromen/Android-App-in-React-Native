import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('https://android-api-7sy3.onrender.com/api/v1/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    fullNames: fullName,
                    password,
                    phoneNumber,
                    location,
                }),
            });

            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error('Email address is already in use. Please choose another one.');
                } else {
                    throw new Error(`Registration failed with status ${response.status}`);
                }
            }

            const result = await response.json();
            console.log('Registration successful:', result);

            // Navigate to the login screen after successful registration
            navigation.navigate('Login');

        } catch (error) {
            console.error('Error during registration:', error.message);
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={(text) => setFullName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={(text) => setLocation(text)}
            />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
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

export default RegisterScreen;
