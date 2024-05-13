'use client';

import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { useAuth } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/client';

type Note = {
  id: string;
  title: string;
  user_id: string;
};

export default function Page() {
  const supabase = createClient();
  const { user } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newEditNoteTitle, setNewEditNoteTitle] = useState('');
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

    setLoading(false);
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
    <div className='mx-auto max-w-4xl p-4'>
      <h1 className='mb-4 text-3xl font-bold'>Notes</h1>
      <div className='mb-4'>
        <input
          type='text'
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          placeholder='Enter note title'
          className='mr-2 rounded border p-2'
        />
        <button
          onClick={addNote}
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
        >
          Add Note
        </button>
      </div>
      <div>
        <h2 className='mb-4 text-2xl font-bold'>All Notes</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {notes.map((note) => (
              <li key={note.id} className='mb-2'>
                {editNoteId === note.id ? (
                  <>
                    <input
                      type='text'
                      value={newEditNoteTitle}
                      onChange={(e) => setNewEditNoteTitle(e.target.value)}
                      className='mr-2 rounded border p-2'
                    />
                    <button
                      onClick={() => editNote(note.id)}
                      className='mr-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditNoteId(null)}
                      className='rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600'
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className='mr-2'>{note.title}</span>
                    <button
                      onClick={() => handleEdit(note.id)}
                      className='mr-2 rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
