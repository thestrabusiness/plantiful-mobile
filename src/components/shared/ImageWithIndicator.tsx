import React, {useState, FunctionComponent} from "react";
import {ActivityIndicator, StyleSheet, StyleProp, View, ViewStyle} from "react-native";

import FastImage from "react-native-fast-image";

interface Props {
  source: string;
  imageStyle: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  indicatorStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

const ImageWithIndicator: FunctionComponent<Props> = ({source, imageStyle}) => {
  const [loading, setLoading] = useState(true);
  return (
    <View>
      {loading && <ActivityIndicator size="large" style={styles.indicatorStyle} />}
      <FastImage
        source={{uri: source}}
        style={imageStyle}
        onLoadEnd={(): void => {
          setLoading(false);
        }}
      />
    </View>
  );
};

export default ImageWithIndicator;
