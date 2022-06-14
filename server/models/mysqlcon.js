const mysql = require('mysql2/promise');
require('dotenv').config();

const mysqlEnv = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
};

async function query (sql, params) {
  const connection = await mysql.createConnection(mysqlEnv);
  const [results] = await connection.execute(sql, params);
  connection.end();
  return results;
}

module.exports = {
  query
};
