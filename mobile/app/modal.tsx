import { View, Text, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function Modal() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  const handleAddExpense = async () => {
    try {
      if (!title || !amount) {
        Alert.alert('Please fill in all fields.');
        return;
      }

      const { data, error, status } = await supabase.from('expenses').insert([
        {
          title,
          amount: parseFloat(amount),
          user_id: session?.user.id,
          date: new Date(),
        },
      ]);

      if (error) {
        throw error;
      }

      if (status === 201) {
        Alert.alert('Expense added successfully.');
        setTitle('');
        setAmount('');
        router.replace('/');
      }
    } catch (error: any) {
      Alert.alert('Error adding expense:', error.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add Expense</Text>
      <TextInput
        placeholder='Title'
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          marginVertical: 10,
          width: 200,
        }}
      />
      <TextInput
        placeholder='Amount'
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType='numeric'
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          marginVertical: 10,
          width: 200,
        }}
      />
      <Button title='Add Expense' onPress={handleAddExpense} />
    </View>
  );
}
