'use client';

import { useQuery } from '@tanstack/react-query';
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

import { Checkbox } from './ui/checkbox';

export function LoadingNote() {
  return (
    <Card className='h-[188px] w-[320px] animate-pulse bg-slate-300'></Card>
  );
}

export const Note = ({ note }: { note: any }) => {
  const supabase = createClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [isDone, setIsDone] = useState(note.done);

  const { refetch } = useQuery({
    queryKey: ['notes'],
  });

  const handleDelete = async (id: number) => {
    if (note.done) {
      if (
        !window.confirm(
          'Are you sure you want to delete this note and get a point?'
        )
      ) {
        return;
      }
        await supabase
          .from('notes').update({archived: true}).eq('id', id);
    }
    if (!note.done) {
      if (!window.confirm('Are you sure you want to delete this note?')) {
        await supabase.from('notes').delete().eq('id', id);
      }
    }
    refetch();
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
    refetch();
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
    refetch();
  };

  return (
    <Card className='w-[320px]'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          {isEditing ? (
            <Input
              type='text'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className='text-black'
            />
          ) : (
            <div className='flex flex-row justify-between w-full'>
              <div className='flex flex-col'>
                <span className={cn('text-xl', isDone && 'line-through')}>
                  {note.title}
                </span>
                <span className='mt-1 text-xs'>
                  {new Date(note.updated_at).toLocaleString('fr-CH', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </span>
              </div>
              <Checkbox
                checked={isDone}
                onCheckedChange={handleToggleDone}
                className='ml-auto'
              />
            </div>
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
