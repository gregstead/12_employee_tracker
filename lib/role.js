// Define the Role class
class Role {
  constructor(id, title, salary, dept_id) {
    (this.id = id),
      (this.title = title),
      (this.salary = salary),
      (this.dept_id = dept_id);
  }

  getFirstName() {
    return this.firstName;
  }
  getID() {
    return this.id;
  }
}

module.exports = Role;
