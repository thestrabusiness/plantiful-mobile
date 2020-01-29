import React, { ReactElement, useState, FunctionComponent } from "react";
import {
  Dimensions,
  View,
  Text,
  TextInput,
  Picker,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import NumericInput from "react-native-numeric-input";
import { NavigationStackProp } from "react-navigation-stack";

import { Page } from "../components/Page";
import { createPlant, updatePlant } from "../api/Api";
import { Plant } from "../api/Types";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  formTitle: {
    fontSize: 36,
    alignSelf: "center",
    margin: 10,
  },
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
  plantImage: {
    alignSelf: "center",
    height: windowWidth * 0.5,
    width: windowWidth * 0.5,
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
  plantId: number | undefined,
  gardenId: number,
  name: string,
  checkFrequencyUnit: string,
  checkFrequencyScalar: number,
  image: string | null,
  navigation: NavigationStackProp,
): void => {
  let requestResult;
  if (plantId) {
    requestResult = updatePlant(
      plantId,
      name,
      checkFrequencyUnit,
      checkFrequencyScalar,
      image,
    );
  } else {
    requestResult = createPlant(
      gardenId,
      name,
      checkFrequencyUnit,
      checkFrequencyScalar,
      image,
    );
  }

  if (requestResult) {
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
  const plant: Plant = JSON.parse(navigation.getParam("plant", "{}"));

  const [name, setName] = useState(plant.name || "");
  const [checkFrequencyScalar, setCheckFrequencyScalar] = useState(
    plant.check_frequency_scalar || 1,
  );
  const [checkFrequencyUnit, setCheckFrequencyUnit] = useState(
    plant.check_frequency_unit || "day",
  );
  const [image, setImage] = useState(null);

  const dayLabel = pluralize("Day", checkFrequencyScalar);
  const weekLabel = pluralize("Week", checkFrequencyScalar);

  const navigateToCameraScreen = (): void => {
    navigation.navigate("Camera", { onPictureTaken: setImage, cropSize: 300 });
  };

  const imageAvailable = !!image || !!plant.avatar;
  const buttonText = imageAvailable ? "Change photo" : "Add a photo";
  const pageTitle = !!plant.id ? `Edit ${plant.name}` : "Add a plant!";

  return (
    <Page style={styles.container}>
      <Text style={styles.formTitle}>{pageTitle}</Text>
      {imageAvailable && (
        <Image
          source={{ uri: image || plant.avatar }}
          style={styles.plantImage}
        />
      )}
      <Button title={buttonText} onPress={navigateToCameraScreen} />
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
            plant.id,
            gardenId,
            name,
            checkFrequencyUnit,
            checkFrequencyScalar,
            image,
            navigation,
          );
        }}
      />
    </Page>
  );
};

export default PlantForm;
