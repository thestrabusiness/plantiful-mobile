import React, { ReactElement } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { Page } from "../components/Page";
import PlantListItem from "../components/PlantListItem";
import { plantData } from "../components/DevData";
import { onSignOut } from "../auth";
import { NavigationStackProp } from "react-navigation-stack";

interface Props {
  navigation: NavigationStackProp;
}

const styles = StyleSheet.create({
  plantList: {
    alignItems: "center",
  },
});

const PlantList = (props: Props): ReactElement => {
  const { navigation } = props;
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
};

export default PlantList;
