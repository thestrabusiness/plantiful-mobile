import React, { useState } from "react";
import { ReactElement } from "react";
import { TextInput, StyleSheet, Button, Text, View } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

import { Page } from "../components/Page";
import { onSignIn } from "../Session";

import { Layout, Inputs, Spacing } from "../styles";

interface Props {
  navigation: NavigationStackProp;
}

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

const BadSignInMessage = (): ReactElement => {
  return (
    <Text style={styles.signInError}>
      Wrong combination of email and password
    </Text>
  );
};

const SignIn = (props: Props): ReactElement => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [badSignIn, setBadSignIn] = useState(false);
  const { navigation } = props;

  const resetBadSignIn = (): void => {
    if (badSignIn) {
      setBadSignIn(false);
    }
  };

  return (
    <Page style={styles.container}>
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
    </Page>
  );
};

export default SignIn;
