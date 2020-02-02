import React, { FunctionComponent, useState } from "react";
import { StyleSheet, Button, TextInput, View } from "react-native";
import Toast from "react-native-simple-toast";

import { Page } from "../components/Page";
import { onSignUp } from "../Session";

import { Layout, Inputs, Spacing } from "../styles";
import Header from "../components/shared/Header";
import { NavigationProps } from "../components/Router";

const styles = StyleSheet.create({
  container: {
    ...Layout.centeredContent,
  },
  inputField: {
    ...Inputs.singleLine,
  },
  signInError: {
    color: "red",
    marginBottom: Spacing.base,
  },
});

const SignUp: FunctionComponent<NavigationProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [badSignUp, setBadSignUp] = useState(false);

  const resetBadSignUp = (): void => {
    if (badSignUp) {
      setBadSignUp(false);
    }
  };

  return (
    <Page>
      <Header navigation={navigation} title="Sign Up" />
      <View style={styles.container}>
        <TextInput
          style={styles.inputField}
          placeholder={"First Name"}
          value={firstName}
          onChangeText={(value: string): void => {
            resetBadSignUp();
            setFirstName(value);
          }}
          autoCapitalize="none"
          autoCompleteType="name"
        />
        <TextInput
          style={styles.inputField}
          placeholder={"Last Name"}
          value={lastName}
          onChangeText={(value: string): void => {
            resetBadSignUp();
            setLastName(value);
          }}
          autoCapitalize="none"
          autoCompleteType="name"
        />
        <TextInput
          style={styles.inputField}
          placeholder={"Email"}
          value={email}
          onChangeText={(value: string): void => {
            resetBadSignUp();
            setEmail(value);
          }}
          autoCapitalize="none"
          autoCompleteType="email"
        />
        <TextInput
          style={styles.inputField}
          placeholder={"Password"}
          value={password}
          onChangeText={(value: string): void => {
            resetBadSignUp();
            setPassword(value);
          }}
          autoCapitalize="none"
          autoCompleteType="password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.inputField}
          placeholder={"Confirm Password"}
          value={passwordConfirmation}
          onChangeText={(value: string): void => {
            resetBadSignUp();
            setPasswordConfirmation(value);
          }}
          autoCapitalize="none"
          autoCompleteType="password"
          secureTextEntry={true}
        />
        <Button
          title="Sign Up"
          onPress={(): void => {
            onSignUp(firstName, lastName, email, password).then(
              (successfulSignUp: boolean) => {
                if (successfulSignUp) {
                  Toast.show("Welcome to Plantiful");
                  navigation.navigate("SignedIn");
                } else {
                  setBadSignUp(true);
                }
              },
            );
          }}
        />
      </View>
    </Page>
  );
};

export default SignUp;
