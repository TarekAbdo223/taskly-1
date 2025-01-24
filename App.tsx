import { StatusBar } from "expo-status-bar";
import {
  Alert,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./theme";
import { ShoppingListItem } from "./components/ShoppingListItem";

export default function App() {
  return (
    <View style={styles.container}>
      <ShoppingListItem name="Coffee" isCompleted />
      <ShoppingListItem name="Tea" />
      <ShoppingListItem name="Sugar" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    // alignItems: "center",
    justifyContent: "center",
  },
});
