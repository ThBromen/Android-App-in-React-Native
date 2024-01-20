import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from '../components/Themed';

export default function TabOneScreen() {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={require('../assets/images/cow.jpg')} // Replace with the actual path to your image
        style={styles.image}
      />

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <Icon.Button
          name="login"
          backgroundColor="#3b5998"
          onPress={navigateToLogin}
        >
          Login
        </Icon.Button>

        <Text>Or if you are new here</Text>

        <Icon.Button
          name="person-add"
          backgroundColor="#34A853"
          onPress={navigateToRegister}
        >
          Register
        </Icon.Button>


      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>@Bromen.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 20,
  },
});
