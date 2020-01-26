import React, {
  FunctionComponent,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";

import { NavigationProps } from "../Router";
import Icon from "react-native-vector-icons/Octicons";
import ImageStripItem from "./ImageStripItem";

const styles = StyleSheet.create({
  scrollView: { flexDirection: "row" },
  image: { height: 100, width: 100 },
});

interface ImageAttachmentStripProps extends NavigationProps {
  setParentImages: Dispatch<SetStateAction<string[]>>;
}

const ImageAttachmentStrip: FunctionComponent<ImageAttachmentStripProps> = ({
  navigation,
  setParentImages,
}) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setParentImages(images);
  }, [images]);

  const addImageToList = (image: string): void => {
    setImages([...images, image]);
  };

  const removeImageFromList = (deleteIndex: number): void => {
    const filteredImages = images.filter((_image, index) => {
      return index !== deleteIndex;
    });
    setImages(filteredImages);
  };

  const navigateToCameraScreen = (): void => {
    navigation.navigate("Camera", {
      onPictureTaken: addImageToList,
      cropSize: 1000,
    });
  };

  return (
    <View>
      <Text>Include a photo</Text>
      <ScrollView horizontal={true} style={styles.scrollView}>
        <ImageStripItem onPress={navigateToCameraScreen}>
          <Icon name="plus" color="white" size={40} />
        </ImageStripItem>
        {images.map((image, index) => {
          return (
            <ImageStripItem
              key={index}
              onPress={(): void => {
                removeImageFromList(index);
              }}
            >
              <Image source={{ uri: image }} style={styles.image} />
            </ImageStripItem>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ImageAttachmentStrip;
