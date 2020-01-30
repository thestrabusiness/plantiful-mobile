import React, {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import { Button, Dimensions, View, Animated, StyleSheet } from "react-native";

import { User } from "../../api/Types";
import DrawerSection from "./DrawerSection";
import { NavigationProps } from "../Router";
import SignOutButton from "../shared/SignOutButton";

const windowWidth = Dimensions.get("window").width;
const DRAWER_WIDTH = 300;

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    left: -DRAWER_WIDTH,
    width: DRAWER_WIDTH + windowWidth,
    height: "100%",
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

interface DrawerProps extends NavigationProps {
  currentUser: User;
  setCurrentGardenId: Dispatch<SetStateAction<number>>;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  menuOpen: boolean;
}

const ViewWithDrawer: FunctionComponent<DrawerProps> = ({
  children,
  currentUser,
  setCurrentGardenId,
  setMenuOpen,
  menuOpen,
  navigation,
}) => {
  const viewPosition = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(viewPosition, {
      toValue: menuOpen ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [menuOpen]);

  const viewTranslationX = viewPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [DRAWER_WIDTH, 0],
  });

  const afterGardenCreation = (newGardenId: number): void => {
    setMenuOpen(false);
    setCurrentGardenId(newGardenId);
  };

  return (
    <Animated.View
      style={[
        styles.animatedView,
        { transform: [{ translateX: viewTranslationX }] },
      ]}
    >
      {children}
      <View style={styles.drawer}>
        <View>
          <DrawerSection
            setMenuOpen={setMenuOpen}
            setCurrentGardenId={setCurrentGardenId}
            gardens={currentUser.owned_gardens}
            title="Your Gardens"
          />
          <DrawerSection
            setMenuOpen={setMenuOpen}
            setCurrentGardenId={setCurrentGardenId}
            gardens={currentUser.shared_gardens}
            title="Shared Gardens"
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <Button
              title="Create a new garden"
              onPress={(): void => {
                navigation.navigate("GardenForm", {
                  afterCreate: afterGardenCreation,
                });
              }}
            />
          </View>
          <SignOutButton navigation={navigation} />
        </View>
      </View>
    </Animated.View>
  );
};

export { DRAWER_WIDTH };
export default ViewWithDrawer;
