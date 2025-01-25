import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function CounterScreen() {
  //   const router = useRouter();
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => router.navigate("/idea")}>
        <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 18 }}>
          Go To Idea
        </Text>
      </TouchableOpacity> */}

      <Text style={styles.text}>Counter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
  },
});
