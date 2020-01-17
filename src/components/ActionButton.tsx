import React, { FunctionComponent } from "react";
import { StyleSheet, View, TouchableOpacity, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

const elevationShadowStyle = (elevation: number): ViewStyle => {
  return {
    elevation,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 0.75 * elevation },
    shadowOpacity: 0.6,
    shadowRadius: 0.8 * elevation,
  };
};

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    backgroundColor: "green",
    bottom: 90,
    borderRadius: 100,
    position: "absolute",
    height: 70,
    justifyContent: "center",
    right: 10,
    width: 70,
    zIndex: 2,
  },
  shadow: {
    ...elevationShadowStyle(5),
  },
  plus: {
    top: 1,
  },
});

interface ActionButtonProps {
  onPress: () => void;
}

const ActionButton: FunctionComponent<ActionButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.actionButton, styles.shadow]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View>
        <Icon name="plus-small" size={70} style={styles.plus} />
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;
