// Define the department class
class Department {
  constructor(dept_name) {
    this.dept_name = dept_name;
    this.id;
  }

  getName() {
    return this.name;
  }
  getID() {
    return this.id;
  }
}

// Get information about the department from the user
// Add that information to the database

module.exports = Department;
