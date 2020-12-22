const Employee = require("./employee");

class Manager extends Employee {
  constructor(id, first_name, last_name, role_id, manager_id, isManager) {
    super(id, first_name, last_name, role_id, manager_id);
    this.isManager = isManager;
  }
}

module.exports = Manager;
