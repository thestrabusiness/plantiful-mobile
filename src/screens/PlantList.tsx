import React, { ReactElement, useState } from "react";
import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import { Page } from "../components/Page";
import PlantListItem, { Plant } from "../components/PlantListItem";
import { onSignOut, USER_KEY } from "../auth";
import { NavigationStackProp } from "react-navigation-stack";
import AsyncStorage from "@react-native-community/async-storage";

interface Props {
  navigation: NavigationStackProp;
}

const styles = StyleSheet.create({
  plantList: {
    alignItems: "center",
  },
});

const getAuthenticationToken = (): Promise<string> => {
  return new Promise((resolve, reject): void => {
    AsyncStorage.getItem(USER_KEY)
      .then((token: string | null): void => {
        if (token !== null) {
          resolve(token);
        } else {
          resolve("");
        }
      })
      .catch((error: any): void => reject(error));
  });
};

const getPlants = async (): Promise<Plant[] | void> => {
  const authenticationToken = await getAuthenticationToken();

  return fetch("http://localhost:3000/api/gardens/1/plants", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${authenticationToken}`,
    },
  })
    .then(
      (response: Response): Promise<Plant[]> => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      },
    )
    .then((plants: Plant[]): Plant[] => {
      return plants;
    })
    .catch((error: Error): void => console.error(error.message));
};

const PlantList = (props: Props): ReactElement => {
  const [plantData, setPlantData] = useState<Plant[]>([]);
  const { navigation } = props;

  getPlants().then((plants: Plant[] | void): void => {
    if (plants && plants.length > plantData.length) {
      setPlantData(plants);
    }
  });

  if (plantData.length > 0) {
    return (
      <Page>
        <Button
          title="Sign Out"
          onPress={(): void => {
            onSignOut().then((): boolean => navigation.navigate("SignedOut"));
          }}
        />
        <View style={styles.plantList}>
          <FlatList
            contentInsetAdjustmentBehavior="automatic"
            data={plantData}
            renderItem={({ item }): ReactElement => (
              <PlantListItem plant={item} />
            )}
            keyExtractor={(item): string => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={styles.plantList}
          />
        </View>
      </Page>
    );
  } else {
    return (
      <Page>
        <View>
          <Text>Loading...</Text>
        </View>
      </Page>
    );
  }
};

export default PlantList;
