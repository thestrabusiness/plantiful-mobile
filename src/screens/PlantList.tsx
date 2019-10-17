import React, { ReactElement, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Page } from "../components/Page";
import PlantListItem from "../components/plants/PlantListItem";
import { onSignOut, retrieveCurrentUser } from "../Session";
import { NavigationStackProp } from "react-navigation-stack";
import { getGarden } from "../api/Api";
import { User, Garden } from "../api/Types";
import Icon from "react-native-vector-icons/Octicons";
import LoadingMessage from "../components/plants/LoadingMessage";
import _ from "lodash";

interface Props {
  navigation: NavigationStackProp;
}

const windowWidth = Dimensions.get("window").width;
const drawerWidth = 300;

const styles = StyleSheet.create({
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
  header: {
    paddingHorizontal: 15,
  },
  menuHeaderItem: {
    marginBottom: 1,
    width: "100%",
    fontSize: 25,
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  menuItem: {
    marginBottom: 5,
    width: "100%",
    fontSize: 20,
    padding: 10,
  },
  plantList: {
    alignItems: "center",
    width: windowWidth,
  },
});

const PlantList = (props: Props): ReactElement => {
  const { navigation } = props;
  const [garden, setGarden] = useState<Garden>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [currentGardenId, setCurrentGardenId] = useState();
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
      if (!currentUser) {
        setCurrentUser(user);
      }
      getGarden(currentGardenId || user.default_garden_id).then(
        (gardenResponse: Garden | void): void => {
          if (
            (!garden && gardenResponse) ||
            (garden &&
              gardenResponse &&
              !_.isEqual(gardenResponse.plants, garden.plants))
          ) {
            setGarden(gardenResponse);
          }
        },
      );
    } else {
      onSignOut().then((): boolean => navigation.navigate("SignedOut"));
    }
  });

  const ViewHeader = (): ReactElement => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={{ width: 30 }}
          onPress={(): void => {
            setMenuOpen(!menuOpen);
          }}
        >
          <Icon name="three-bars" size={35} />
        </TouchableOpacity>
      </View>
    );
  };

  const SignOutButton = (): ReactElement => {
    return (
      <Button
        title="Sign Out"
        onPress={(): void => {
          onSignOut().then((): boolean => navigation.navigate("SignedOut"));
        }}
      />
    );
  };

  const ViewWithDrawer = ({
    children,
  }: {
    children: ReactElement | ReactElement[];
  }): ReactElement => {
    return (
      <Page>
        <Animated.View
          style={[{ transform: [{ translateX: viewTranslationX }] }]}
        >
          <ViewHeader />
          {children}
          <View style={styles.drawer}>
            <Text style={styles.menuHeaderItem}>Your Gardens</Text>
            {currentUser &&
              currentUser.owned_gardens.map((garden: Garden) => {
                return (
                  <TouchableOpacity
                    key={garden.id}
                    onPress={(): void => {
                      setMenuOpen(!menuOpen);
                      setCurrentGardenId(garden.id);
                    }}
                  >
                    <Text style={styles.menuItem}>{garden.name}</Text>
                  </TouchableOpacity>
                );
              })}
            <Text style={styles.menuHeaderItem}>Shared Gardens</Text>
            {currentUser &&
              currentUser.shared_gardens.map((garden: Garden) => {
                return (
                  <TouchableOpacity
                    key={garden.id}
                    onPress={(): void => {
                      setMenuOpen(!menuOpen);
                      setCurrentGardenId(garden.id);
                    }}
                  >
                    <Text style={styles.menuItem}>{garden.name}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </Animated.View>
      </Page>
    );
  };

  if (garden && garden.plants.length > 0) {
    return (
      <ViewWithDrawer>
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
          <SignOutButton />
        </View>
      </ViewWithDrawer>
    );
  } else if (garden && garden.plants.length == 0) {
    return (
      <ViewWithDrawer>
        <View style={styles.plantList}>
          <Text>
            There are no plants in this garden! Click the + to add some new
            friends.
          </Text>
        </View>
        <SignOutButton />
      </ViewWithDrawer>
    );
  } else {
    return <LoadingMessage />;
  }
};

export default PlantList;
