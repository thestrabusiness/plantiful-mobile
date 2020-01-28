import React, { FunctionComponent } from "react";
import { ScrollView, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

import ImageStripItem from "./ImageStripItem";
import { PhotoUrl } from "../../api/Types";
import useImageViewContext from "../../useImageViewContext";

const styles = StyleSheet.create({
  scrollView: { marginVertical: 3, flexDirection: "row" },
  image: { height: 100, width: 100 },
});

interface ImageStripProps {
  imageUris: PhotoUrl[];
}

const ImageStrip: FunctionComponent<ImageStripProps> = ({ imageUris }) => {
  const {
    setImageViewIndex,
    setImageViewVisible,
    setImagesForImageView,
  } = useImageViewContext();

  const imagesForImageView = imageUris.map(uris => {
    return { uri: uris.original };
  });

  return (
    <ScrollView horizontal={true} style={styles.scrollView}>
      {imageUris.map((uris, index) => {
        const onPress = (): void => {
          setImagesForImageView(imagesForImageView);
          setImageViewIndex(index);
          setImageViewVisible(true);
        };
        return (
          <ImageStripItem onPress={onPress} key={index}>
            <FastImage source={{ uri: uris.preview }} style={styles.image} />
          </ImageStripItem>
        );
      })}
    </ScrollView>
  );
};

export default ImageStrip;
