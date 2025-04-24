const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const logger = require('koa-logger');
const { db } = require('./config/database');

// Importar rutas
const notasRoutes = require('./routes/notas.routes');

const app = new Koa();
const router = new Router();

// Configuración de middlewares
app.use(logger());
app.use(bodyParser());
app.use(cors());

// Ruta de prueba para verificar que el servidor funciona
router.get('/', (ctx) => {
  ctx.body = { message: 'API del Tablero de Avisos y Notas' };
});

// Registrar rutas
app.use(router.routes());
app.use(notasRoutes.routes());
app.use(router.allowedMethods());

// Error handling
app.on('error', (err, ctx) => {
  console.error('Error del servidor:', err);
  ctx.status = err.status || 500;
  ctx.body = { error: err.message };
});

// Verificar conexión con la base de datos
async function testDatabaseConnection() {
  try {
    await db.query('SELECT 1');
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}

// Al final de app.js
module.exports = { 
  app, 
  testDatabaseConnection: async () => {
    try {
      // Usa la nueva función de conexión
      await db.query('SELECT 1');
      console.log('Conexión a la base de datos establecida');
      return true;
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
      throw error;
    }
  }
};
