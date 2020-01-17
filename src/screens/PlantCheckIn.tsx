import React, { FunctionComponent, useState } from "react";
import { Button, TextInput, Text, View, StyleSheet } from "react-native";

import { createCheckIn } from "../api/Api";
import SwitchInputField from "../components/shared/SwitchInputField";
import { NavigationProps } from "../components/Router";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  header: {
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputSection: {
    height: "60%",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  inputField: {
    height: 120,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
});

const PlantCheckIn: FunctionComponent<NavigationProps> = ({ navigation }) => {
  const plantName = navigation.getParam("plantName", "Name");
  const plantId = navigation.getParam("plantId", null);
  const [isWatered, setIsWatered] = useState(false);
  const [isFertilized, setIsFertilized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notes, setNotes] = useState("");

  if (!plantId) {
    navigation.goBack();
    return <></>;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Check In {plantName}</Text>
        </View>
        <View style={styles.inputSection}>
          <SwitchInputField
            label="Watered"
            value={isWatered}
            setValue={setIsWatered}
          />
          <SwitchInputField
            label="Fertilized"
            value={isFertilized}
            setValue={setIsFertilized}
          />
          <View>
            <Text>Notes</Text>
            <TextInput
              style={styles.inputField}
              value={notes}
              onChangeText={(newNotes): void => {
                setNotes(newNotes);
              }}
            />
          </View>
        </View>
        <Button
          disabled={isSubmitting}
          title={isSubmitting ? "Submitting..." : "Submit"}
          onPress={(): void => {
            setIsSubmitting(true);
            createCheckIn(plantId, isWatered, isFertilized, notes).then(
              result => {
                if (result) {
                  navigation.goBack();
                } else {
                  console.log("something went wrong");
                }
              },
            );
          }}
        />
      </View>
    );
  }
};

export default PlantCheckIn;
