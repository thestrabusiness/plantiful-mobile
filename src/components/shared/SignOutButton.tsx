import React, { FunctionComponent } from "react";
import { Button } from "react-native";

import { NavigationProps } from "../Router";
import { onSignOut } from "../../Session";

const SignOutButton: FunctionComponent<NavigationProps> = ({ navigation }) => {
  return (
    <Button
      title="Sign Out"
      onPress={(): void => {
        onSignOut().then((): boolean => navigation.navigate("SignedOut"));
      }}
    />
  );
};

export default SignOutButton;
