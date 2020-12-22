const inquirer = require("inquirer");
const questions = require("./questions");

const initPrompt = () => {
  inquirer.prompt(questions.initQuestion).then((res) => {
    switch (res.whatToDo) {
      case "add department":
        deptPrompt();
        // make dept object
        // add to db
        break;
      default:
        break;
    }
  });
};

const deptPrompt = () => {
  inquirer.prompt(questions.deptQuestions).then((res) => {
    console.log(typeof res);
    console.log("res :>> ", res);
  });
};

exports.initPrompt = initPrompt;
exports.deptPrompt = deptPrompt;
