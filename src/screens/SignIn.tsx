import React, { ReactElement } from "react";
import { View, Text, Button } from "react-native";
import { onSignIn } from "../auth";
import { NavigationStackProp } from "react-navigation-stack";

interface Props {
  navigation: NavigationStackProp;
}
const SignIn = (props: Props): ReactElement => {
  const { navigation } = props;
  return (
    <View>
      <Text>You are not logged in</Text>
      <Button
        title="Sign In"
        onPress={(): void => {
          onSignIn().then((): boolean => navigation.navigate("SignedIn"));
        }}
      />
    </View>
  );
};

export default SignIn;
