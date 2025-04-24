const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/config/database');

// Antes de todas las pruebas, sincronizar la base de datos
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

// Después de todas las pruebas, cerrar la conexión
afterAll(async () => {
  await sequelize.close();
});

describe('API de Notas', () => {
  let notaId;

  // Prueba para crear una nota
  test('Debería crear una nueva nota', async () => {
    const res = await request(app.callback())
      .post('/api/notas')
      .send({
        titulo: 'Nota de prueba',
        contenido: 'Contenido de prueba',
        autor: 'Autor de prueba'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.titulo).toEqual('Nota de prueba');
    
    notaId = res.body.id;
  });

  // Prueba para obtener todas las notas
  test('Debería obtener todas las notas', async () => {
    const res = await request(app.callback())
      .get('/api/notas');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Prueba para obtener una nota por ID
  test('Debería obtener una nota por ID', async () => {
    const res = await request(app.callback())
      .get(`/api/notas/${notaId}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', notaId);
    expect(res.body.titulo).toEqual('Nota de prueba');
  });

  // Prueba para actualizar una nota
  test('Debería actualizar una nota', async () => {
    const res = await request(app.callback())
      .put(`/api/notas/${notaId}`)
      .send({
        titulo: 'Nota actualizada',
        contenido: 'Contenido actualizado',
        autor: 'Autor actualizado'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', notaId);
    expect(res.body.titulo).toEqual('Nota actualizada');
    expect(res.body.contenido).toEqual('Contenido actualizado');
  });

  // Prueba para eliminar una nota
  test('Debería eliminar una nota', async () => {
    const res = await request(app.callback())
      .delete(`/api/notas/${notaId}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('mensaje', 'Nota eliminada correctamente');
    
    // Verificar que la nota ya no existe
    const getRes = await request(app.callback())
      .get(`/api/notas/${notaId}`);
    
    expect(getRes.statusCode).toEqual(404);
  });
});
