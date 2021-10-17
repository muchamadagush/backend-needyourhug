const mysql = require('mysql2')
require('dotenv').config;
const env = process.env

const conn = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  database: env.DB_NAME,
  password: env.DB_PASS
})

module.exports = conn;