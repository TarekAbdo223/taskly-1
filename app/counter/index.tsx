import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Duration, intervalToDuration, isBefore } from "date-fns";
import { TimeSegment } from "../../components/TimeSegment";
import { getFromStorage } from "../../utils/storage";

// 10 secodns later *from when i load the app*
const frequency = 10 * 1000;

type countdownStorageKey = "taskly-countdown";

type PresistedCountdownState = {
  currentNotificationId: string | undefined;
  completedAtTimestamps: number[];
};

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  //   const router = useRouter();
  const [countdownState, setCountdownState] =
    useState<PresistedCountdownState>();
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });
  console.log(status);
  // const [secondsElapsed, setSecondElapsed] = useState(0);

  const lastCompletedTimestamp = countdownState?.completedAtTimestamps[0];

  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      setCountdownState(value);
    };
    init();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(lastCompletedTimestamp, Date.now());
      // false or true
      const distance = intervalToDuration(
        isOverdue
          ? { start: lastCompletedTimestamp, end: Date.now() }
          : {
              start: Date.now(),
              end: lastCompletedTimestamp,
            }
      );
      setStatus({ isOverdue, distance });
      // setSecondElapsed((prevState) => prevState + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {/* <Text>{secondsElapsed}</Text> */}
      {status.isOverdue ? (
        <Text
          style={[
            styles.heading,
            status.isOverdue ? styles.whiteText : undefined,
          ]}
        >
          Thing overdue by
        </Text>
      ) : (
        <Text
          style={[
            styles.heading,
            status.isOverdue ? styles.whiteText : undefined,
          ]}
        >
          Thing due in...
        </Text>
      )}
      <View style={styles.row}>
        <TimeSegment
          unit="Days"
          number={status.distance.days ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Hours"
          number={status.distance.hours ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Minutes"
          number={status.distance.minutes ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Seconds"
          number={status.distance.seconds ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.8}
        onPress={scheduleNotification}
      >
        <Text style={styles.buttonText}>I've done the thing!</Text>
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
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    // textTransform: "uppercase",
    textAlign: "center",
  },
  containerLate: {
    backgroundColor: theme.colorRed,
  },
  whiteText: {
    color: theme.colorWhite,
    backgroundColor: theme.colorWhite,
  },
});
