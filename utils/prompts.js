// Dependencies

const inquirer = require("inquirer");
const questions = require("./questions");
const helpers = require("./helpers");
const connection = require("./connection").connection;

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
        helpers.addEmployee();
        break;
      case "Remove Employee":
        helpers.removeEmployee();
        break;
      case "Update Employee Role":
        helpers.updateEmployeeRole();
        break;
      case "Update Employee Manager":
        helpers.updateEmployeeManager();
        break;
      case "View All Roles":
        helpers.viewAllRoles();
        break;
      case "Add Role":
        helpers.addRole();
        break;
      case "Remove Role":
        helpers.removeRole();
        break;
      case "View All Departments":
        helpers.viewAllDepts();
        break;
      case "Add Department":
        addDept();
        break;
      case "Remove Department":
        helpers.removeDepartment();
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

const finished = () => {
  inquirer.prompt(questions.finishedQuestions).then((res) => {
    res.finished ? connection.end() : initPrompt();
  });
};

exports.initPrompt = initPrompt;
exports.addDept = addDept;
exports.finished = finished;
