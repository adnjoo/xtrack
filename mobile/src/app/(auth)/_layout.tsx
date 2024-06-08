import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='notes'
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='sticky-note' color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='account'
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='user' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
