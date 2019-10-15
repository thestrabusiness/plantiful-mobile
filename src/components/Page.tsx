import React from "react";
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
  children: JSX.Element;
  testID?: string;
}

const Page = ({ style, children, testID }: PageProps) => (
  <>
    <StatusBar />
    <SafeAreaView style={styles.container}>
      <View style={[styles.page, style]} testID={testID}>
        {children}
      </View>
    </SafeAreaView>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
});

export { Page };
