'use client';

import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/client';
import { useUser } from '@/utils/hooks/useUser';

type Note = {
  id: string;
  title: string;
  user_id: string;
};

export default function Page() {
  const supabase = createClient();
  const user: User | null = useUser();

  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newEditNoteTitle, setNewEditNoteTitle] = useState('');
  const [editNoteId, setEditNoteId] = useState<string | null>(null);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select()
      .eq('user_id', user?.id);
    if (error) {
      console.error('Error fetching notes:', error.message);
    } else {
      setNotes(data || []);
    }
  };

  const addNote = async () => {
    if (newNoteTitle.trim() === '') {
      alert('Please enter a note title');
      return;
    }

    const { data, error } = await supabase
      .from('notes')
      .insert([{ title: newNoteTitle, user_id: user?.id }]);
    if (error) {
      console.error('Error adding note:', error.message);
    } else {
      console.log('Note added successfully:', data);
      setNewNoteTitle('');
      fetchNotes();
    }
  };

  const editNote = async (noteId: string) => {
    const { error } = await supabase
      .from('notes')
      .update({ title: newEditNoteTitle })
      .eq('id', noteId);

    if (error) {
      console.error('Error updating note:', error.message);
    } else {
      console.log('Note updated successfully');
      setEditNoteId(null);
      fetchNotes();
    }
  };

  const deleteNote = async (noteId: string) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    const { error } = await supabase.from('notes').delete().eq('id', noteId);
    if (error) {
      console.error('Error deleting note:', error.message);
    } else {
      console.log('Note deleted successfully');
      fetchNotes();
    }
  };

  const handleEdit = (id: string) => {
    setEditNoteId(id);
    setNewEditNoteTitle(notes.find((note) => note.id === id)?.title || '');
  };

  useEffect(() => {
    if (!user) return;
    fetchNotes();
  }, [user]);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <input
          type='text'
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          placeholder='Enter note title'
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <div>
        <h2>All Notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              {editNoteId === note.id ? (
                <>
                  <input
                    type='text'
                    value={newEditNoteTitle}
                    onChange={(e) => setNewEditNoteTitle(e.target.value)}
                  />
                  <button onClick={() => editNote(note.id)}>Save</button>
                </>
              ) : (
                <>
                  {note.title}
                  <button onClick={() => handleEdit(note.id)}>Edit</button>
                  <button onClick={() => deleteNote(note.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
