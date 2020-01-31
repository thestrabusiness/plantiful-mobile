import React, { FunctionComponent } from "react";
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
  testID?: string;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
});

const Page: FunctionComponent<PageProps> = ({
  style,
  children,
  testID,
}: PageProps) => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View style={[styles.page, style]} testID={testID}>
          {children}
        </View>
      </SafeAreaView>
    </>
  );
};

export { Page };
