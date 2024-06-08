import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Auth from "@/components/auth";
import { View, Alert, Text } from "react-native";
import { Session } from "@supabase/supabase-js";
import { styles } from "./account";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (session) {
      getNotes();
    }
  }, [session]);

  async function getNotes() {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", session?.user.id);

      setNotes(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <View>{!session && !session?.user ? <Auth /> : null}</View>
      <View style={styles.verticallySpaced}>
        {notes.map((note) => (
          <View key={note.id}>
            <Text>{note.title}</Text>
          </View>
        ))}
      </View>
    </>
  );
}
