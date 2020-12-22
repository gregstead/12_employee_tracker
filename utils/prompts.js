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
      case "add department":
        addDept();
        break;
      case "add role":
        addRole();
        break;
      case "add employee":
        addEmployee();
        break;
      case "view department":
        helpers.view("departments");
        break;
      case "view role":
        helpers.view("roles");
        break;
      case "view employee":
        helpers.view("employees");
        break;
      case "update department":
        updateDept();
        break;
      case "update role":
        updateRole();
        break;
      case "update employee":
        updateEmployee();
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
    // Make role instance
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

const finished = () => {
  inquirer.prompt(questions.finishedQuestions).then((res) => {
    res.finished ? connection.end() : initPrompt();
  });
};

exports.initPrompt = initPrompt;
exports.addDept = addDept;
exports.addEmployee = addEmployee;
exports.finished = finished;
