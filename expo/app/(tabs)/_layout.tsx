import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarButton: () => null }}
      />
      <Tabs.Screen
        name="two"
        options={{ title: "Two", tabBarButton: () => null }}
      />
    </Tabs>
  );
}
