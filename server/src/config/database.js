const mysql = require("mysql2/promise")
require("dotenv").config()

// Default values for local development
const DB_HOST = process.env.DB_HOST || "127.0.0.1"
const DB_USER = process.env.DB_USER || "root"
const DB_PASSWORD = process.env.DB_PASSWORD || ""
const DB_NAME = process.env.DB_NAME || "tablero_avisos"
const DB_PORT = process.env.DB_PORT || 3306

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
    })

    console.log("Modelos sincronizados con la base de datos")
    return connection
  } catch (error) {
    console.error("Error al conectar a MySQL:", error.message)
    console.error("Verifique que MySQL esté en ejecución y que las credenciales sean correctas")

    // In development, we might want to exit, but in production we might want to retry
    if (process.env.NODE_ENV !== "production") {
      process.exit(1)
    }

    throw error
  }
}

module.exports = { connectDB }
