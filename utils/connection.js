const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  // Port
  port: 3306,

  //Username
  user: "root",

  //Password
  password: "pathword",
  database: "employees_db",
});

module.exports = connection;