const mysql = require("mysql");
const db = mysql.createPool({
  user: process.env["USER"],
  host: process.env["HOST"],
  password: process.env["PASSWORD"],
  database: process.env["DATABASE"],
});

module.exports = db;
