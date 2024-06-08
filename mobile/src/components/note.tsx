import { useQuery } from '@tanstack/react-query';
import { Trash } from 'lucide-react-native';
import { Alert } from 'react-native';

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
      if (note.done) {
        const points = await supabase
          .from('points')
          .select()
          .eq('user_id', note.user_id);
        if (points.data && points.data.length > 0) {
          await supabase
            .from('points')
            .update({ points: points.data[0].points + 1 })
            .eq('user_id', note.user_id);
        } else {
          await supabase
            .from('points')
            .insert({ user_id: note.user_id, points: 1 });
        }
      }
      const { error } = await supabase.from('notes').delete().eq('id', note.id);

      if (error) throw error;
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      refetchNotes();
      refetchPoints();
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

  return (
    <Card key={note.id} className='my-1'>
      <CardHeader>
        <CardTitle className={note.done ? 'line-through' : ''}>
          {note.title}
        </CardTitle>
        <CardDescription>
          {new Date(note.updated_at).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Checkbox
          checked={note.done}
          onCheckedChange={() => markDone(note.id, !note.done)}
        />
      </CardContent>
      <Button
        className='absolute right-2 top-2 bg-transparent'
        onPress={() => handleTrashClick(note.done)}
      >
        <Trash color='red' />
      </Button>
    </Card>
  );
};
