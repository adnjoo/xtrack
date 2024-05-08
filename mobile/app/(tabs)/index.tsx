import React from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import axios from "axios";

import { SignOut } from "@/components/SignOut";

export default function Home() {
  const [data, setData] = React.useState<any[]>([]);
  const { getToken, isSignedIn } = useAuth();

  React.useEffect(() => {
    if (isSignedIn) {
      fetchExpenses();
    }
  }, [isSignedIn]);

  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/expenses` as string,
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      const sortedData = data.sort(
        (a: any, b: any) => +new Date(b.date) - +new Date(a.date)
      );

      setData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SignedIn>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.signedInContainer}>
            {data.map((item) => (
              <View key={item.id} style={styles.expenseItem}>
                <Text style={styles.expenseTitle}>{item.title}</Text>
                <Text style={styles.expenseCategory}>{item.category}</Text>
                <Text style={styles.expenseAmount}>${item.amount}</Text>
                <Text style={styles.expenseDate}>
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
            ))}
            <SignOut />
          </View>
        </ScrollView>
        <StatusBar />
      </SignedIn>

      <SignedOut>
        <Redirect href="/login" />
      </SignedOut>
    </SafeAreaView>
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
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  signedInText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  expenseItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  expenseCategory: {
    fontSize: 14,
    marginBottom: 5,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expenseDate: {
    fontSize: 12,
    color: "#666",
  },
});
