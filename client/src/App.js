import React, { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from './services/api';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las notas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (note) => {
    try {
      const newNote = await createNote(note);
      setNotes([...notes, newNote]);
    } catch (err) {
      setError('Error al crear la nota');
      console.error(err);
    }
  };

  const handleUpdateNote = async (id, updatedNote) => {
    try {
      const updated = await updateNote(id, updatedNote);
      setNotes(notes.map((note) => (note.id === id ? updated : note)));
      setCurrentNote(null);
    } catch (err) {
      setError('Error al actualizar la nota');
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      setError('Error al eliminar la nota');
      console.error(err);
    }
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
  };

  return (
    <div className="App">
      <NavBar />
      <main className="container">
        <h1>Tablero de Avisos</h1>
        {error && <div className="error-message">{error}</div>}
        <NoteForm onAddNote={handleAddNote} currentNote={currentNote} onUpdateNote={handleUpdateNote} />
        {loading ? (
          <p>Cargando notas...</p>
        ) : (
          <NoteList notes={notes} onDeleteNote={handleDeleteNote} onEditNote={handleEditNote} />
        )}
      </main>
    </div>
  );
}

export default App;
