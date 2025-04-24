// src/components/NoteItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const NoteItem = ({ note, onDelete }) => {
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.content}</p>
        <p className="card-text">
          <small className="text-muted">
            {note.updated_at ? 
              `Actualizado: ${formatDate(note.updated_at)}` : 
              `Creado: ${formatDate(note.created_at)}`}
          </small>
        </p>
        <div className="d-flex justify-content-end">
          <Link to={`/edit/${note.id}`} className="btn btn-sm btn-outline-primary me-2">
            Editar
          </Link>
          <button 
            onClick={() => onDelete(note.id)}
            className="btn btn-sm btn-outline-danger"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
