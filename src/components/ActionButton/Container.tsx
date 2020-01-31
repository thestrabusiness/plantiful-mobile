import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    bottom: 10,
    position: "absolute",
    right: 10,
    zIndex: 2,
  },
});

const ActionButtonContainer: FunctionComponent = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default ActionButtonContainer;
