import React, { createContext, FunctionComponent, useState } from "react";

import ImageView from "react-native-image-viewing";

interface ImageViewImage {
  uri: string;
}

interface ImageViewContextValues {
  imageViewVisible: boolean;
  setImageViewVisible: (visible: boolean) => void;
  imageViewIndex: number;
  setImageViewIndex: (index: number) => void;
  imagesForImageView: ImageViewImage[];
  setImagesForImageView: (images: ImageViewImage[]) => void;
}

const defaultContext: ImageViewContextValues = {
  imageViewVisible: false,
  setImageViewVisible: (_visible: boolean): void => {
    _visible;
  },
  imageViewIndex: 0,
  setImageViewIndex: (_index: number): void => {
    _index;
  },
  imagesForImageView: [],
  setImagesForImageView: (_images: ImageViewImage[]): void => {
    _images;
  },
};

const ImageViewContext = createContext<ImageViewContextValues>(defaultContext);

const ImageViewProvider: FunctionComponent = ({ children }) => {
  const [imageViewVisible, setImageViewVisible] = useState(false);
  const [imageViewIndex, setImageViewIndex] = useState(0);
  const [imagesForImageView, setImagesForImageView] = useState<
    ImageViewImage[]
  >([]);

  return (
    <ImageViewContext.Provider
      value={{
        imageViewVisible,
        setImageViewVisible,
        imageViewIndex,
        setImageViewIndex,
        imagesForImageView,
        setImagesForImageView,
      }}
    >
      <ImageView
        visible={imageViewVisible}
        images={imagesForImageView}
        imageIndex={imageViewIndex}
        onRequestClose={(): void => {
          setImageViewVisible(false);
        }}
      />
      {children}
    </ImageViewContext.Provider>
  );
};

export { defaultContext, ImageViewContext, ImageViewContextValues };
export default ImageViewProvider;
