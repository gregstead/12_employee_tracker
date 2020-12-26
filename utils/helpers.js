const prompts = require("./prompts");
const mysql = require("mysql");
const connection = require("./connection").connection;
const Employee = require("../lib/employee");
const inquirer = require("inquirer");

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

// EMPLOYEE FUNCTIONS //

//View Employees
const viewAllEmployees = () => {
  const queryTemp = `SELECT concat(first_name, ' ', last_name) AS 'Name', roles.title AS 'Title', roles.salary AS 'Salary', departments.dept_name AS 'Department'
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
  const queryTemp = `SELECT first_name AS 'First Name', last_name AS 'Last Name', roles.title AS 'Title', roles.salary AS 'Salary', departments.dept_name AS 'Department Name'
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
  const queryTemp = `SELECT concat(A.first_name, ' ', A.last_name) AS 'Manager Name', B.first_name AS 'Employee First Name', B.last_name AS 'Employee Last Name'
  FROM employees A, employees B
  WHERE A.id = B.manager_id`;
  connection.query(queryTemp, (err, res) => {
    console.table(res);
    prompts.finished();
  });
};

// Remove employee
const removeEmployee = () => {
  let name;
  // Get all employees
  connection.query(`SELECT * FROM employees`, (err, res) => {
    const arrTemp = [];
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      const element = `${res[i].first_name} ${res[i].last_name} || ${res[i].id}`;
      // Push employees to an iterable array
      arrTemp.push(element);
    }
    // Pass the array to the user
    inquirer
      .prompt({
        type: "list",
        name: "id",
        message: "Which employee would you like to remove?",
        choices: arrTemp,
      })
      .then((res) => {
        // Get the employee id from the response
        name = res.id.split("||")[0].trim();
        res.id = res.id.split("||")[1].trim();
        // Get the name for output

        let queryTemp = `DELETE FROM employees WHERE id=?`;
        queryTemp = mysql.format(queryTemp, res.id);
        connection.query(queryTemp, (err, res) => {
          if (err) throw err;
          console.log(`${name} removed from database.`);
          prompts.finished();
        });
      });
  });
};

//View Roles
const viewAllRoles = () => {
  const queryTemp = `SELECT title AS Title, id AS 'ID', dept_id AS 'Department ID', salary AS Salary FROM roles`;
  connection.query(queryTemp, (err, res) => {
    console.table(res);
    prompts.finished();
  });
};

const removeRole = () => {
  let name;
  // Get all employees
  connection.query(`SELECT * FROM roles`, (err, res) => {
    const arrTemp = [];
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      const element = `${res[i].title} || ${res[i].id}`;
      // Push employees to an iterable array
      arrTemp.push(element);
    }
    // Pass the array to the user
    inquirer
      .prompt({
        type: "list",
        name: "id",
        message: "Which role would you like to remove?",
        choices: arrTemp,
      })
      .then((res) => {
        // Get the employee id from the response
        name = res.id.split("||")[0].trim();
        res.id = res.id.split("||")[1].trim();
        // Get the name for output

        let queryTemp = `DELETE FROM roles WHERE id=?`;
        queryTemp = mysql.format(queryTemp, res.id);
        connection.query(queryTemp, (err, res) => {
          if (err) throw err;
          console.log(`${name} removed from database.`);
          prompts.finished();
        });
      });
  });
};

//View Departments
const viewAllDepts = () => {
  const queryTemp = `SELECT dept_name, id FROM departments`;
  connection.query(queryTemp, (err, res) => {
    if (err) throw err;
    console.table(res);
    prompts.finished();
  });
};

const removeDepartment = () => {
  let name;
  // Get all employees
  connection.query(`SELECT * FROM departments`, (err, res) => {
    const arrTemp = [];
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      const element = `${res[i].dept_name} || ${res[i].id}`;
      // Push employees to an iterable array
      arrTemp.push(element);
    }
    // Pass the array to the user
    inquirer
      .prompt({
        type: "list",
        name: "id",
        message: "Which department would you like to remove?",
        choices: arrTemp,
      })
      .then((res) => {
        // Get the employee id from the response
        name = res.id.split("||")[0].trim();
        res.id = res.id.split("||")[1].trim();
        // Get the name for output

        let queryTemp = `DELETE FROM departments WHERE id=?`;
        queryTemp = mysql.format(queryTemp, res.id);
        connection.query(queryTemp, (err, res) => {
          if (err) throw err;
          console.log(`${name} removed from database.`);
          prompts.finished();
        });
      });
  });
};

exports.addTo = addTo;
exports.viewAllEmployees = viewAllEmployees;
exports.viewAllEmployeesByDept = viewAllEmployeesByDept;
exports.viewAllEmployeesByMgr = viewAllEmployeesByMgr;
exports.removeEmployee = removeEmployee;
exports.viewAllRoles = viewAllRoles;
exports.removeRole = removeRole;
exports.viewAllDepts = viewAllDepts;
exports.removeDepartment = removeDepartment;
