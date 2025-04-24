// server/tests/notas.test.js
const request = require('supertest');
const { app, testDatabaseConnection } = require('../src/app');
const { db, initDatabase } = require('../src/config/database');

// Mock para la base de datos
jest.mock('../src/config/database', () => {
  const mockQuery = jest.fn();
  return {
    db: {
      query: mockQuery
    },
    initDatabase: jest.fn()
  };
});

describe('Notas API', () => {
  let server;

  beforeAll(async () => {
    await testDatabaseConnection();
    server = app.listen();
  });

  afterAll(async () => {
    server.close();
  });

  beforeEach(() => {
    // Limpiar los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  test('GET /api/notas debería devolver todas las notas', async () => {
    const mockNotas = [
      { id: 1, titulo: 'Nota 1', contenido: 'Contenido 1', tipo: 'nota' },
      { id: 2, titulo: 'Aviso 1', contenido: 'Contenido 2', tipo: 'aviso' }
    ];
    
    db.query.mockResolvedValueOnce([mockNotas]);
    
    const response = await request(server).get('/api/notas');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM notas'));
  });

  test('GET /api/notas/:id debería devolver una nota por ID', async () => {
    const mockNota = { id: 1, titulo: 'Nota 1', contenido: 'Contenido 1', tipo: 'nota' };
    
    db.query.mockResolvedValueOnce([[mockNota]]);
    
    const response = await request(server).get('/api/notas/1');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(mockNota);
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM notas WHERE id = ?'), [1]);
  });

  test('POST /api/notas debería crear una nueva nota', async () => {
    const nuevaNota = { titulo: 'Nueva Nota', contenido: 'Nuevo Contenido', tipo: 'nota' };
    
    db.query.mockResolvedValueOnce([{ insertId: 3 }]);
    
    const response = await request(server)
      .post('/api/notas')
      .send(nuevaNota);
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('titulo', 'Nueva Nota');
    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO notas'),
      [nuevaNota.titulo, nuevaNota.contenido, nuevaNota.tipo]
    );
  });

  test('PUT /api/notas/:id debería actualizar una nota existente', async () => {
    const notaExistente = { id: 1, titulo: 'Nota Original', contenido: 'Contenido Original', tipo: 'nota' };
    const datosActualizados = { titulo: 'Nota Actualizada', contenido: 'Contenido Actualizado', tipo: 'aviso' };
    
    db.query.mockResolvedValueOnce([[notaExistente]]);
    db.query.mockResolvedValueOnce([{ affectedRows: 1 }]);
    
    const response = await request(server)
      .put('/api/notas/1')
      .send(datosActualizados);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('titulo', 'Nota Actualizada');
    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining('UPDATE notas SET'),
      [datosActualizados.titulo, datosActualizados.contenido, datosActualizados.tipo, 1]
    );
  });

  test('DELETE /api/notas/:id debería eliminar una nota', async () => {
    const notaExistente = { id: 1, titulo: 'Nota a eliminar', contenido: 'Contenido', tipo: 'nota' };
    
    db.query.mockResolvedValueOnce([[notaExistente]]);
    db.query.mockResolvedValueOnce([{ affectedRows: 1 }]);
    
    const response = await request(server).delete('/api/notas/1');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain('eliminada exitosamente');
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM notas WHERE id = ?'), [1]);
  });
});
