import { StatusBar } from "expo-status-bar";
import { Alert, PixelRatio, Pressable, StyleSheet, View } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Link
        href="/counter"
        style={{ textAlign: "center", fontSize: 24, marginBottom: 18 }}
      >
        Go To Counter Page
      </Link> */}
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
