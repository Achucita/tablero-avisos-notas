// server/src/controllers/notas.controller.js
const NotaModel = require('../models/nota.model');

class NotasController {
  // Obtener todas las notas
  static async getAll(ctx) {
    try {
      const notas = await NotaModel.getAll();
      ctx.status = 200;
      ctx.body = { 
        success: true,
        data: notas 
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { 
        success: false,
        message: 'Error al obtener las notas',
        error: error.message 
      };
    }
  }

  // Obtener una nota por ID
  static async getById(ctx) {
    try {
      const id = parseInt(ctx.params.id);
      
      if (isNaN(id)) {
        ctx.status = 400;
        ctx.body = { 
          success: false,
          message: 'ID de nota inválido' 
        };
        return;
      }
      
      const nota = await NotaModel.getById(id);
      
      if (!nota) {
        ctx.status = 404;
        ctx.body = { 
          success: false,
          message: `Nota con ID ${id} no encontrada` 
        };
        return;
      }
      
      ctx.status = 200;
      ctx.body = { 
        success: true,
        data: nota 
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { 
        success: false,
        message: 'Error al obtener la nota',
        error: error.message 
      };
    }
  }

  // Crear una nueva nota
  static async create(ctx) {
    try {
      const { titulo, contenido, tipo } = ctx.request.body;
      
      // Validaciones básicas
      if (!titulo || !contenido || !tipo) {
        ctx.status = 400;
        ctx.body = { 
          success: false,
          message: 'Título, contenido y tipo son campos requeridos' 
        };
        return;
      }
      
      if (tipo !== 'aviso' && tipo !== 'nota') {
        ctx.status = 400;
        ctx.body = { 
          success: false,
          message: 'El tipo debe ser "aviso" o "nota"' 
        };
        return;
      }
      
      const nuevaNota = await NotaModel.create({ titulo, contenido, tipo });
      
      ctx.status = 201;
      ctx.body = { 
        success: true,
        message: 'Nota creada exitosamente',
        data: nuevaNota 
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { 
        success: false,
        message: 'Error al crear la nota',
        error: error.message 
      };
    }
  }

  // Actualizar una nota existente
  static async update(ctx) {
    try {
      const id = parseInt(ctx.params.id);
      
      if (isNaN(id)) {
        ctx.status = 400;
        ctx.body = { 
          success: false,
          message: 'ID de nota inválido' 
        };
        return;
      }
      
      // Verificar si la nota existe
      const existingNota = await NotaModel.getById(id);
      
      if (!existingNota) {
        ctx.status = 404;
        ctx.body = { 
          success: false,
          message: `Nota con ID ${id} no encontrada` 
        };
        return;
      }
      
      const { titulo, contenido, tipo } = ctx.request.body;
      
      // Validaciones básicas
      if (!titulo && !contenido && !tipo) {
        ctx.status = 400;
        ctx.body = { 
          success: false,
          message: 'Se requiere al menos un campo para actualizar (título, contenido o tipo)' 
        };
        return;
      }
      
      // Usar valores existentes si no se proporcionan nuevos
      const updatedData = {
        titulo: titulo || existingNota.titulo,
        contenido: contenido || existingNota.contenido,
        tipo: tipo || existingNota.tipo
      };
      
      if (updatedData.tipo !== 'aviso' && updatedData.tipo !== 'nota') {
        ctx.status = 400;
        ctx.body = { 
          success: false,
          message: 'El tipo debe ser "aviso" o "nota"' 
        };
        return;
      }
      
      const updatedNota = await NotaModel.update(id, updatedData);
      
      ctx.status = 200;
      ctx.body = { 
        success: true,
        message: 'Nota actualizada exitosamente',
        data: updatedNota 
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { 
        success: false,
        message: 'Error al actualizar la nota',
        error: error.message 
      };
    }
  }

  // Eliminar una nota
  static async delete(ctx) {
    try {
      const id = parseInt(ctx.params.id);
      
      if (isNaN(id)) {
        ctx.status = 400;
        ctx.body = { 
          success: false,
          message: 'ID de nota inválido' 
        };
        return;
      }
      
      // Verificar si la nota existe
      const existingNota = await NotaModel.getById(id);
      
      if (!existingNota) {
        ctx.status = 404;
        ctx.body = { 
          success: false,
          message: `Nota con ID ${id} no encontrada` 
        };
        return;
      }
      
      const deleted = await NotaModel.delete(id);
      
      if (deleted) {
        ctx.status = 200;
        ctx.body = { 
          success: true,
          message: `Nota con ID ${id} eliminada exitosamente` 
        };
      } else {
        ctx.status = 500;
        ctx.body = { 
          success: false,
          message: `No se pudo eliminar la nota con ID ${id}` 
        };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { 
        success: false,
        message: 'Error al eliminar la nota',
        error: error.message 
      };
    }
  }
}

module.exports = NotasController;
