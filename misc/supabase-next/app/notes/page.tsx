'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

// TODO: types
type Note = {
  id: string;
  title: string;
  user_id: string;
}

export default function Page() {
  const supabase = createClient();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');

  // Function to fetch notes from Supabase
  const fetchNotes = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

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

  // Function to handle note submission
  const addNote = async () => {
    if (newNoteTitle.trim() === '') {
      alert('Please enter a note title');
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('notes')
      .insert([{ title: newNoteTitle, user_id: user?.id }]);
    if (error) {
      console.error('Error adding note:', error.message);
    } else {
      console.log('Note added successfully:', data);
      setNewNoteTitle(''); // Clear input field after adding note
      fetchNotes(); // Refresh notes list after adding a new note
    }
  };

  // Handle input change for new note title
  const handleInputChange = (event: any) => {
    setNewNoteTitle(event.target.value);
  };

  // Initial fetch of notes when component mounts
  useEffect(() => {
    fetchNotes();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <input
          type='text'
          value={newNoteTitle}
          onChange={handleInputChange}
          placeholder='Enter note title'
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <div>
        <h2>All Notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
