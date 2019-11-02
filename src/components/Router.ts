import { Platform, StatusBar } from "react-native";
import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import PlantList from "../screens/PlantList";
import PlantForm from "../screens/PlantForm";
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
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      headerStyle,
    },
  },
});

const PlantsNavigationStack = createStackNavigator({
  PlantList: {
    screen: PlantList,
  },
  PlantForm: {
    screen: PlantForm,
  },
});

const SignedIn = createBottomTabNavigator({
  Home: {
    screen: PlantsNavigationStack,
    navigationOptions: {
      tabBarLabel: "My Gardens",
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
