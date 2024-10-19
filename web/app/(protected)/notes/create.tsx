'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getSupabaseClient } from '@/utils/supabase/client';

export const CreateNote = () => {
  const supabase = getSupabaseClient();
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { refetch } = useQuery({
    queryKey: ['notes'],
  });

  const handleCreateNote = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase
      .from('notes')
      .insert({ title: newNoteTitle, done: false, user_id: user?.id });
    setNewNoteTitle('');
    setIsDialogOpen(false);
    refetch();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Create Note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Note</DialogTitle>
          <DialogDescription>
            Enter the details of your new note.
          </DialogDescription>
        </DialogHeader>
        <div className='my-4'>
          <Input
            type='text'
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            placeholder='Note title'
          />
        </div>
        <Button variant='outline' onClick={handleCreateNote}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};
