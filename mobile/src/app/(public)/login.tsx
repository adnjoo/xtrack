import { Input } from '@rneui/themed';
import React, { useState } from 'react';
import { Alert, AppState, Text, View } from 'react-native';

import { Button } from '@/src/components/ui/button';
import { supabase } from '@/src/lib/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View className='mt-24 p-3'>
      <Text className='mx-2 mb-10 text-xl font-bold'>
        Login to see your notes
      </Text>
      <View className='mt-5 py-1'>
        <Input
          label='Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder='email@address.com'
          autoCapitalize='none'
        />
        <Input
          label='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder='Password'
          autoCapitalize='none'
        />
      </View>
      <View className='mt-5 gap-4 py-1'>
        <Button disabled={loading} onPress={() => signInWithEmail()}>
          <Text className='text-white'>Sign in</Text>
        </Button>
        <Button disabled={loading} onPress={() => signUpWithEmail()}>
          <Text className='text-white'>Sign up</Text>
        </Button>
      </View>
    </View>
  );
}
