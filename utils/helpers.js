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

// Get all roles
const getAllRoles = () => {
  const queryTemp = ``;
  connection.query(queryTemp, (err, res) => {
    if (err) throw err;
    return res;
  });
};

// view (Str)
// View a table in the terminal
//Get all
const selectAllFrom = (Str) => {
  let queryTemp = `SELECT * FROM ??`;
  queryTemp = mysql.format(queryTemp, [Str]);
  connection.query(queryTemp, (err, res) => {
    console.table(res);
    prompts.finished();
  });
};

//View Employees
const viewAllEmployees = () => {
  const queryTemp = `SELECT first_name, last_name, roles.title, roles.salary, departments.dept_name
  FROM employees
  LEFT JOIN roles ON employees.role_id=roles.id
  INNER JOIN departments ON roles.dept_id=departments.id`;
  connection.query(queryTemp, (err, res) => {
    console.table(res);
    prompts.finished();
  });
};

// View all empployees by dept
const viewAllEmployeesByDept = () => {
  const queryTemp = `SELECT first_name, last_name, roles.title, roles.salary, departments.dept_name
  FROM employees
  RIGHT JOIN roles ON employees.role_id=roles.id
  INNER JOIN departments ON roles.dept_id=departments.id
  ORDER BY departments.dept_name`;
  connection.query(queryTemp, (err, res) => {
    console.table(res);
    prompts.finished();
  });
};

//View Roles
//View Departments

exports.addTo = addTo;
exports.getAllRoles = getAllRoles;
exports.selectAllFrom = selectAllFrom;
exports.viewAllEmployees = viewAllEmployees;
exports.viewAllEmployeesByDept = viewAllEmployeesByDept;
