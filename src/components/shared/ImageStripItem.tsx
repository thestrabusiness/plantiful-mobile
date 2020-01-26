import React, { FunctionComponent, ReactElement } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 1,
  },
});

interface ImageStripItemProps {
  onPress?: () => void;
  children?: ReactElement;
}

const ImageStripItem: FunctionComponent<ImageStripItemProps> = ({
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default ImageStripItem;
