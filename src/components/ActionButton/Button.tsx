import React, { FunctionComponent } from "react";
import { StyleSheet, View, TouchableOpacity, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

import { Outline, Shadow } from "../../styles";

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: Outline.borderRadiusCircle,
    height: 60,
    justifyContent: "center",
    width: 60,
    marginVertical: 5,
    padding: 5,
    ...Shadow.dropShadowActionButton,
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
      style={[styles.actionButton, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View>
        <Icon name={iconName} size={iconSize} />
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;
