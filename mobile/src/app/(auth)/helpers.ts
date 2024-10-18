import { Alert } from 'react-native';

import { supabase } from '@/src/lib/supabase';

const fetchName = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data.username;
};

const getNotes = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .neq('archived', true);

    if (error) throw error;

    return data;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  }
};

const getPoints = async (userId: string) => {
  const { data, error } = await supabase
    .from('points')
    .select()
    .eq('user_id', userId);

  const points = data?.[0]?.points || 0;
  return points;
};

const addNote = async (userId: string, content: string) => {
  try {
    await supabase
      .from('notes')
      .insert([{ title: content, done: false, user_id: userId }]);
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  }
};

export { fetchName, getNotes, getPoints, addNote };
