import { StyleSheet, View, Alert, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { Expense } from '@/types/supabase';
import { supabase } from '../lib/supabase';

const Expenses = ({ session }: { session: Session }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  async function getExpenses() {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('expenses')
        .select()
        .eq('user_id', session?.user.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setExpenses(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses:</Text>
      <View style={styles.expenseList}>
        {expenses.map((expense) => (
          <View key={expense.id} style={styles.expenseItem}>
            <Text style={styles.expenseTitle}>{expense.title}</Text>
            <Text style={styles.expenseDetails}>Amount: {expense.amount}</Text>
            {expense.category && (
              <Text style={styles.expenseDetails}>
                Category: {expense.category}
              </Text>
            )}
            <Text style={styles.expenseDetails}>
              Date: {new Date(expense.date).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  expenseList: {
    width: '100%',
  },
  expenseItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  expenseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  expenseDetails: {
    fontSize: 16,
    marginBottom: 3,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default Expenses;
