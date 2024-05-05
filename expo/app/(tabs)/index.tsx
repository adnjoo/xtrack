import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function TabOneScreen() {
  return (
    <View>
      <Text>Tab One</Text>
      <Link href="/two">Go to Tab Two</Link>
    </View>
  );
}
