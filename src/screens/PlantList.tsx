import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Page } from "../components/Page";
import PlantListItem from "../components/PlantListItem";
import { plantData } from "../components/DevData";

const styles = StyleSheet.create({
  plantList: {
    alignItems: "center",
  },
});

const PlantList = () => {
  return (
    <Page>
      <View style={styles.plantList}>
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          data={plantData}
          renderItem={({ item }) => <PlantListItem plant={item} />}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{ alignItems: "flex-start" }}
        />
      </View>
    </Page>
  );
};

export default PlantList;
