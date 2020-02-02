import React, { FunctionComponent, useState } from "react";
import { TextInput, StyleSheet, Button, Text, View } from "react-native";

import { Page } from "../components/Page";
import { onSignIn } from "../Session";
import Header from "../components/shared/Header";

import { Layout, Inputs, Spacing } from "../styles";
import { NavigationProps } from "src/components/Router";

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
  section: {
    marginVertical: Spacing.xlarge,
  },
});

const BadSignInMessage: FunctionComponent = () => {
  return (
    <Text style={styles.signInError}>
      Wrong combination of email and password
    </Text>
  );
};

const SignIn: FunctionComponent<NavigationProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [badSignIn, setBadSignIn] = useState(false);

  const resetBadSignIn = (): void => {
    if (badSignIn) {
      setBadSignIn(false);
    }
  };

  return (
    <Page>
      <Header title="Sign in to Plantiful" />
      <View style={styles.container}>
        {badSignIn ? <BadSignInMessage /> : <></>}
        <TextInput
          style={styles.inputField}
          placeholder={"Email"}
          value={email}
          onChangeText={(value: string): void => {
            resetBadSignIn();
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
            resetBadSignIn();
            setPassword(value);
          }}
          autoCapitalize="none"
          autoCompleteType="password"
          secureTextEntry={true}
        />
        <Button
          title="Sign In"
          onPress={(): void => {
            onSignIn(email, password).then((wasSignedIn: boolean) => {
              if (wasSignedIn) {
                navigation.navigate("SignedIn");
              } else {
                setBadSignIn(true);
              }
            });
          }}
        />
        <View style={styles.section}>
          <Text> Don&apos;t have an account yet? </Text>
          <Button
            title="Sign Up"
            onPress={(): void => {
              navigation.navigate("SignUp");
            }}
          />
        </View>
      </View>
    </Page>
  );
};

export default SignIn;
