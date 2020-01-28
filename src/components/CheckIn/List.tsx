import React, { FunctionComponent } from "react";
import { Text, View, StyleSheet } from "react-native";

import { CheckIn } from "../../api/Types";
import CheckInListItem from "./ListItem";

const styles = StyleSheet.create({
  checkInHeader: {
    fontSize: 18,
    marginVertical: 10,
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
        return <CheckInListItem key={checkIn.id} checkIn={checkIn} />;
      })}
    </View>
  );
};

export default CheckInList;
