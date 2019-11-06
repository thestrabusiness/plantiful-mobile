import React, { ReactElement, useState, FunctionComponent } from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  StyleSheet,
  Button,
} from "react-native";
import NumericInput from "react-native-numeric-input";
import { NavigationStackProp } from "react-navigation-stack";

import { Page } from "../components/Page";
import { createPlant } from "../api/Api";

const styles = StyleSheet.create({
  inputField: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
  checkFrequencyRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkFrequencyUnit: {
    flex: 2,
  },
  formSpacing: {
    marginTop: 30,
  },
});

const pluralize = (string: string, count: number): string => {
  if (count > 1) {
    return string + "s";
  } else {
    return string;
  }
};

const submitForm = (
  gardenId: number,
  name: string,
  checkFrequencyUnit: string,
  checkFrequencyScalar: number,
  navigation: NavigationStackProp,
): void => {
  const postResult = createPlant(
    gardenId,
    name,
    checkFrequencyUnit,
    checkFrequencyScalar,
  );

  if (postResult) {
    navigation.navigate("PlantList");
  }
};

interface PlantFormProps {
  navigation: NavigationStackProp;
}

const PlantForm: FunctionComponent<PlantFormProps> = ({
  navigation,
}): ReactElement => {
  const gardenId = parseInt(navigation.getParam("gardenId", "0"));

  const [name, setName] = useState("");
  const [checkFrequencyScalar, setCheckFrequencyScalar] = useState(1);
  const [checkFrequencyUnit, setCheckFrequencyUnit] = useState("day");

  const dayLabel = pluralize("Day", checkFrequencyScalar);
  const weekLabel = pluralize("Week", checkFrequencyScalar);

  return (
    <Page>
      <Text> Add a plant!</Text>
      <TextInput
        style={[styles.inputField, styles.formSpacing]}
        placeholder={"Name"}
        value={name}
        onChangeText={(value: string): void => {
          setName(value);
        }}
      />
      <View style={styles.checkFrequencyRow}>
        <NumericInput
          minValue={1}
          value={checkFrequencyScalar}
          onChange={(value: number): void => {
            setCheckFrequencyScalar(value);
          }}
          type="plus-minus"
        />
        <Picker
          style={styles.checkFrequencyUnit}
          selectedValue={checkFrequencyUnit}
          onValueChange={(value: string): void => {
            setCheckFrequencyUnit(value);
          }}
        >
          <Picker.Item label={dayLabel} value="day" />
          <Picker.Item label={weekLabel} value="week" />
        </Picker>
      </View>
      <Button
        title="Submit"
        onPress={(): void => {
          submitForm(
            gardenId,
            name,
            checkFrequencyUnit,
            checkFrequencyScalar,
            navigation,
          );
        }}
      />
    </Page>
  );
};

export default PlantForm;
