const initQuestion = [
  {
    type: "list",
    name: "whatToDo",
    message: "What would you like to do?",
    choices: [
      "add department",
      "add role",
      "add employee",
      "view department",
      "view role",
      "view employee",
      "update department",
      "update role",
      "update employee",
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
];

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
