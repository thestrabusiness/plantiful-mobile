import React, { ReactElement, useState } from "react";
import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import { Page } from "../components/Page";
import PlantListItem from "../components/PlantListItem";
import { onSignOut, retrieveCurrentUser } from "../Session";
import { NavigationStackProp } from "react-navigation-stack";
import { getGarden } from "../api/Api";
import { User, Garden } from "../api/Types";

interface Props {
  navigation: NavigationStackProp;
}

const styles = StyleSheet.create({
  plantList: {
    alignItems: "center",
  },
});

const PlantList = (props: Props): ReactElement => {
  const [garden, setGarden] = useState<Garden>();
  const { navigation } = props;

  retrieveCurrentUser().then((user: User | void): void => {
    if (user) {
      getGarden(user.default_garden_id).then(
        (gardenResponse: Garden | void): void => {
          if (
            (!garden && gardenResponse) ||
            (garden &&
              gardenResponse &&
              gardenResponse.plants.length > garden.plants.length)
          ) {
            setGarden(gardenResponse);
          }
        },
      );
    } else {
      onSignOut().then((): boolean => navigation.navigate("SignedOut"));
    }
  });

  if (garden && garden.plants.length > 0) {
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
            data={garden.plants}
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
  } else if (garden && garden.plants.length == 0) {
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
