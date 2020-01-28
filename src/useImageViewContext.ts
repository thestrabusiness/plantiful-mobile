import { useContext } from "react";

import { ImageViewContext, ImageViewContextValues } from "./ImageViewProvider";

const useImageViewContext = (): ImageViewContextValues => {
  return useContext<ImageViewContextValues>(ImageViewContext);
};

export default useImageViewContext;
