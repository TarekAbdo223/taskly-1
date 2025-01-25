import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

type Props = {
  name?: string;
  isCompleted?: boolean;
  onDelete?: () => void;
  onToggleCompleted?: () => void;
};

export function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onToggleCompleted,
}: Props) {
  const HandleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => onDelete(),
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
    <Pressable
      onPress={onToggleCompleted}
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedCotainer : undefined,
      ]}
    >
      <View style={styles.row}>
        <Entypo
          name={isCompleted ? "check" : "circle"}
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorCerulean}
        />
        <Text
          style={[
            styles.itemText,
            isCompleted ? styles.completedText : undefined,
          ]}
        >
          {name}
        </Text>
      </View>
      <TouchableOpacity onPress={HandleDelete} activeOpacity={0.8}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulean,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  completedCotainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  itemText: { fontSize: 18, fontWeight: "200", flex: 1 },

  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
});
