import React, { FunctionComponent } from "react";
import { Text, View, StyleSheet } from "react-native";

import { CheckIn } from "../../api/Types";
import ImageStrip from "../shared/ImageStrip";

import { Outline, Spacing, Shadow } from "../../styles";

interface Props {
  checkIn: CheckIn;
}

const styles = StyleSheet.create({
  checkInRow: {
    backgroundColor: "white",
    borderRadius: Outline.borderRadiusMedium,
    padding: 10,
    marginBottom: 10,
    ...Outline.base,
    ...Shadow.dropShadowSharp,
  },
  checkInRowItem: {
    marginVertical: Spacing.smallest,
  },
});

const CheckInListItem: FunctionComponent<Props> = ({ checkIn }) => {
  const createdAtDate = new Date(checkIn.created_at * 1000);

  return (
    <View key={checkIn.id} style={styles.checkInRow}>
      <Text style={styles.checkInRowItem}>{createdAtDate.toDateString()}</Text>
      <ImageStrip imageUris={checkIn.photo_urls} />
      {checkIn.watered && <Text style={styles.checkInRowItem}>Watered</Text>}
      {checkIn.fertilized && (
        <Text style={styles.checkInRowItem}>Fertilized</Text>
      )}
      <Text style={styles.checkInRowItem}>{checkIn.notes}</Text>
    </View>
  );
};

export default CheckInListItem;
