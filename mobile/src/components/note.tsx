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
  const handleTrashClick = () => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => deleteNote(note.id),
        style: 'destructive',
      },
    ]);
  };
  const deleteNote = async (noteId: string) => {
    try {
      const { error } = await supabase.from('notes').delete().eq('id', noteId);

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
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>
          {new Date(note.updated_at).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Checkbox checked={note.done} onCheckedChange={() => {}} />
      </CardContent>
      <Button
        className='absolute right-2 top-2 bg-transparent'
        onPress={handleTrashClick}
      >
        <Trash color='red' />
      </Button>
    </Card>
  );
};
