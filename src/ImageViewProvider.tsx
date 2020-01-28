import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from "react";

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
  setImageViewVisible: (_visible: boolean): void => {},
  imageViewIndex: 0,
  setImageViewIndex: (_index: number): void => {},
  imagesForImageView: [],
  setImagesForImageView: (_images: ImageViewImage[]): void => {},
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
