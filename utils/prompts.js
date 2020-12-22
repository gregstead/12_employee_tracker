const inquirer = require("inquirer");
const questions = require("./questions");
const helpers = require("./helpers");

const Department = require("../lib/department");

const initPrompt = () => {
  inquirer.prompt(questions.initQuestion).then((res) => {
    switch (res.whatToDo) {
      case "add department":
        deptPrompt();
        break;
      default:
        break;
    }
  });
};

const deptPrompt = () => {
  inquirer.prompt(questions.deptQuestions).then((res) => {
    const department = new Department(res.dept_name);
    // Write to database
    helpers.addTo(department, "departments");
  });
};

exports.initPrompt = initPrompt;
exports.deptPrompt = deptPrompt;
