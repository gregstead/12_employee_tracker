// Define the department class
class Department {
  constructor(name, id) {
    this.name = name;
    this.id = id;
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
