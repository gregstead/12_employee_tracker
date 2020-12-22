// Dependencies
// ~~~~~

const fs = require("fs");
const inquirer = require("inquirer");
const Department = require("./lib/department");
const helpers = require("./utils/helpers");
const prompts = require("./utils/prompts");

// Constants
// ~~~~~
prompts.initPrompt();

// Bonus points if you're able to:
// Update employee managers
// View employees by manager
// Delete departments, roles, and employees
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
