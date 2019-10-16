import { Platform, StatusBar } from "react-native";
import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import SignIn from "../screens/SignIn";
import PlantList from "../screens/PlantList";
import { NavigationNavigator } from "react-navigation";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
};

const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      headerStyle,
    },
  },
});

const SignedIn = createBottomTabNavigator({
  Home: {
    screen: PlantList,
    navigationOptions: {
      tabBarLabel: "Plant List",
    },
  },
});

const AppNavigator = (signedIn = false): NavigationNavigator<any, any> => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn,
      },
      SignedOut: {
        screen: SignedOut,
      },
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut",
    },
  );
};

export default AppNavigator;
