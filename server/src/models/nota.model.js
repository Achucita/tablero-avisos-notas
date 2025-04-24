// server/src/models/nota.model.js
const { db } = require('../config/database');

class NotaModel {
  // Obtener todas las notas
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM notas ORDER BY fecha_creacion DESC');
      return rows;
    } catch (error) {
      console.error('Error al obtener todas las notas:', error);
      throw error;
    }
  }

  // Obtener una nota por ID
  static async getById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM notas WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener la nota con ID ${id}:`, error);
      throw error;
    }
  }

  // Crear una nueva nota
  static async create(notaData) {
    try {
      const { titulo, contenido, tipo } = notaData;
      const [result] = await db.query(
        'INSERT INTO notas (titulo, contenido, tipo) VALUES (?, ?, ?)',
        [titulo, contenido, tipo]
      );
      return { id: result.insertId, ...notaData };
    } catch (error) {
      console.error('Error al crear la nota:', error);
      throw error;
    }
  }

  // Actualizar una nota existente
  static async update(id, notaData) {
    try {
      const { titulo, contenido, tipo } = notaData;
      await db.query(
        'UPDATE notas SET titulo = ?, contenido = ?, tipo = ? WHERE id = ?',
        [titulo, contenido, tipo, id]
      );
      
      return { id, ...notaData };
    } catch (error) {
      console.error(`Error al actualizar la nota con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar una nota
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM notas WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al eliminar la nota con ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = NotaModel;
