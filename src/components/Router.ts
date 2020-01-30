import { Platform, StatusBar } from "react-native";
import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationNavigator,
} from "react-navigation";

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import PlantList from "../screens/PlantList";
import PlantForm from "../screens/PlantForm";
import PlantDetails from "../screens/PlantDetails";
import PlantCheckIn from "../screens/PlantCheckIn";
import Camera from "../screens/Camera";
import GardenForm from "../screens/GardenForm";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
};

interface NavigationProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface OptionalNavigation {
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SignedOut = createStackNavigator(
  {
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
  },
  { headerMode: "none" },
);

const PlantsNavigationStack = createStackNavigator(
  {
    PlantList,
    PlantForm,
    PlantDetails,
    PlantCheckIn,
    Camera,
    GardenForm,
  },
  { defaultNavigationOptions: { header: null } },
);

const SignedIn = createBottomTabNavigator({
  Home: {
    screen: PlantsNavigationStack,
    navigationOptions: {
      tabBarLabel: "My Plants",
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

export { NavigationProps, OptionalNavigation };
export default AppNavigator;
