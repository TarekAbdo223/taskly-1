import { StatusBar } from "expo-status-bar";
import {
  Alert,
  PixelRatio,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { Link } from "expo-router";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
};

const initialList: ShoppingListItemType[] = [
  { id: "1", name: "Coffe" },
  { id: "2", name: "Tea" },
  { id: "3", name: "Milk" },
];

export default function App() {
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>(initialList);

  const [val, setVal] = useState("");

  function handleInputs(inputText: string) {
    setVal(inputText);
    console.log(inputText);
  }

  function handleSubmit() {
    if (val) {
      const newShoppingList = [
        { id: new Date().toTimeString(), name: val },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setVal("");
    }
  }

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      {/* <Link
        href="/counter"
        style={{ textAlign: "center", fontSize: 24, marginBottom: 18 }}
      >
        Go To Counter Page
      </Link> */}
      <View style={styles.inputContaienr}>
        {/* <Text style={styles.label}>the Main input</Text> */}
        <TextInput
          placeholder="E.g. Coffee"
          style={styles.textInput}
          value={val}
          onChangeText={handleInputs}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      </View>
      {shoppingList.map((item) => (
        <ShoppingListItem name={item.name} key={item.id} />
      ))}
      {/* <ShoppingListItem name="Tea" />
      <ShoppingListItem name="Sugar" /> */}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    // alignItems: "center",
    // justifyContent: "center",
  },
  inputContaienr: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    padding: 12,
    borderRadius: 50,
    fontSize: 18,
    backgroundColor: theme.colorWhite,
  },
});
