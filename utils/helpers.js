const prompts = require("./prompts");
const mysql = require("mysql");
const connection = require("./connection").connection;
const Employee = require("../lib/employee");
const inquirer = require("inquirer");
const questions = require("./questions");

// addTo (Object, String)
// Add row object to table
const addTo = (rowObj, tableStr) => {
  let queryTemp = `INSERT INTO ?? SET ?`;
  queryTemp = mysql.format(queryTemp, [tableStr, rowObj]);
  connection.query(queryTemp, (err, res) => {
    if (err) throw err;
    console.log(`Entry added to ${tableStr}`);
    prompts.finished();
  });
};

// EMPLOYEE FUNCTIONS //

const addEmployee = () => {
  connection.query(
    `SELECT id AS 'id', concat(first_name, ' ', last_name) AS 'name' FROM employees WHERE is_manager=true;
    SELECT id, title FROM roles`,
    (err, res) => {
      // Make an iterable of manager names
      const managerSelect = [];
      for (let i = 0; i < res[0].length; i++) {
        const element = `${res[0][i].id} : ${res[0][i].name}`;
        managerSelect.push(element);
      }
      // Format the question for inquirer
      const managerQuestion = {
        type: "list",
        name: "manager_answer",
        message: "Who is the employee's manager",
        choices: managerSelect,
      };

      // Make an iterable of role names
      const roleSelect = [];
      for (let i = 0; i < res[1].length; i++) {
        const element = `${res[1][i].id} : ${res[1][i].title}`;
        roleSelect.push(element);
      }
      // Format the question for inquirer
      const roleQuestion = {
        type: "list",
        name: "role_answer",
        message: "What is the employee's role",
        choices: roleSelect,
      };

      // Get static questions
      const promptQuestions = questions.employeeQuestions;
      // Append dynamic questions
      promptQuestions.push(managerQuestion, roleQuestion);

      // Pass the array to the user
      inquirer.prompt(promptQuestions).then((res) => {
        // Make a new Employee object - first_name, last_name, role_id, manager_id, is_manager
        const newEmployee = new Employee(
          res.first_name,
          res.last_name,
          res.role_answer.split(":")[0].trim(),
          res.manager_answer.split(":")[0].trim(),
          res.is_manager
        );
        // Add to db
        addTo(newEmployee, "employees");
      });
    }
  );
};

const updateEmployeeRole = () => {
  // Queries - all employees, all roles
  connection.query(
    `SELECT id AS 'id', concat(first_name, ' ',last_name) AS 'name' FROM employees;
    SELECT * FROM roles`,
    (err, res) => {
      const employeeSelect = [];
      for (let i = 0; i < res[1].length; i++) {
        const element = `${res[0][i].id} : ${res[0][i].name}`;
        employeeSelect.push(element);
      }
      // Format the question for inquirer
      const employeeQuestion = {
        type: "list",
        name: "newEmployee",
        message: "Which employee would you like to update?",
        choices: employeeSelect,
      };

      const roleSelect = [];
      for (let i = 0; i < res[1].length; i++) {
        const element = `${res[1][i].id} : ${res[1][i].title}`;
        roleSelect.push(element);
      }
      // Format the question for inquirer
      const roleQuestion = {
        type: "list",
        name: "newRole",
        message: "What is the employee's new role",
        choices: roleSelect,
      };
      promptQuestions = [employeeQuestion, roleQuestion];
      // Pass the array to the user
      inquirer.prompt(promptQuestions).then((res) => {
        console.log("res :>> ", res);
        let queryTemp = `UPDATE employees SET role_id = ? WHERE id = ?;`;
        queryTemp = mysql.format(queryTemp, [
          res.newRole.split(":")[0].trim(),
          res.newEmployee.split(":")[0].trim(),
        ]);
        connection.query(queryTemp, (err, res) => {
          if (err) throw err;
          console.log(`Record updated`);
          prompts.finished();
        });
      });
    }
  );
};

//View Employees
const viewAllEmployees = () => {
  const queryTemp = `SELECT concat(first_name, ' ', last_name) AS 'name', roles.title AS 'title', roles.salary AS 'salary', departments.dept_name AS 'department'
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
  const queryTemp = `SELECT first_name AS 'first name', last_name AS 'Last Name', roles.title AS 'Title', roles.salary AS 'salary', departments.dept_name AS 'department name'
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
  const queryTemp = `SELECT concat(A.first_name, ' ', A.last_name) AS 'manager name', B.first_name AS 'employer first name', B.last_name AS 'employee last name'
  FROM employees A, employees B
  WHERE A.id = B.manager_id
  ORDER BY B.manager_id`;
  connection.query(queryTemp, (err, res) => {
    if (err) throw err;
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
exports.addEmployee = addEmployee;
exports.viewAllEmployees = viewAllEmployees;
exports.viewAllEmployeesByDept = viewAllEmployeesByDept;
exports.viewAllEmployeesByMgr = viewAllEmployeesByMgr;
exports.removeEmployee = removeEmployee;
exports.updateEmployeeRole = updateEmployeeRole;
exports.viewAllRoles = viewAllRoles;
exports.removeRole = removeRole;
exports.viewAllDepts = viewAllDepts;
exports.removeDepartment = removeDepartment;
