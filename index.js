// Dependencies
// ~~~~~
const titleArt = require("./assets/ascii_title").titleArt;
const prompts = require("./utils/prompts");
const connection = require("./utils/connection").connection;

console.log(titleArt);

connection.connect((err) => {
  if (err) throw err;
  prompts.initPrompt();
});

// Bonus points if you're able to:
// Update employee managers
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
