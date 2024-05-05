import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function TabOneScreen() {
  return (
    <View>
      <Text>Tab Two</Text>
      <Link href="/">Go to Tab One</Link>
    </View>
  );
}
