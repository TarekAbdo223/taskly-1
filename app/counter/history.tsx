import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { countdownStorageKey, PresistedCountdownState } from ".";
import { getFromStorage } from "../../utils/storage";
import { format } from "date-fns";
import { theme } from "../../theme";

const fullDateFormat = "LLL d yyyy, h:mm aaa";

export default function history() {
  const [counddownState, setCountdownState] =
    useState<PresistedCountdownState>();

  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      if (value) {
        setCountdownState(value);
      } else {
        console.log("No countdown state found");
      }
    };
    init();
  }, []);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      data={counddownState?.completedAtTimestamps}
      ListEmptyComponent={() => {
        return (
          <View style={styles.listEmptyContainer}>
            <Text>No History</Text>
          </View>
        );
      }}
      renderItem={({ item }) => {
        return (
          <View style={styles.listItem}>
            <Text style={styles.text}>{format(item, fullDateFormat)}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    // marginTop: 8,
  },
  contentContainer: {
    marginTop: 8,
  },
  listItem: {
    backgroundColor: theme.colorLightGrey,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  listEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});
