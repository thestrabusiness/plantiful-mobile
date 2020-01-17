import React, { ReactElement } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";

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
    <View style={styles.plantItem}>
      <FastImage source={{ uri: avatarUri }} style={styles.plantItemImage} />
      <Text>{plant.name}</Text>
    </View>
  );
};

export default PlantListItem;
