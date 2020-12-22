// Define the Role class
class Role {
  constructor(title, salary, dept_id) {
    (this.title = title),
      (this.salary = salary),
      (this.dept_id = dept_id),
      this.id;
  }

  getTitle() {
    return this.title;
  }

  getSalary() {
    return this.salary;
  }

  getDeptId() {
    return this.dept_id;
  }

  getID() {
    return this.id;
  }
}

module.exports = Role;
