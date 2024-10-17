'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { API_URL } from '@/components/Login';
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

export default function Page() {
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { refetch } = useQuery({
    queryKey: ['notes'],
  });

  const handleCreateNote = async () => {
    try {
      const response = await fetch(`${API_URL}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          note: {
            title: newNoteTitle,
            done: false, // Default to false on creation
          },
        }),
        credentials: 'include', // This ensures that cookies (session) are sent with the request
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors || 'Failed to create note');
      }

      // Clear form and close dialog on success
      setNewNoteTitle('');
      setIsDialogOpen(false);
      refetch(); // Refetch notes to update the list
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the note');
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
      <DialogTrigger asChild>
        <Button variant='outline' className='mt-24'>Create Note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Note</DialogTitle>
          <DialogDescription>
            Enter the title of your new note.
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
}
