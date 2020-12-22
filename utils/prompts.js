const inquirer = require("inquirer");
const questions = require("./questions");
const helpers = require("./helpers");

const Department = require("../lib/department");
const Role = require("../lib/role");

const initPrompt = () => {
  inquirer.prompt(questions.initQuestion).then((res) => {
    switch (res.whatToDo) {
      case "add department":
        addDept();
        break;
      case "add role":
        addRole();
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

exports.initPrompt = initPrompt;
exports.addDept = addDept;
