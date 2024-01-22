import React from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text } from "../components/Themed";

export default function TabOneScreen() {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      {/* Image */}
      <Text style={styles.title}>Smart Farming!!</Text>
      <Text style={styles.subtitle}>The Pure Nature Experience!!</Text>

      <Image
        source={require("../assets/images/cow.jpg")} // Replace with the actual path to your image
        style={styles.image}
      />

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <Icon name="login" size={20} color="#fff" />
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or if you are new here</Text>

        <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
          <Icon name="person-add" size={20} color="#fff" />
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.linkedin.com/in/hashimwimana-theogene")
          }
        >
          <Text>@Bromen.com</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  subtitle: {
    fontSize: 18,
    fontStyle: "italic",
    color: "blue",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3b5998",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "60%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 10,
  },
  orText: {
    marginBottom: 10,
    alignSelf: "center",
  },
  footer: {
    marginTop: 20,
  },
});
