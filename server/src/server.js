const { app, testDatabaseConnection } = require('./app');
const { initDatabase } = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
  console.error('Error no capturado:', error);
  // No cerramos el proceso, solo registramos el error
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesa rechazada no manejada:', reason);
  // No cerramos el proceso, solo registramos el error
});

async function startServer() {
  try {
    console.log('Verificando conexión a la base de datos...');
    await testDatabaseConnection();
    
    console.log('Inicializando la base de datos...');
    await initDatabase();
    
    console.log('Iniciando el servidor...');
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    // Mantenemos el proceso activo aunque haya un error
    console.log('Servidor en espera...');
  }
}

startServer();
