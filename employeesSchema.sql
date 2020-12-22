DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments(
    id INTEGER AUTO_INCREMENT,
    dept_name VARCHAR(30),
    PRIMARY KEY (id)
);


CREATE TABLE roles(
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    dept_id INTEGER,
    FOREIGN KEY (dept_id) REFERENCES departments(id),
    PRIMARY KEY (id)
);

CREATE TABLE employees(
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id),
    PRIMARY KEY (id)
);