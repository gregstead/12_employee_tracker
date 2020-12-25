// Dependencies
// ~~~~~

const prompts = require("./utils/prompts");
const connection = require("./utils/connection").connection;

connection.connect((err) => {
  if (err) throw err;
  prompts.initPrompt();
});

// Bonus points if you're able to:
// Update employee managers
// View employees by manager
// Delete departments, roles, and employees
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
