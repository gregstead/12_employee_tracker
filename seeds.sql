USE employees_db;

INSERT INTO employees (first_name, last_name)
VALUES ("Joan", "Smith");

INSERT INTO departments (dept_name)
VALUES ('HR');

INSERT INTO roles (title, salary, dept_id)
VALUES ('HR Director', 70000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Greg", "Stead", 1, NULL), ("John", "Smith", 1, 1);
