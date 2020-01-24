import React, { FunctionComponent, ReactElement } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";
import { NavigationProps } from "../components/Router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
});

const takePicture = async (
  camera: RNCamera,
  onPictureTaken: (data: string | undefined) => any,
): Promise<void> => {
  const options = { quality: 0.5, base64: true };
  const data = await camera.takePictureAsync(options);
  const rawBase64 = data.base64;
  const base64Image = `data:image/jpeg;base64,${rawBase64}`;

  onPictureTaken(base64Image);
};

const Camera: FunctionComponent<NavigationProps> = ({ navigation }) => {
  const onPictureTaken = navigation.getParam("onPictureTaken", () => {
    console.error("must navigate with onPictureTaken function param");
  });
  return (
    <View style={styles.container}>
      <RNCamera style={styles.preview}>
        {({ camera, status }): ReactElement => {
          if (status !== "READY") {
            return <Text>Loading...</Text>;
          } else {
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={(): void => {
                    takePicture(camera, onPictureTaken);
                    navigation.goBack();
                  }}
                  style={styles.capture}
                >
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      </RNCamera>
    </View>
  );
};

export default Camera;
