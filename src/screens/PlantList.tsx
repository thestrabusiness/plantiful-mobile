import React, { ReactElement, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Text,
  Animated,
  Dimensions,
} from "react-native";
import { Page } from "../components/Page";
import PlantListItem from "../components/PlantListItem";
import { onSignOut, retrieveCurrentUser } from "../Session";
import { NavigationStackProp } from "react-navigation-stack";
import { getGarden } from "../api/Api";
import { User, Garden } from "../api/Types";

interface Props {
  navigation: NavigationStackProp;
}

const windowWidth = Dimensions.get("window").width;
const drawerWidth = 300;

const styles = StyleSheet.create({
  plantList: {
    alignItems: "center",
    width: windowWidth,
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: windowWidth,
    bottom: 0,
    width: drawerWidth,
    flexDirection: "column",
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#f53b3b",
    alignItems: "center",
  },
  menuLayout: {
    marginBottom: 1,
    width: "100%",
    fontSize: 25,
    padding: 10,
  },
});

const PlantList = (props: Props): ReactElement => {
  const { navigation } = props;
  const [garden, setGarden] = useState<Garden>();
  const viewPosition = useRef(new Animated.Value(0)).current;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    Animated.timing(viewPosition, {
      toValue: menuOpen ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [menuOpen]);

  const viewTranslationX = viewPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [drawerWidth, 0],
  });

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
        <Animated.View
          style={[{ transform: [{ translateX: viewTranslationX }] }]}
        >
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
            <Button
              title="Open Menu"
              onPress={(): void => {
                setMenuOpen(!menuOpen);
              }}
            />
            <Button
              title="Sign Out"
              onPress={(): void => {
                onSignOut().then((): boolean =>
                  navigation.navigate("SignedOut"),
                );
              }}
            />
          </View>
          <View style={styles.drawer}>
            <Text style={styles.menuLayout}>This is the drawer</Text>
            <Text style={styles.menuLayout}>This is menu option</Text>
            <Text style={styles.menuLayout}>Another menu item</Text>
            <Button
              title="Close menu"
              onPress={(): void => {
                setMenuOpen(!menuOpen);
              }}
            />
          </View>
        </Animated.View>
      </Page>
    );
  } else if (garden && garden.plants.length == 0) {
    return (
      <Page>
        <View>
          <Text>
            There are no plants in this garden! Click the + to add some new
            friends.
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
