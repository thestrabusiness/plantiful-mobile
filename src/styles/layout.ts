import { Dimensions } from "react-native";
import * as Spacing from "./spacing";

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export const drawerWidth = 300;

export const centeredContent = {
  alignItems: "center" as const,
  height: "100%",
  justifyContent: "center" as const,
  paddingHorizontal: 10,
};

export const paddingHorizontal = {
  paddingHorizontal: Spacing.base,
};
