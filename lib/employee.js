// Define the employee class
class Employee {
  constructor(first_name, last_name, role_id, manager_id, is_manager) {
    this.id,
      (this.first_name = first_name),
      (this.last_name = last_name),
      (this.role_id = role_id),
      (this.manager_id = manager_id),
      (this.is_manager = is_manager);
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

module.exports = Employee;
