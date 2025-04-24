import React from 'react';

const NoteItem = ({ note, onDeleteNote, onEditNote }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="note-item">
      <h3 className="note-title">{note.titulo}</h3>
      <p className="note-content">{note.contenido}</p>
      <p className="note-author">Por: {note.autor}</p>
      <p className="note-date">
        Creada: {formatDate(note.createdAt)}
        {note.updatedAt !== note.createdAt && ` (Actualizada: ${formatDate(note.updatedAt)})`}
      </p>
      <div className="note-actions">
        <button className="btn btn-edit" onClick={() => onEditNote(note)}>
          Editar
        </button>
        <button className="btn btn-delete" onClick={() => onDeleteNote(note.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
