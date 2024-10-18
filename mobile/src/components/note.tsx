import { useQuery } from '@tanstack/react-query';
import { Edit, Save, Trash } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, TextInput, View } from 'react-native';

import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Checkbox } from '@/src/components/ui/checkbox';
import { supabase } from '@/src/lib/supabase';

export const Note = ({ note }: { note: any }) => {
  const { refetch: refetchNotes } = useQuery({
    queryKey: ['notes'],
  });
  const { refetch: refetchPoints } = useQuery({
    queryKey: ['points'],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);

  const handleTrashClick = () => {
    if (note.done) {
      Alert.alert(
        'Delete Note',
        'Are you sure you want to delete this note and get a point?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => deleteNote(),
            style: 'destructive',
          },
        ]
      );
    } else {
      Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteNote(),
          style: 'destructive',
        },
      ]);
    }
  };

  const deleteNote = async () => {
    try {
      // Set the note's archived field to true instead of deleting the note
      const { error } = await supabase
        .from('notes')
        .update({ archived: true })
        .eq('id', note.id);
  
      if (error) throw error;
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      refetchNotes(); // Refetch notes after the update
      refetchPoints(); // Assuming you still want to refetch points for other functionality
    }
  };
  

  const markDone = async (noteId: string, done: boolean = true) => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({ done, done_date: new Date() })
        .eq('id', noteId);
      if (error) {
        Alert.alert('Error', error.message);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      refetchNotes();
    }
  };

  const saveEdit = async () => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({ title: editedTitle, updated_at: new Date() })
        .eq('id', note.id);
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setIsEditing(false);
        refetchNotes();
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Card key={note.id} className='my-1'>
      <CardHeader>
        {isEditing ? (
          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            style={{ borderBottomWidth: 1, borderColor: 'gray' }}
          />
        ) : (
          <CardTitle className={note.done ? 'line-through' : ''}>
            {note.title}
          </CardTitle>
        )}
        <CardDescription>
          {new Date(note.updated_at).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CardDescription>
        <View className='absolute right-2 top-2'>
          <Button className='bg-transparent' onPress={handleTrashClick}>
            <Trash color='red' />
          </Button>
          <Button
            className='bg-transparent'
            onPress={isEditing ? saveEdit : () => setIsEditing(true)}
          >
            {isEditing ? <Save color='green' /> : <Edit color='blue' />}
          </Button>
        </View>
      </CardHeader>
      <CardContent>
        <Checkbox
          checked={note.done}
          onCheckedChange={() => markDone(note.id, !note.done)}
        />
      </CardContent>
    </Card>
  );
};
