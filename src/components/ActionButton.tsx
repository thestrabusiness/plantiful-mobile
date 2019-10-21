import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

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
    shadowOpacity: 0.6,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 4 },
    width: 70,
    zIndex: 2,
  },
  plus: {
    top: 1,
  },
});

interface ActionButtonProps {
  onPress: () => void;
}

const ActionButton = (props: ActionButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={props.onPress}
      activeOpacity={0.9}
    >
      <View>
        <Icon name="plus-small" size={70} style={styles.plus} />
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;
