const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa-cors');
const { connectDB } = require('./config/database');
const notasRoutes = require('./routes/notas.routes');

// Inicializar la aplicación Koa
const app = new Koa();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(logger());
app.use(bodyParser());

// Manejo de errores
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      mensaje: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? err.message : {}
    };
    ctx.app.emit('error', err, ctx);
  }
});

// Rutas
app.use(notasRoutes.routes());
app.use(notasRoutes.allowedMethods());

// Ruta de prueba
app.use(async (ctx) => {
  if (ctx.path === '/api') {
    ctx.body = { mensaje: 'API de Tablero de Avisos funcionando correctamente' };
  }
});

// Manejo de errores
app.on('error', (err, ctx) => {
  console.error('Error del servidor:', err);
});

module.exports = app;
