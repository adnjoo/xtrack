import React from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import axios from "axios";

import { SignOut } from "@/components/SignOut";

export default function Home() {
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.EXPO_PUBLIC_API_URL as string
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SignedIn>
        <View style={styles.signedInContainer}>
          <Text style={styles.signedInText}>You are Signed in</Text>
          <Text>{message}</Text>
          <SignOut />
        </View>
        <StatusBar />
      </SignedIn>

      <SignedOut>
        <Redirect href="/login" />
      </SignedOut>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  signedInContainer: {
    alignItems: "center",
  },
  signedInText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  }
});
