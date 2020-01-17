import React, { FunctionComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { NavigationProps } from "../Router";
import { Plant } from "../../api/Types";
import ImageWithIndicator from "../shared/ImageWithIndicator";

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
        <ImageWithIndicator
          source={plant.avatar}
          imageStyle={styles.plantItemImage}
        />
        <Text>{plant.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlantListItem;
