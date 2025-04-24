const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Nota = sequelize.define('Nota', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'notas'
});

module.exports = Nota;
