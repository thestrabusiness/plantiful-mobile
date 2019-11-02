import React, { ReactElement } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { avatarUri } from "../../fixtures/AvatarPlaceholder";
import { Plant } from "../../api/Types";

interface Props {
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

const PlantListItem = (props: Props): ReactElement => {
  const { plant } = props;
  return (
    <View key={plant.id} style={styles.plantItem}>
      <Image source={{ uri: avatarUri }} style={styles.plantItemImage} />
      <Text>{plant.name}</Text>
    </View>
  );
};

export default PlantListItem;
