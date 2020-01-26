import React, { FunctionComponent } from "react";
import { ScrollView, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

import ImageStripItem from "./ImageStripItem";

const styles = StyleSheet.create({
  scrollView: { marginVertical: 3, flexDirection: "row" },
  image: { height: 100, width: 100 },
});

interface ImageStripProps {
  imageUris: string[];
}

const ImageStrip: FunctionComponent<ImageStripProps> = ({ imageUris }) => {
  return (
    <ScrollView horizontal={true} style={styles.scrollView}>
      {imageUris.map((uri, index) => {
        return (
          <ImageStripItem key={index}>
            <FastImage source={{ uri }} style={styles.image} />
          </ImageStripItem>
        );
      })}
    </ScrollView>
  );
};

export default ImageStrip;
