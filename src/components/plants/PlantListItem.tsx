import React, { FunctionComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FastImage from "react-native-fast-image";

import { NavigationProps } from "../Router";
import { Plant } from "../../api/Types";

interface Props extends NavigationProps {
  plant: Plant;
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  plantItem: {
    margin: 1,
    alignItems: "center",
  },
  plantItemImage: {
    height: windowWidth / 3,
    width: windowWidth / 3,
  },
});

const PlantListItem: FunctionComponent<Props> = ({ plant, navigation }) => {
  return (
    <TouchableOpacity
      onPress={(): void => {
        navigation.navigate("PlantDetails", { id: plant.id });
      }}
    >
      <View style={styles.plantItem}>
        <FastImage
          source={{ uri: plant.avatar }}
          style={styles.plantItemImage}
        />
        <Text>{plant.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlantListItem;
