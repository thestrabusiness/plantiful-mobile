import * as Spacing from "./spacing";

export const base = {
  borderColor: "black" as const,
  borderRadius: 5,
  borderWidth: 1,
  marginBottom: Spacing.base,
  padding: Spacing.base,
  width: "100%" as const,
};

export const singleLine = {
  ...base,
  height: 40,
};

export const multiLine = {
  ...base,
  height: 120,
};
