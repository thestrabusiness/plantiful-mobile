import React, { FunctionComponent, ReactElement } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import { OptionalNavigation, NavigationProps } from "../Router";
import Icon from "react-native-vector-icons/Octicons";

const styles = StyleSheet.create({
  backArrow: { marginRight: 8, color: "royalblue" },
  backButton: {
    alignItems: "center",
    flexDirection: "row",
  },
  backText: { fontSize: 18, color: "royalblue" },
  container: {
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  innerSection: { flex: 2 },
  outerSection: { flex: 1 },
  titleContainer: { alignSelf: "center", justifyContent: "center" },
  titleText: { fontSize: 24, textAlign: "center" },
});

interface HeaderProps extends OptionalNavigation {
  title?: string;
  leftElement?: ReactElement;
}

const backButton: FunctionComponent<NavigationProps> = ({ navigation }) => {
  const onPress = (): void => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Icon name="chevron-left" size={30} style={styles.backArrow} />
      <Text style={styles.backText}>Back</Text>
    </TouchableOpacity>
  );
};

const Header: FunctionComponent<HeaderProps> = ({
  navigation = undefined,
  title,
  leftElement,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.outerSection}>
        {leftElement || (navigation && backButton({ navigation }))}
      </View>
      <View style={styles.innerSection}>
        {title && <Text style={styles.titleText}>{title}</Text>}
      </View>
      <View style={styles.outerSection} />
    </View>
  );
};

export default Header;
