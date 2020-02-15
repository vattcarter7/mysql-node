const mysql = require("mysql");

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

module.exports = connection;