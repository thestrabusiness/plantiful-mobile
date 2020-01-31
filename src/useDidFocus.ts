import React, { useEffect } from "react";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";

const useDidFocus = (
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  callback: () => void,
): void => {
  useEffect(() => {
    const focusListener = navigation.addListener("didFocus", () => {
      callback();
    });

    return (): void => {
      focusListener.remove();
    };
  }, []);
};

export default useDidFocus;
