import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";
import axios from "axios";
import React from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import SignInWithOAuth from "./components/SignInWithOAuth";

const PK = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function App() {
  const [counter, setCounter] = React.useState(1);
  const [data, setData] = React.useState<any>("");

  React.useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${counter}`)
      .then((res) => {
        setData(res.data);
      });
  }, [counter]);

  const handleClick = () => {
    setCounter(counter + 1);
  };

  return (
    <ClerkProvider publishableKey={PK as string}>
      <SafeAreaView style={styles.container}>
        <SignedIn>
          <Text>You are Signed in</Text>
        </SignedIn>
        <SignedOut>
          <SignInWithOAuth />
        </SignedOut>


        <Text>{data.title}</Text>
        <Text>{data.body}</Text>
        <StatusBar style="auto" />
        <Button title="Click" onPress={handleClick} />
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
