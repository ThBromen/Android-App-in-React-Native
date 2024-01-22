import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: "home",
          Login: "login",
          Register: "register",
          Dashboard: {
            screens: {
              Authenticated: "authenticated",
              Unauthenticated: "unauthenticated",
            },
          },
          NotFound: "*",
        },
      },
    },
  },
};
