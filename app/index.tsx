import { StatusBar } from "expo-status-bar";
import {
  Alert,
  FlatList,
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
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

const storageKey = "shopping-list";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp?: number;
};

// const initialList: ShoppingListItemType[] = [
//   { id: "1", name: "Coffe" },
//   { id: "2", name: "Tea" },
//   { id: "3", name: "Milk" },
// ];

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);

  const [val, setVal] = useState("");

  function handleInputs(inputText: string) {
    setVal(inputText);
    console.log(inputText);
  }

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);
      if (data) {
        setShoppingList(data);
      }
    };
    fetchInitial();
  }, []);

  function handleSubmit() {
    if (val) {
      const newShoppingList = [
        {
          id: new Date().toTimeString(),
          name: val,
          lastUpdatedTimestamp: Date.now(),
        },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      saveToStorage(storageKey, shoppingList);
      setVal("");
    }
  }

  function handleDelete(id: string) {
    const newShoppiongList = shoppingList.filter((item) => item.id !== id);
    saveToStorage(storageKey, shoppingList);
    setShoppingList(newShoppiongList);
  }

  function handleToggleCompleted(id: string) {
    const newShoppingList = shoppingList.map((item) =>
      item.id === id
        ? {
            ...item,
            lastUpdatedTimestamp: Date.now(),

            completedAtTimestamp: item.completedAtTimestamp
              ? undefined
              : Date.now(),
          }
        : item
    );
    saveToStorage(storageKey, newShoppingListr);

    setShoppingList(newShoppingList);
  }

  return (
    <FlatList
      style={styles.container}
      stickyHeaderIndices={[0]}
      data={orderShoppingList(shoppingList)}
      ListEmptyComponent={() => {
        return (
          <View style={styles.listEmptyContainer}>
            <Text>Your shopping list is empty!</Text>
          </View>
        );
      }}
      ListHeaderComponent={
        <View style={styles.inputContaienr}>
          <TextInput
            placeholder="E.g. Coffee"
            style={styles.textInput}
            value={val}
            onChangeText={handleInputs}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        </View>
      }
      renderItem={({ item }) => {
        return (
          <ShoppingListItem
            name={item.name}
            onDelete={() => handleDelete(item.id)}
            onToggleCompleted={() => handleToggleCompleted(item.id)}
            isCompleted={Boolean(item.completedAtTimestamp)}
          />
        );
      }}
    />
  );
}

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return item2.completedAtTimestamp - item1.completedAtTimestamp;
    }

    if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return 1;
    }

    if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return -1;
    }

    if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
    }

    return 0;
  });
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
  listEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});
