
require('dotenv').config() // them thu vien dotenv
const mysql = require('mysql2/promise')

// Create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3307, // mac dinh mysql la 3306
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'hoidanit',
  password: process.env.DB_PASSWORD || '123456'
});

module.exports = connection;    