import React, { FunctionComponent, useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

import { NavigationProps } from "../components/Router";
import { Page } from "../components/Page";
import Header from "../components/shared/Header";
import { createGarden, handleError } from "../api/Api";

import { Inputs, Layout } from "../styles";

const styles = StyleSheet.create({
  container: {
    ...Layout.paddingHorizontal,
    justifyContent: "space-between",
  },
  inputField: {
    ...Inputs.singleLine,
  },
});

const GardenForm: FunctionComponent<NavigationProps> = ({ navigation }) => {
  const afterCreate: (newGardenId: number) => void = navigation.getParam(
    "afterCreate",
    () => {
      console.error("Must pass an afterCreate function");
    },
  );
  const [name, setName] = useState("");
  return (
    <Page style={styles.container}>
      <Header title="Create a garden" navigation={navigation} />
      <View>
        <TextInput
          style={styles.inputField}
          placeholder={"Name"}
          value={name}
          onChangeText={(value: string): void => {
            setName(value);
          }}
        />
      </View>
      <Button
        title="Submit"
        onPress={(): void => {
          createGarden(name).then(response => {
            if (response.data) {
              afterCreate(response.data.id);
              navigation.goBack();
            } else {
              handleError(response);
            }
          });
        }}
      />
    </Page>
  );
};

export default GardenForm;
