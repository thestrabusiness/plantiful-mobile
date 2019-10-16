import React, { useState } from "react";
import { ReactElement } from "react";
import { StyleSheet, Button, Dimensions, Text } from "react-native";
import { Page } from "../components/Page";
import { onSignIn } from "../Session";
import { NavigationStackProp } from "react-navigation-stack";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  navigation: NavigationStackProp;
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  inputField: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
  signInError: {
    color: "red",
    marginBottom: 10,
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
    </Page>
  );
};

export default SignIn;
