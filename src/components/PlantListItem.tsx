import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { avatarUri } from "./AvatarPlaceholder";

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

const PlantListItem = (plant: any) => {
  return (
    <View key={plant.id} style={styles.plantItem}>
      <Image source={{ uri: avatarUri }} style={styles.plantItemImage} />
      <Text>{plant.name}</Text>
    </View>
  );
};

export default PlantListItem;
