const Separator = require("inquirer").Separator;
const helpers = require("./helpers");

const initQuestion = [
  {
    type: "list",
    name: "whatToDo",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Employees By Department",
      "View All Employees By Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
      new Separator(),
      "View All Roles",
      "Add Role",
      "Remove Role",
      new Separator(),
      "View All Departments",
      "Add Department",
      "Remove Department",
      new Separator(),
    ],
  },
];

// dept_name
const deptQuestions = [
  {
    type: "input",
    name: "dept_name",
    message: "What is the department name?",
  },
];

// title, salary, dept_id
const roleQuestions = [
  {
    type: "input",
    name: "title",
    message: "What is the role title?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the role salary?",
  },
  {
    type: "input",
    name: "dept_id",
    message: "What is the role department?", //can I make this selectable?
  },
];

// Get the departments
// foreach dpartment => dept_name
// return this to options as array

// first_name, last_name, role_id, manager_id
const employeeQuestions = [
  {
    type: "input",
    name: "first_name",
    message: "What is the employee's first name?",
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the employee's last name?",
  },
  {
    type: "input",
    name: "role_id",
    message: "What is the employee's role?", //can I make this selectable?
  },
  {
    type: "input",
    name: "manager_id",
    message: "Who is the employee's manager?", //can I make this selectable?
  },
  {
    type: "confirm",
    name: "is_manager",
    message: "Is this employee a manager?",
  },
];

const removeRoleQuestion = () => {
  return [
    {
      type: "list",
      name: "remove_id",
      message: "Which role would you like to femove?",
      choices: [],
    },
  ];
};

const finishedQuestions = [
  {
    type: "confirm",
    name: "finished",
    message: "Finished?",
  },
];

exports.initQuestion = initQuestion;
exports.deptQuestions = deptQuestions;
exports.roleQuestions = roleQuestions;
exports.employeeQuestions = employeeQuestions;
exports.finishedQuestions = finishedQuestions;
