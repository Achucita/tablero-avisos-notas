import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onDeleteNote, onEditNote }) => {
  if (!notes || notes.length === 0) {
    return <p className="no-notes">No hay notas disponibles. ¡Crea una nueva!</p>;
  }

  // Ordenar las notas por fecha de creación (más recientes primero)
  const sortedNotes = [...notes].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="notes-container">
      <h2>Notas ({notes.length})</h2>
      <div className="notes-list">
        {sortedNotes.map((note) => (
          <NoteItem key={note.id} note={note} onDeleteNote={onDeleteNote} onEditNote={onEditNote} />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
