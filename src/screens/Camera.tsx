import React, { FunctionComponent, ReactElement } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";
import { NavigationProps } from "../components/Router";
import ImagePicker from "react-native-image-crop-picker";

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
  captureButton: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
  captureContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  captureText: { fontSize: 14 },
});

const takePicture = async (
  camera: RNCamera,
  onPictureTaken: (data: string | null) => any,
  cropSize: number,
): Promise<void> => {
  const options = {
    fixOrientation: true,
    forceUpOrientation: true,
  };
  const data = await camera.takePictureAsync(options);
  const uri = data.uri;

  ImagePicker.openCropper({
    path: uri,
    width: cropSize,
    height: cropSize,
    includeBase64: true,
  }).then(image => {
    const base64Image = `data:image/jpeg;base64,${image.data}`;
    onPictureTaken(base64Image);
  });
};

const Camera: FunctionComponent<NavigationProps> = ({ navigation }) => {
  const cropSize: number = navigation.getParam("cropSize", 400);
  const onPictureTaken = navigation.getParam("onPictureTaken", () => {
    console.error("must navigate with onPictureTaken function param");
  });

  return (
    <View style={styles.container}>
      <RNCamera style={styles.preview}>
        {({ camera, status }): ReactElement => {
          if (status !== "READY") {
            return <Text>Loading Camera...</Text>;
          } else {
            const takePictureAndGoBack = (): void => {
              takePicture(camera, onPictureTaken, cropSize).then(() => {
                navigation.goBack();
              });
            };

            return (
              <View style={styles.captureContainer}>
                <TouchableOpacity
                  onPress={takePictureAndGoBack}
                  style={styles.captureButton}
                >
                  <Text style={styles.captureText}> SNAP </Text>
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
