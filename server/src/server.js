const { app, testDatabaseConnection } = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  // Verificar la conexión a la base de datos
  await testDatabaseConnection();

  // Iniciar el servidor
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
}

startServer().catch(console.error);
