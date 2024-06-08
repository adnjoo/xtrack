import { Input } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { useSession } from '@/src/app/context/SessionProvider';
import { Button } from '@/src/components/ui/button';
import { supabase } from '@/src/lib/supabase';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const session = useSession();
  const { refetch: refetchName } = useQuery({
    queryKey: ['name'],
  });

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
    enabled: !!session,
  });

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        return data;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username }: { username: string }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
      refetchName();
    }
  }

  return (
    <View className='mt-10 p-3'>
      <Input label='Email' value={session?.user?.email} disabled />
      <Input
        label='Username'
        value={username || ''}
        onChangeText={(text) => setUsername(text)}
      />

      <View className='mx-4 gap-4'>
        <Button onPress={() => updateProfile({ username })} disabled={loading}>
          <Text className='text-white'>
            {loading ? 'Loading ...' : 'Update'}
          </Text>
        </Button>

        <Button onPress={() => supabase.auth.signOut()}>
          <Text className='text-white'>Sign out</Text>
        </Button>
      </View>
    </View>
  );
}
