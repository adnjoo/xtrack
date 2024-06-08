import { useQuery } from '@tanstack/react-query';
import { CirclePlus } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import { Alert } from 'react-native';

import { addNote } from '@/src/app/(auth)/helpers';
import { useSession } from '@/src/app/context/SessionProvider';
import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';

const AddNoteDialog = () => {
  const session = useSession();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const { refetch: refetchNotes } = useQuery({
    queryKey: ['notes'],
  });

  const handleAddNote = async () => {
    if (newNoteContent.trim() === '') {
      Alert.alert('Note content cannot be empty');
      return;
    }

    await addNote(session?.user?.id as string, newNoteContent);
    setNewNoteContent('');
    setIsAddingNote(false);

    refetchNotes();
  };

  return (
    <Dialog open={isAddingNote}>
      <DialogTrigger asChild>
        <Button variant='outline' onPress={() => setIsAddingNote(true)}>
          <CirclePlus size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription>Enter your note content below:</DialogDescription>
        </DialogHeader>
        <TextInput
          value={newNoteContent}
          onChangeText={(text) => setNewNoteContent(text)}
          placeholder='Enter your note here...'
          className='mb-3 rounded-sm border border-gray-300 p-3'
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button onPress={() => setIsAddingNote(false)}>
              <Text className='text-white'>Cancel</Text>
            </Button>
          </DialogClose>
          <Button onPress={handleAddNote}>
            <Text className='text-white'>Save</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;
