import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Button, Image } from "react-native";
import axios from "axios";
import React from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import AuthExample from "@/components/AuthExample";
import SignInWithOAuth from "@/components/SignInWithOAuth";
import { SignOut } from "@/components/SignOut";
import { tokenCache } from "@/lib/clerk";
import { CLERK_PUBLISHABLE_KEY } from "@/lib/utils";

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
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY as string}
    >
      <SafeAreaView style={styles.container}>
        <SignedIn>
          <Text>You are Signed in</Text>
          <SignOut />
          <Text>{data.title}</Text>
          <Text>{data.body}</Text>
          <StatusBar style="auto" />
          <Button title="Click" onPress={handleClick} />
        </SignedIn>

        <SignedOut>
          {/* TODO: find out how to share code between repos */}
          <Text>XTrack</Text>
          <Image style={{ width: 100, height: 100 }} source={require("./assets/logo.png")} />
          <SignInWithOAuth />
        </SignedOut>

        <AuthExample />
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
