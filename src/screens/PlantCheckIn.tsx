import React, { FunctionComponent, useState } from "react";
import { Button, TextInput, Text, View, StyleSheet } from "react-native";

import { createCheckIn } from "../api/Api";
import SwitchInputField from "../components/shared/SwitchInputField";
import { NavigationProps } from "../components/Router";
import ImageAttachmentStrip from "../components/shared/ImageAttachmentStrip";
import Header from "../components/shared/Header";
import { Page } from "../components/Page";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  inputSection: {
    paddingTop: 10,
    height: "80%",
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
  const [images, setImages] = useState<string[]>([]);

  if (!plantId) {
    navigation.goBack();
    return <></>;
  } else {
    return (
      <Page style={styles.container}>
        <Header title={`Check In ${plantName}`} navigation={navigation} />
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
          <ImageAttachmentStrip
            navigation={navigation}
            setParentImages={setImages}
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
            createCheckIn(plantId, isWatered, isFertilized, notes, images).then(
              result => {
                if (result.data) {
                  navigation.goBack();
                } else {
                  // TODO: Replace this display error to user
                  console.log(result.error?.message);
                }
              },
            );
          }}
        />
      </Page>
    );
  }
};

export default PlantCheckIn;
