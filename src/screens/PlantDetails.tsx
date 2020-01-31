import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import Toast from "react-native-simple-toast";

import CheckInList from "../components/CheckIn/List";
import { NavigationProps } from "../components/Router";
import { deletePlant, fetchPlant, handleError, uploadAvatar } from "../api/Api";
import { Plant } from "../api/Types";
import ImageWithIndicator from "../components/shared/ImageWithIndicator";
import ActionButton from "../components/ActionButton/Button";
import ActionButtonContainer from "../components/ActionButton/Container";
import { Page } from "../components/Page";
import Header from "../components/shared/Header";
import LoadingMessage from "../components/Plant/LoadingMessage";
import useDidFocus from "../useDidFocus";

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
  const [avatarPhotoData, setAvatarPhotoData] = useState(null);
  const plantId = navigation.getParam("id", null);
  const plantName = plant?.name;

  const getPlantData = (resolvePromise: boolean): void => {
    fetchPlant(plantId).then(response => {
      if (response.data && resolvePromise) {
        setLoading(false);
        setPlant(response.data);
      } else {
        handleError(response);
        navigation.goBack();
      }
    });
  };

  useEffect(() => {
    let resolvePromise = true;
    getPlantData(resolvePromise);

    return (): void => {
      resolvePromise = false;
    };
  }, []);

  useEffect(() => {
    if (avatarPhotoData !== null) {
      uploadAvatar(plantId, avatarPhotoData).then(response => {
        if (response.data) {
          Toast.show("Photo updated!");
        } else {
          handleError(response);
        }
      });
    }
  }, [avatarPhotoData]);

  useDidFocus(navigation, () => {
    getPlantData(true);
  });

  if (loading) {
    return <LoadingMessage />;
  }

  if (plant) {
    return (
      <Page>
        <Header title={plant.name} navigation={navigation} />
        <ActionButtonContainer>
          <ActionButton
            iconName="pencil"
            iconSize={30}
            onPress={(): void => {
              navigation.navigate("PlantForm", {
                plant: JSON.stringify(plant),
              });
            }}
          />
          <ActionButton
            iconName="check"
            iconSize={35}
            onPress={(): void => {
              navigation.navigate("PlantCheckIn", { plantId, plantName });
            }}
          />
          <ActionButton
            iconName="trashcan"
            iconSize={35}
            onPress={(): void => {
              deletePlant(plantId).then(response => {
                if (!response.error?.message) {
                  Toast.show(`${plantName} deleted`);
                  navigation.goBack();
                } else {
                  handleError(response);
                }
              });
            }}
          />
        </ActionButtonContainer>
        <ScrollView style={styles.pageContainer}>
          <View style={styles.detailsContainer}>
            <TouchableOpacity
              onPress={(): void => {
                navigation.navigate("Camera", {
                  onPictureTaken: setAvatarPhotoData,
                });
              }}
            >
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
      </Page>
    );
  }

  return <></>;
};

export default PlantDetails;
