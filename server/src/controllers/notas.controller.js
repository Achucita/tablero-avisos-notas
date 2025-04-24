const Nota = require('../models/nota.model');

// Obtener todas las notas
exports.getNotas = async (ctx) => {
  try {
    const notas = await Nota.findAll();
    ctx.body = notas;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { mensaje: 'Error al obtener las notas', error: error.message };
  }
};

// Obtener una nota por ID
exports.getNotaById = async (ctx) => {
  try {
    const id = ctx.params.id;
    const nota = await Nota.findByPk(id);
    
    if (!nota) {
      ctx.status = 404;
      ctx.body = { mensaje: 'Nota no encontrada' };
      return;
    }
    
    ctx.body = nota;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { mensaje: 'Error al obtener la nota', error: error.message };
  }
};

// Crear una nueva nota
exports.createNota = async (ctx) => {
  try {
    const { titulo, contenido, autor } = ctx.request.body;
    
    // Validación básica
    if (!titulo || !contenido || !autor) {
      ctx.status = 400;
      ctx.body = { mensaje: 'Todos los campos son obligatorios' };
      return;
    }
    
    const nuevaNota = await Nota.create({
      titulo,
      contenido,
      autor
    });
    
    ctx.status = 201;
    ctx.body = nuevaNota;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { mensaje: 'Error al crear la nota', error: error.message };
  }
};

// Actualizar una nota
exports.updateNota = async (ctx) => {
  try {
    const id = ctx.params.id;
    const { titulo, contenido, autor } = ctx.request.body;
    
    // Validación básica
    if (!titulo || !contenido || !autor) {
      ctx.status = 400;
      ctx.body = { mensaje: 'Todos los campos son obligatorios' };
      return;
    }
    
    const nota = await Nota.findByPk(id);
    
    if (!nota) {
      ctx.status = 404;
      ctx.body = { mensaje: 'Nota no encontrada' };
      return;
    }
    
    await nota.update({
      titulo,
      contenido,
      autor
    });
    
    ctx.body = nota;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { mensaje: 'Error al actualizar la nota', error: error.message };
  }
};

// Eliminar una nota
exports.deleteNota = async (ctx) => {
  try {
    const id = ctx.params.id;
    const nota = await Nota.findByPk(id);
    
    if (!nota) {
      ctx.status = 404;
      ctx.body = { mensaje: 'Nota no encontrada' };
      return;
    }
    
    await nota.destroy();
    
    ctx.body = { mensaje: 'Nota eliminada correctamente' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { mensaje: 'Error al eliminar la nota', error: error.message };
  }
};
