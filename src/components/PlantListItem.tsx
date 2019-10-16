import React, { ReactElement } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { avatarUri } from "./AvatarPlaceholder";

export interface CheckIn {
  created_at: number;
  fertilized: boolean;
  id: number;
  notes: string;
  photo_urls: string[];
  plant_id: number;
  watered: boolean;
}

export interface Plant {
  avatar: string;
  check_frequency_scalar: number;
  check_frequency_unit: string;
  check_ins: CheckIn[];
  garden_id: number;
  id: number;
  last_watered_at: number;
  name: string;
  next_check_date: string;
  overdue_for_check_in: boolean;
}

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
