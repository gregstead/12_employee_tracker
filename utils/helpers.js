// addTo (Obj, Str)
// Add class instance to
const addTo = (Obj, Str) => {
  connection.connect((err) => {
    if (err) throw err;
    const queryTemp = `INSERT INTO ` + Str + ` SET ?`;
    connection.query(queryTemp, Obj, (err, res) => {
      if (err) throw err;
      console.log("res :>> ", res);
    });
    connection.end();
  });
};

module.exports = addTo;
