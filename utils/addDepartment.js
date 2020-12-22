const connection = require("./connection");

const addDepartment = () => {
  connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected `, connection.threadId);
    connection.query("SELECT * FROM departments", (err, res) => {
      if (err) throw err;
      console.log("res :>> ", res);
    });
    connection.end();
  });
};

module.exports = addDepartment;
