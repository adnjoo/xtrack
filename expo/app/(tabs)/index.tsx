import React from "react";
import { StatusBar, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Link } from "expo-router";

import AuthExample from "@/components/AuthExample";
import SignInWithOAuth from "@/components/SignInWithOAuth";
import { SignOut } from "@/components/SignOut";
import { tokenCache } from "@/lib/clerk";
import { CLERK_PUBLISHABLE_KEY } from "@/lib/utils";

export default function Home() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY as string}
    >
      <SafeAreaView style={styles.container}>
        <SignedIn>
          <View style={styles.signedInContainer}>
            <Text style={styles.signedInText}>You are Signed in</Text>
            <Link href="two">Go to Tab Two</Link>
            <SignOut />
          </View>
          <StatusBar />
        </SignedIn>

        <SignedOut>
          <View style={styles.signedOutContainer}>
            <Text style={styles.appName}>XTrack</Text>
            <SignInWithOAuth />
          </View>
        </SignedOut>

        <AuthExample />
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
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
  },
  signedOutContainer: {
    alignItems: "center",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});
