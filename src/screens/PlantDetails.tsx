import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Alert,
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

import { Layout, Spacing, Outline, Shadow } from "../styles";

const styles = StyleSheet.create({
  checkInHeader: {
    fontSize: 18,
    marginVertical: Spacing.base,
  },
  detailsContainer: {
    alignItems: "center",
    height: Layout.screenHeight * 0.33,
    justifyContent: "space-around",
  },
  pageContainer: {
    paddingHorizontal: Spacing.base,
  },
  plantImage: {
    borderRadius: Outline.borderRadiusAvatar,
    height: Layout.screenWidth * 0.5,
    width: Layout.screenWidth * 0.5,
  },
  plantName: {
    fontSize: 24,
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: Outline.borderRadiusAvatar,
    ...Shadow.dropShadowSharp,
  },
});

const showDeletePlantAlert = (
  plantName: string,
  plantId: number,
  navigation: any,
): void => {
  Alert.alert(
    "Are you sure?",
    `This action will remove ${plantName} your garden.`,
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: (): void => {
          deletePlant(plantId).then(response => {
            if (!response.error?.message) {
              Toast.show(`${plantName} deleted`);
              navigation.goBack();
            } else {
              handleError(response);
            }
          });
        },
      },
    ],
  );
};

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

  if (plant && plantName) {
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
              showDeletePlantAlert(plantName, plantId, navigation);
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
              <View style={styles.imageContainer}>
                <ImageWithIndicator
                  source={avatarPhotoData || plant.avatar}
                  imageStyle={styles.plantImage}
                />
              </View>
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
