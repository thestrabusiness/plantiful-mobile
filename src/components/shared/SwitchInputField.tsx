import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import { Text, View, Switch } from "react-native";

interface SwitchInputProps {
  label: string;
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
}

const SwitchInputField: FunctionComponent<SwitchInputProps> = ({
  label,
  value,
  setValue,
}) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Switch
        value={value}
        onValueChange={(newValue: boolean): void => {
          setValue(newValue);
        }}
      />
      <Text>{label}</Text>
    </View>
  );
};

export default SwitchInputField;
