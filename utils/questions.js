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

const deptQuestions = [
  {
    type: "input",
    name: "dept_name",
    message: "What is the department name?",
  },
];

exports.initQuestion = initQuestion;
exports.deptQuestions = deptQuestions;
