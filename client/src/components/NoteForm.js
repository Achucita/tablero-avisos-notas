import React, { useState, useEffect } from 'react';

const NoteForm = ({ onAddNote, currentNote, onUpdateNote }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [autor, setAutor] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // Si hay una nota seleccionada para editar, llenar el formulario
    if (currentNote) {
      setTitulo(currentNote.titulo);
      setContenido(currentNote.contenido);
      setAutor(currentNote.autor);
    } else {
      // Limpiar el formulario si no hay nota seleccionada
      setTitulo('');
      setContenido('');
      setAutor('');
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!titulo.trim() || !contenido.trim() || !autor.trim()) {
      setFormError('Todos los campos son obligatorios');
      return;
    }

    const note = {
      titulo,
      contenido,
      autor,
    };

    if (currentNote) {
      onUpdateNote(currentNote.id, note);
    } else {
      onAddNote(note);
    }

    // Limpiar el formulario
    setTitulo('');
    setContenido('');
    setAutor('');
    setFormError('');
  };

  return (
    <div className="note-form-container">
      <h2>{currentNote ? 'Editar Nota' : 'Crear Nueva Nota'}</h2>
      {formError && <div className="error-message">{formError}</div>}
      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título de la nota"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Contenido de la nota"
            rows="4"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="autor">Autor</label>
          <input
            type="text"
            id="autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            placeholder="Tu nombre"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {currentNote ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
