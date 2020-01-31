import React, { FunctionComponent } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { NavigationProps } from "../Router";
import { Plant } from "../../api/Types";
import ImageWithIndicator from "../shared/ImageWithIndicator";

import { Layout, Outline, Shadow } from "../../styles";

interface Props extends NavigationProps {
  plant: Plant;
}

const gridItemDimension = Layout.screenWidth / 3;

const styles = StyleSheet.create({
  plantItem: {
    margin: 1,
    alignItems: "center",
  },
  plantItemImage: {
    borderRadius: Outline.borderRadiusAvatar,
    height: gridItemDimension,
    width: gridItemDimension,
  },
  plantName: {
    textAlign: "center",
    width: gridItemDimension,
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: Outline.borderRadiusAvatar,
    ...Shadow.dropShadowMinimalVertical,
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
        <View style={styles.imageContainer}>
          <ImageWithIndicator
            source={plant.avatar}
            imageStyle={styles.plantItemImage}
          />
        </View>
        <Text style={styles.plantName} numberOfLines={1} ellipsizeMode="tail">
          {plant.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlantListItem;
