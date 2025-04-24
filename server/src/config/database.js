const mysql = require('mysql2/promise');
require('dotenv').config();

// Función para crear una conexión con reintentos
const createDbConnection = async (maxAttempts = 5, delay = 5000) => {
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      console.log(`Intento de conexión a MySQL ${attempts + 1}/${maxAttempts}`);
      
      const pool = mysql.createPool({
        host: process.env.DB_HOST || 'mysql',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'tablero_avisos',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      
      // Verificar que la conexión funciona
      await pool.query('SELECT 1');
      console.log('Conexión a MySQL establecida correctamente');
      return pool;
    } catch (error) {
      attempts++;
      console.error(`Error de conexión a MySQL (${attempts}/${maxAttempts}):`, error.message);
      
      if (attempts >= maxAttempts) {
        console.error('Máximo número de intentos alcanzado');
        throw new Error(`No se pudo conectar a MySQL después de ${maxAttempts} intentos: ${error.message}`);
      }
      
      console.log(`Reintentando en ${delay/1000} segundos...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Inicializar la variable db como null primero
let db = null;

// Función para obtener la conexión (creándola si es necesario)
const getConnection = async () => {
  if (!db) {
    db = await createDbConnection();
  }
  return db;
};

// Función para inicializar la base de datos
async function initDatabase() {
  try {
    const connection = await getConnection();
    
    // Crear la tabla si no existe
    await connection.query(`
      CREATE TABLE IF NOT EXISTS notas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        contenido TEXT NOT NULL,
        tipo ENUM('aviso', 'nota') NOT NULL,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Tabla de notas creada o verificada correctamente');
    return true;
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}

module.exports = { 
  getConnection,
  initDatabase,
  db: {
    query: async (...args) => {
      const connection = await getConnection();
      return connection.query(...args);
    }
  }
};
