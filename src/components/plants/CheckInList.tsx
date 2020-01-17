import React, { FunctionComponent } from "react";
import { Text, View, StyleSheet } from "react-native";

import { CheckIn } from "../api/Types";

const styles = StyleSheet.create({
  checkInHeader: {
    fontSize: 18,
    marginVertical: 10,
  },
  checkInRow: {
    marginBottom: 10,
  },
});

interface Props {
  checkIns: CheckIn[];
}

const CheckInList: FunctionComponent<Props> = ({ checkIns }) => {
  return (
    <View>
      <Text style={styles.checkInHeader}>Latest Check-ins:</Text>
      {checkIns.map((checkIn: CheckIn) => {
        const createdAtDate = new Date(checkIn.created_at * 1000);
        return (
          <View key={checkIn.id} style={styles.checkInRow}>
            <Text>{createdAtDate.toDateString()}</Text>
            {checkIn.watered && <Text>Watered</Text>}
            {checkIn.fertilized && <Text>Fertilized</Text>}
            <Text>{checkIn.notes}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default CheckInList;
