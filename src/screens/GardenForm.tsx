import React, { FunctionComponent, useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

import { NavigationProps } from "../components/Router";
import { Page } from "../components/Page";
import Header from "../components/shared/Header";
import { createGarden } from "../api/Api";

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
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
          createGarden(name).then(result => {
            if (result.data) {
              afterCreate(result.data.id);
              navigation.goBack();
            } else {
              // TODO: Display some useful message to user
              console.log(result.error?.message);
            }
          });
        }}
      />
    </Page>
  );
};

export default GardenForm;
