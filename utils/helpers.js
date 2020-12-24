const prompts = require("./prompts");
const mysql = require("mysql");
const connection = require("./connection").connection;

// addTo (Object, String)
// Add row object to table
const addTo = (rowObj, tableStr) => {
  let queryTemp = `INSERT INTO ?? SET ?`;
  queryTemp = mysql.format(queryTemp, [tableStr, rowObj]);
  connection.query(queryTemp, (err, res) => {
    if (err) throw err;
    prompts.finished();
  });
};

// removeFrom (Object, String)
// Remove row object from table
const removeFrom = (rowObj, tableStr) => {
  let queryTemp = `DELETE FROM ?? WHERE id=?`;
  queryTemp = mysql.format(queryTemp, [tableStr, rowObj.id]);
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

// View all employees by manager
const viewAllEmployeesByMgr = () => {
  const queryTemp = `SELECT concat(A.first_name, ' ', A.last_name) AS 'Manager Name', B.first_name AS 'First Name', B.last_name AS 'Last Name'
  FROM employees A, employees B
  WHERE A.id = B.manager_id`;
  connection.query(queryTemp, (err, res) => {
    console.table(res);
    prompts.finished();
  });
};

//View Roles
const viewAllRoles = () => {
  const queryTemp = `SELECT title, id, dept_id, salary FROM roles`;
  connection.query(queryTemp, (err, res) => {
    console.table(res);
    prompts.finished();
  });
};

//View Departments
const viewAllDepts = () => {
  const queryTemp = `SELECT dept_name, id FROM departments;`;
  connection.query(queryTemp, (err, res) => {
    console.table(res);
    prompts.finished();
  });
};

exports.addTo = addTo;
exports.getAllRoles = getAllRoles;
exports.selectAllFrom = selectAllFrom;
exports.viewAllEmployees = viewAllEmployees;
exports.viewAllEmployeesByDept = viewAllEmployeesByDept;
exports.viewAllEmployeesByMgr = viewAllEmployeesByMgr;
exports.viewAllRoles = viewAllRoles;
exports.viewAllDepts = viewAllDepts;
exports.removeFrom = removeFrom;
