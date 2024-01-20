import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ActivityScreen from './ActivityScreen';
import WorkerScreen from './WorkerScreen';
import FinancialScreen from './FinancialScreen';
import PastureScreen from './PastureScreen';
import LogoutScreen from './LogoutScreen';
import CattleScreen from './CowCattleScreen';

const Tab = createBottomTabNavigator();

const DashboardScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        switch (route.name) {
                            case 'Activity':
                                iconName = focused ? 'ios-play-circle' : 'ios-play-circle-outline';
                                break;
                            case 'Cattle':
                                iconName = focused ? 'ios-paw' : 'ios-paw-outline';
                                break;
                            case 'Financial':
                                iconName = focused ? 'ios-cash' : 'ios-cash-outline';
                                break;
                            case 'Pasture':
                                iconName = focused ? 'ios-leaf' : 'ios-leaf-outline';
                                break;
                            case 'Logout':
                                iconName = focused ? 'ios-exit' : 'ios-exit-outline';
                                break;
                            case 'Worker':
                                iconName = focused ? 'ios-people' : 'ios-people-outline';
                                break;
                            default:
                                iconName = 'ios-information-circle';
                        }

                        return (
                            <TouchableOpacity
                                style={styles.tabButton}
                                onPress={() => {
                                    if (route.name === 'Activity') {
                                        navigation.navigate('ActivityScreen');
                                    } else if (route.name === 'Logout') {
                                        navigation.navigate('LogoutScreen');
                                    } else if (route.name === 'Cattle') {
                                        navigation.navigate('CattleScreen');
                                    } else if (route.name === 'Financial') {
                                        navigation.navigate('FinancialScreen');
                                    } else if (route.name === 'Pasture') {
                                        navigation.navigate('PastureScreen');
                                    } else if (route.name === 'Worker') {
                                        navigation.navigate('WorkerScreen');
                                    }
                                }}
                            >
                                <Ionicons name={iconName} size={size} color={color} />
                            </TouchableOpacity>
                        );
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                    style: [{
                        display: 'flex',
                    },
                        null]
                }}
            >
                {/* Define your Tab screens here */}

                <Tab.Screen name="Activity" component={ActivityScreen} />
                <Tab.Screen name="Cattle" component={CattleScreen} />
                <Tab.Screen name="Financial" component={FinancialScreen} />
                <Tab.Screen name="Pasture" component={PastureScreen} />
                <Tab.Screen name="Worker" component={WorkerScreen} />
                <Tab.Screen name="Logout" component={LogoutScreen} />
            </Tab.Navigator>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DashboardScreen;
