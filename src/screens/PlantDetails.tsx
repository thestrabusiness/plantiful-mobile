import React, { FunctionComponent, useState, useEffect } from "react";
import {Dimensions, Text, TouchableOpacity, View, StyleSheet, ScrollView} from "react-native";

import CheckInList from "../components/plants/CheckInList";
import { NavigationProps } from "../components/Router";
import { fetchPlant, uploadAvatar } from "../api/Api";
import { Plant } from "../api/Types";
import ImageWithIndicator from "../components/shared/ImageWithIndicator";
import ActionButton from "../components/ActionButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  pageContainer: {
    paddingHorizontal: 10,
  },
  detailsContainer: {
    alignItems: "center",
    height: windowHeight * 0.33,
    justifyContent: "space-around",
  },
  plantName: {
    fontSize: 24,
  },
  plantImage: {
    height: windowWidth * 0.5,
    width: windowWidth * 0.5,
  },
  checkInHeader: {
    fontSize: 18,
    marginVertical: 10,
  },
});

const PlantDetails: FunctionComponent<NavigationProps> = ({ navigation }) => {
  const [plant, setPlant] = useState<Plant>();
  const [loading, setLoading] = useState(true);
  const [avatarPhotoData, setAvatarPhotoData] = useState();
  const plantId = navigation.getParam("id", null);
  const plantName = plant?.name;

  useEffect(() => {
    let resolvePromise = true;

    fetchPlant(plantId).then((response: Plant | void) => {
      if (response && resolvePromise) {
        setLoading(false);
        setPlant(response);
      } else {
        navigation.goBack();
      }
    });
    return (): void => {
      resolvePromise = false;
    };
  }, []);

  useEffect(() => {
    if (avatarPhotoData) {
      uploadAvatar(plantId, avatarPhotoData);
    }
  }, [avatarPhotoData]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (plant) {
    return (
      <>
        <ActionButton
          onPress={(): void => {
            navigation.navigate("PlantCheckIn", {plantId, plantName});
          }}
        />
        <ScrollView style={styles.pageContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.plantName}>{plant.name}</Text>
            <TouchableOpacity onPress={(): void => {
              navigation.navigate(
                "Camera",
                {onPictureTaken: setAvatarPhotoData},
              );
            }}>
              <ImageWithIndicator
                source={avatarPhotoData || plant.avatar}
                imageStyle={styles.plantImage}
              />
            </TouchableOpacity>
            <Text style={styles.checkInHeader}>
              Next check-in due: {plant.next_check_date}
            </Text>
          </View>
          <CheckInList checkIns={plant.check_ins} />
        </ScrollView>
      </>
    );
  }

  return <></>;
};

export default PlantDetails;
