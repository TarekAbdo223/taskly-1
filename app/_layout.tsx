import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { theme } from "../theme";
export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.ColorBalck }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Shopping List",
          tabBarActiveTintColor: "blue",
          tabBarIcon: () => {
            return <Feather name="list" size={24} color="black" />;
          },
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: "Coutner",
          headerShown: false,
          tabBarIcon: ({ size, color }) => {
            return <AntDesign name="clockcircleo" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{
          title: "Idea",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome6 name="lightbulb" size={24} color="black" />;
          },
        }}
      />
    </Tabs>
  );
}
