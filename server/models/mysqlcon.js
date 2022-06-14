const mysql = require('mysql2/promise');
require('dotenv').config();

const mysqlEnv = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
};

const pool = mysql.createPool(mysqlEnv);

module.exports = {
  pool
};
