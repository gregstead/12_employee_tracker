// Dependencies
// ~~~~~
const fs = require("fs");
const inquirer = require("inquirer");

// Constants
// ~~~~~

// Array of questions for the user
const questions = [
  {
    type: "list",
    name: "whatToDo",
    message: "What would you like to do?",
    choices: [
      "Add department",
      "Add role",
      "Add employee",
      "View department",
      "View role",
      "View employee",
      "Update department",
      "Update role",
      "Update employee",
    ],
  },
];

function init() {
  inquirer.prompt(questions).then((answers) => {
    console.log("answers :>> ", answers);
  });
}

init();

// Bonus points if you're able to:
// Update employee managers
// View employees by manager
// Delete departments, roles, and employees
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
