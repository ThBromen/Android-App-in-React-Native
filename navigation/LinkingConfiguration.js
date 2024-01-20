/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: "Home",
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: "Setting",
            },
          },
          TabOne: {
            screens: {
              TabOneScreen: "Home",
            },
          },
          Login: {
            screens: {
              LoginScreen: "Login"
            },

          },
          NotFound: "*",
        },
      },
    },
  },
};
