import React, { FunctionComponent, useState } from "react";
import { Button, TextInput, Text, View, StyleSheet } from "react-native";
import Toast from "react-native-simple-toast";

import { createCheckIn, handleError } from "../api/Api";
import SwitchInputField from "../components/shared/SwitchInputField";
import { NavigationProps } from "../components/Router";
import ImageAttachmentStrip from "../components/shared/ImageAttachmentStrip";
import Header from "../components/shared/Header";
import { Page } from "../components/Page";

import { Inputs, Layout, Spacing } from "../styles";

const styles = StyleSheet.create({
  container: {
    ...Layout.paddingHorizontal,
  },
  inputSection: {
    alignContent: "space-between",
    height: "80%",
    justifyContent: "space-between",
    paddingTop: Spacing.base,
  },
  inputField: {
    ...Inputs.multiLine,
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
    Toast.show("Couldn't find that plant");
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
              multiline={true}
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
                  Toast.show("Check-in added!");
                  navigation.goBack();
                } else {
                  handleError(result);
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
