import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { A } from "@expo/html-elements";
import { useAuth } from "@clerk/clerk-expo";

export default function Settings() {
  const { userId, isSignedIn } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.description}>
        {isSignedIn ? `Signed in as ${userId}` : "Not signed in"}
      </Text>
      <Text style={styles.description}>
        XTrack was created out of a need to better track finances, by{" "}
        <A href="https://bamboostud.io">Team Bamboo 🎋</A>.
      </Text>
      <Link href="/" style={styles.link}>
        Go to Home
      </Link>
    </View>
  );
};

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
