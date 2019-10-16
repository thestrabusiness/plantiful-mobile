import React, { ReactElement } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  View,
  StatusBar,
} from "react-native";

interface PageProps {
  style?: StyleProp<ViewStyle>;
  children: JSX.Element | JSX.Element[];
  testID?: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
});

const Page = ({ style, children, testID }: PageProps): ReactElement => (
  <>
    <StatusBar />
    <SafeAreaView style={styles.container}>
      <View style={[styles.page, style]} testID={testID}>
        {children}
      </View>
    </SafeAreaView>
  </>
);

export { Page };
