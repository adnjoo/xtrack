import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

import SignInWithOAuth from "@/components/SignInWithOAuth";
import { styles as indexStyles } from ".";

export default function LoginScreen() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/" />;
  }
  return (
    <View style={indexStyles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <Text style={styles.appName}>XTrack</Text>
      <SignInWithOAuth />
    </View>
  );
}

const styles = StyleSheet.create({
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
