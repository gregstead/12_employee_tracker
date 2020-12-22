const prompts = require("./prompts");
const mysql = require("mysql");
const connection = require("./connection").connection;

// addTo (Obj, Str)
// Add class instance to
const addTo = (Obj, Str) => {
  let queryTemp = `INSERT INTO ?? SET ?`;
  queryTemp = mysql.format(queryTemp, [Str, Obj]);
  connection.query(queryTemp, (err, res) => {
    if (err) throw err;
    prompts.finished();
  });
};

// view (Str)
// View a table in the terminal
//Get all
const view = (Str) => {
  let queryTemp = `SELECT * FROM ??`;
  queryTemp = mysql.format(queryTemp, [Str]);
  connection.query(queryTemp, (err, res) => {
    console.table(res);
    prompts.finished();
  });
};

//View Employees
//View Roles
//View Departments

exports.addTo = addTo;
exports.view = view;
