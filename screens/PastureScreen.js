// PastureScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PastureScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Pasture Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PastureScreen;
