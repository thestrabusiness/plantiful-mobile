import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Garden } from "../../api/Types";

const styles = StyleSheet.create({
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
});

interface MenuSectionProps {
  setCurrentGardenId: Dispatch<SetStateAction<number>>;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  gardens: Garden[];
  title: string;
}

const DrawerSection: FunctionComponent<MenuSectionProps> = ({
  setCurrentGardenId,
  setMenuOpen,
  gardens,
  title,
}) => {
  const menuItems = gardens.map((garden: Garden) => {
    return (
      <TouchableOpacity
        key={garden.id}
        onPress={(): void => {
          setMenuOpen(false);
          setCurrentGardenId(garden.id);
        }}
      >
        <Text style={styles.menuItem}>{garden.name}</Text>
      </TouchableOpacity>
    );
  });

  if (menuItems.length > 0) {
    return (
      <View>
        <Text style={styles.menuHeaderItem}>{title}</Text>
        {menuItems}
      </View>
    );
  } else {
    return <></>;
  }
};

export default DrawerSection;
