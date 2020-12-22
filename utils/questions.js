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

exports.initQuestion = initQuestion;
exports.deptQuestions = deptQuestions;
exports.roleQuestions = roleQuestions;
