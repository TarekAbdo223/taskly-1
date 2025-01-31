import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
export default function CounterScreen() {
  //   const router = useRouter();

  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    console.log(result);
    if (result === "granted") {
      console.log(Notifications.scheduleNotificationAsync);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "I'm a notification from your app! 📨",
          body: "This is a test notification.",
        },
        trigger: { seconds: 5, repeats: false, type: "timeInterval" },
      });
    } else {
      if (Device.isDevice) {
        Alert.alert(
          "Unable to schedule notification",
          "Enable the notofication permission for Expo Go in settings"
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.8}
        onPress={scheduleNotification}
      >
        <Text style={styles.buttonText}>Schedule notification</Text>
      </TouchableOpacity>
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
  buttonContainer: {
    backgroundColor: theme.ColorBalck,
    borderRadius: 6,
    padding: 12,
  },
  buttonText: {
    fontWeight: "bold",
    color: theme.colorWhite,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
