import React, { FunctionComponent } from "react";
import { Text, View, StyleSheet } from "react-native";

import { CheckIn, PhotoUrl } from "../../api/Types";
import ImageStrip from "../shared/ImageStrip";

interface Props {
  checkIn: CheckIn;
}

const styles = StyleSheet.create({
  checkInRow: {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  checkInRowItem: {
    marginVertical: 3,
  },
});

const CheckInListItem: FunctionComponent<Props> = ({ checkIn }) => {
  const createdAtDate = new Date(checkIn.created_at * 1000);
  const imagePreviewUris = checkIn.photo_urls.map((photoUrl: PhotoUrl) => {
    return photoUrl.preview;
  });

  return (
    <View key={checkIn.id} style={styles.checkInRow}>
      <Text style={styles.checkInRowItem}>{createdAtDate.toDateString()}</Text>
      <ImageStrip imageUris={imagePreviewUris} />
      {checkIn.watered && <Text style={styles.checkInRowItem}>Watered</Text>}
      {checkIn.fertilized && (
        <Text style={styles.checkInRowItem}>Fertilized</Text>
      )}
      <Text style={styles.checkInRowItem}>{checkIn.notes}</Text>
    </View>
  );
};

export default CheckInListItem;
