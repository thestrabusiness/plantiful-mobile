import React, { ReactElement, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import NumericInput from "react-native-numeric-input";
import { Page } from "../components/Page";

const styles = StyleSheet.create({
  inputField: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
});

const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PlantForm = (): ReactElement => {
  const [name, setName] = useState("");
  const [checkFrequencyScalar, setCheckFrequencyScalar] = useState(1);
  const [checkFrequencyUnit, setCheckFrequencyUnit] = useState("day");

  return (
    <Page>
      <Text> Add a plant!</Text>
      <TextInput
        style={styles.inputField}
        placeholder={"Name"}
        value={name}
        onChangeText={(value: string): void => {
          setName(value);
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <NumericInput
          value={checkFrequencyScalar}
          onChange={(value: number): void => {
            setCheckFrequencyScalar(value);
          }}
          type="plus-minus"
        />
        <TouchableOpacity style={{ flex: 3 }}>
          <Text>{capitalize(checkFrequencyUnit)}</Text>
        </TouchableOpacity>
      </View>
      <Picker
        selectedValue={checkFrequencyUnit}
        onValueChange={(value: string): void => {
          setCheckFrequencyUnit(value);
        }}
      >
        <Picker.Item label="Day" value="day" />
        <Picker.Item label="Week" value="week" />
      </Picker>
      <Button
        title="Submit"
        onPress={(): void => {
          console.log(name, checkFrequencyUnit, checkFrequencyScalar);
        }}
      />
    </Page>
  );
};

export default PlantForm;
