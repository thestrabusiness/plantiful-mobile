import React, { ReactElement, useState } from "react";
import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import { Page } from "../components/Page";
import PlantListItem from "../components/PlantListItem";
import { onSignOut, retrieveCurrentUser } from "../Session";
import { NavigationStackProp } from "react-navigation-stack";
import { getPlants } from "../api/Api";
import { Plant, User } from "../api/Types";

interface Props {
  navigation: NavigationStackProp;
}

const styles = StyleSheet.create({
  plantList: {
    alignItems: "center",
  },
});

const PlantList = (props: Props): ReactElement => {
  const [plantData, setPlantData] = useState<Plant[]>();
  const { navigation } = props;

  retrieveCurrentUser().then((user: User | void): void => {
    if (user) {
      getPlants(user.default_garden_id).then((plants: Plant[] | void): void => {
        if (
          (plants && !plantData) ||
          (plants && plantData && plants.length > plantData.length)
        ) {
          setPlantData(plants);
        }
      });
    } else {
      onSignOut().then((): boolean => navigation.navigate("SignedOut"));
    }
  });

  if (plantData && plantData.length > 0) {
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
  } else if (plantData && plantData.length == 0) {
    return (
      <Page>
        <View>
          <Text>
            You don't have any plants yet! Click the + to add some new friends.
          </Text>
          <Button
            title="Sign Out"
            onPress={(): void => {
              onSignOut().then((): boolean => navigation.navigate("SignedOut"));
            }}
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
