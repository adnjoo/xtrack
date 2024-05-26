'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export const Note = ({ note }: { note: any }) => {
  const supabase = createClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);

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

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type='text'
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className='text-black'
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          {note.title}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => handleDelete(note.id)}>Delete</button>
        </>
      )}
    </div>
  );
};
