import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";

type Props = {
  name?: string;
  isCompleted?: boolean;
};

export function ShoppingListItem({ name, isCompleted }: Props) {
  const HandleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => {
            console.log("Ok", "deleting");
          },
          style: "destructive",
        },
        {
          text: "No",
          onPress: () => console.log("Cancel", "cancelled"),
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedCotainer : undefined,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {name}
      </Text>
      <TouchableOpacity
        style={[
          styles.deleteButton,
          isCompleted ? styles.completedButton : undefined,
        ]}
        onPress={HandleDelete}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText]}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulean,
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedCotainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  itemText: { fontSize: 18, fontWeight: "200" },
  deleteButton: {
    backgroundColor: theme.ColorBalck,
    padding: 8,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  completedButton: {
    backgroundColor: theme.colorGrey,
    // borderBottomColor: theme.colorLightGrey,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey,
  },
});
