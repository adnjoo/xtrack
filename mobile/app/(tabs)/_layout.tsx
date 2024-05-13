import React from 'react';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Spending',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons name='attach-money' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome name='cog' size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
