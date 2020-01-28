import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { Page } from "../../components/Page";

const LoadingMessage = (): ReactElement => {
  return (
    <Page>
      <View>
        <Text>Loading...</Text>
      </View>
    </Page>
  );
};

export default LoadingMessage;
