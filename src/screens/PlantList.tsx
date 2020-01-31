import React, { ReactElement, useState, FunctionComponent } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import _ from "lodash";
import Icon from "react-native-vector-icons/Octicons";
import Toast from "react-native-simple-toast";

import { APIResponse, handleError, getGarden } from "../api/Api";
import { User, Garden } from "../api/Types";
import { Page } from "../components/Page";
import { NavigationProps } from "../components/Router";
import PlantListItem from "../components/Plant/ListItem";
import { onSignOut, retrieveCurrentUser } from "../Session";
import LoadingMessage from "../components/Plant/LoadingMessage";
import ActionButton from "../components/ActionButton/Button";
import ActionButtonContainer from "../components/ActionButton/Container";
import Header from "../components/shared/Header";
import ViewWithDrawer from "../components/Plant/ListDrawer";

const windowWidth = Dimensions.get("window").width;
const drawerWidth = 300;

const styles = StyleSheet.create({
  rightOfDrawer: {
    left: drawerWidth,
  },
  plantList: {
    flex: 1,
    alignItems: "center",
    width: windowWidth,
  },
  noPlantsMessageContainer: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  noPlantsMessageText: { fontSize: 18, textAlign: "center" },
});

const PlantList: FunctionComponent<NavigationProps> = ({ navigation }) => {
  const [garden, setGarden] = useState<Garden>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [currentGardenId, setCurrentGardenId] = useState();
  const [menuOpen, setMenuOpen] = useState(false);

  const firstGardenLoad = (response: APIResponse<Garden>): boolean => {
    return !garden && !!response.data;
  };

  const updatedGardenFetched = (response: APIResponse<Garden>): boolean => {
    return !!garden && !_.isEqual(response?.data?.plants, garden.plants);
  };

  retrieveCurrentUser().then((user: User | void): void => {
    if (user) {
      if (!currentUser) {
        setCurrentUser(user);
      }
      getGarden(currentGardenId || user.default_garden_id).then(
        (response): void => {
          if (
            response.data &&
            (firstGardenLoad(response) || updatedGardenFetched(response))
          ) {
            setGarden(response.data);
          } else if (response.error) {
            handleError(response);
          }
        },
      );
    } else {
      onSignOut().then((): void => {
        Toast.show("You aren't signed in");
        navigation.navigate("SignedOut");
      });
    }
  });

  const AddPlantsButton = (): ReactElement => {
    return (
      <ActionButtonContainer>
        <ActionButton
          style={{ marginBottom: 40 }}
          iconName="plus-small"
          iconSize={70}
          onPress={(): void => {
            navigation.navigate("PlantForm", {
              gardenId: garden && garden.id.toString(),
            });
          }}
        />
      </ActionButtonContainer>
    );
  };

  const GardenMenuButton = (
    <TouchableOpacity
      style={{ width: 30 }}
      onPress={(): void => {
        setMenuOpen(!menuOpen);
      }}
    >
      <Icon name="three-bars" size={35} />
    </TouchableOpacity>
  );

  if (garden && currentUser) {
    return (
      <Page>
        <Header title={garden.name} leftElement={GardenMenuButton} />
        <ViewWithDrawer
          currentUser={currentUser}
          setCurrentGardenId={setCurrentGardenId}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          navigation={navigation}
        >
          <View style={[styles.plantList, styles.rightOfDrawer]}>
            <AddPlantsButton />
            {garden.plants.length > 0 && (
              <FlatList
                data={garden.plants}
                renderItem={({ item }): ReactElement => (
                  <PlantListItem plant={item} navigation={navigation} />
                )}
                keyExtractor={(item): string => item.id.toString()}
                numColumns={3}
              />
            )}
            {garden.plants.length == 0 && (
              <View style={styles.noPlantsMessageContainer}>
                <Text style={styles.noPlantsMessageText}>
                  There are no plants in this garden! Click the + to add some
                  new friends.
                </Text>
              </View>
            )}
          </View>
        </ViewWithDrawer>
      </Page>
    );
  } else {
    return (
      <Page>
        <LoadingMessage />
      </Page>
    );
  }
};

export default PlantList;
