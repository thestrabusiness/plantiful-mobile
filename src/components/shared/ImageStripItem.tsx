import React, { FunctionComponent, ReactElement } from "react";
import { TouchableOpacity } from "react-native";

interface ImageStripItemProps {
  onPress?: () => void;
  children?: ReactElement;
}

const ImageStripItem: FunctionComponent<ImageStripItemProps> = ({
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "black",
        height: 100,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 1,
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default ImageStripItem;
