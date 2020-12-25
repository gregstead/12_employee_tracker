// Dependencies

const inquirer = require("inquirer");
const questions = require("./questions");
const helpers = require("./helpers");
const connection = require("./connection").connection;
const format = require("mysql").format;

const Department = require("../lib/department");
const Role = require("../lib/role");
const Employee = require("../lib/employee");
const Manager = require("../lib/manager");

// Functions

const initPrompt = () => {
  inquirer.prompt(questions.initQuestion).then((res) => {
    switch (res.whatToDo) {
      case "View All Employees":
        helpers.viewAllEmployees();
        break;
      case "View All Employees By Department":
        helpers.viewAllEmployeesByDept();
        break;
      case "View All Employees By Manager":
        helpers.viewAllEmployeesByMgr();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Remove Employee":
        removeEmployee();
        break;
      case "Update Employee Role":
        break;
      case "Update Employee Manager":
        break;
      case "View All Roles":
        helpers.viewAllRoles();
        break;
      case "Add Role":
        addRole();
        break;
      case "Remove Role":
        break;
      case "View All Departments":
        helpers.viewAllDepts();
        break;
      case "Add Department":
        addDept();
        break;
      case "Remove Department":
        break;
      default:
        break;
    }
  });
};

const addDept = () => {
  inquirer.prompt(questions.deptQuestions).then((res) => {
    // Make department instance
    const department = new Department(res.dept_name);
    // Write to database
    helpers.addTo(department, "departments");
  });
};

const addRole = () => {
  inquirer.prompt(questions.roleQuestions).then((res) => {
    // Make role instance
    const role = new Role(res.title, res.salary, res.dept_id);
    // Write to database
    helpers.addTo(role, "roles");
  });
};

const addEmployee = () => {
  inquirer.prompt(questions.employeeQuestions).then((res) => {
    // Make employee instance
    const employee = new Employee(
      res.first_name,
      res.last_name,
      res.role_id,
      res.manager_id
    );
    // Write to database
    helpers.addTo(employee, "employees");
  });
};

// Remove an employee
const removeEmployee = () => {
  let name;
  // Get all employees
  connection.query(`SELECT * FROM employees`, (err, res) => {
    const arrTemp = [];
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      const element = `${res[i].first_name} ${res[i].last_name}\t|| ${res[i].id}`;
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
        queryTemp = format(queryTemp, res.id);
        connection.query(queryTemp, (err, res) => {
          if (err) throw err;
          console.log(`${name} removed from database.`);
          finished();
        });
      });
  });
};

const finished = () => {
  inquirer.prompt(questions.finishedQuestions).then((res) => {
    res.finished ? connection.end() : initPrompt();
  });
};

exports.initPrompt = initPrompt;
exports.addDept = addDept;
exports.addEmployee = addEmployee;
exports.finished = finished;
