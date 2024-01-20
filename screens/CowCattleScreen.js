// CattleScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CattleScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Cattle Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CattleScreen;
