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
    borderRadius: 100,
    height: 70,
    justifyContent: "center",
    width: 70,
    marginVertical: 5,
  },
  shadow: {
    ...elevationShadowStyle(5),
  },
  plus: {
    top: 1,
  },
});

interface ActionButtonProps {
  iconName: string;
  iconSize: number;
  onPress: () => void;
  style?: ViewStyle;
}

const ActionButton: FunctionComponent<ActionButtonProps> = ({
  iconName,
  iconSize,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.actionButton, styles.shadow, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View>
        <Icon name={iconName} size={iconSize} style={styles.plus} />
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;