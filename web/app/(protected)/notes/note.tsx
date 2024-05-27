'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';

export const Note = ({ note }: { note: any }) => {
  const supabase = createClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [isDone, setIsDone] = useState(note.done);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    await supabase.from('notes').delete().eq('id', id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await supabase
      .from('notes')
      .update({ title: editedTitle })
      .eq('id', note.id);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(note.title);
    setIsEditing(false);
  };

  const handleToggleDone = async () => {
    const updatedStatus = !isDone;
    await supabase
      .from('notes')
      .update({ done: updatedStatus })
      .eq('id', note.id);
    setIsDone(updatedStatus);
  };

  return (
    <Card className='max-w-[350px]'>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          {isEditing ? (
            <Input
              type='text'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className='text-black'
            />
          ) : (
            <>
              <span
                className={cn('cursor-pointer', isDone && 'line-through')}
                onClick={handleToggleDone}
              >
                {note.title}
              </span>
              <span className='text-xs'>
                {new Date(note.updated_at).toLocaleString('fr-CH', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {/* Additional note details can go here */}
        </CardDescription>
      </CardContent>
      <CardFooter className='flex gap-4'>
        {isEditing ? (
          <>
            <Button variant='outline' onClick={handleSave}>
              Save
            </Button>
            <Button variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant='outline' onClick={handleEdit}>
              Edit
            </Button>
            <Button variant='outline' onClick={() => handleDelete(note.id)}>
              Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
