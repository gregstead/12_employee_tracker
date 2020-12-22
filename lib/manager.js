const Employee = require("./employee");

class Manager extends Employee {
  constructor(first_name, last_name, role_id, manager_id, isManager) {
    super(first_name, last_name, role_id, manager_id);
    this.id;
    this.isManager = isManager;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.last_name;
  }

  getRoleId() {
    return this.role_id;
  }

  getMgrId() {
    return this.manager_id;
  }

  getID() {
    return this.id;
  }
}

module.exports = Manager;
