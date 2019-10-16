import React, { ReactElement, useState } from "react";
import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import { Page } from "../components/Page";
import PlantListItem from "../components/PlantListItem";
import { onSignOut } from "../auth";
import { NavigationStackProp } from "react-navigation-stack";
import { getPlants } from "../api/Api";
import { Plant } from "../api/Types";

interface Props {
  navigation: NavigationStackProp;
}

const styles = StyleSheet.create({
  plantList: {
    alignItems: "center",
  },
});

const PlantList = (props: Props): ReactElement => {
  const [plantData, setPlantData] = useState<Plant[]>([]);
  const { navigation } = props;
  const gardenID = 1;

  getPlants(gardenID).then((plants: Plant[] | void): void => {
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
