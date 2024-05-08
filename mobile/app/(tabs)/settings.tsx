import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { A } from "@expo/html-elements";

import { SignOut } from "@/components/SignOut";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.description}>
        XTrack was created out of a need to better track finances, by{" "}
        <A href="https://bamboostud.io">Team Bamboo 🎋</A>.
      </Text>
      <SignOut />

      <SignedOut>
        <Redirect href="/login" />
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    color: "blue",
    fontSize: 18,
  },
});
