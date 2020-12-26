USE employees_db;

INSERT INTO departments (dept_name)
VALUES ('House Baratheon'),('House Stark'), ('House Lannister');

INSERT INTO roles (title, salary, dept_id)
VALUES ('King of the Seven Kingdoms', 100000, 1),
('Warden of the North', 15000,2),
('Member of the Kingsguard', 10000,3),
('Lady of Winterfell', 10000,2);

INSERT INTO employees (first_name, last_name, role_id, manager_id, is_manager)
VALUES ('Robert','Baratheon', 1, Null, true), 
('Ned', 'Stark', 2, 1, true),
('Jaime', 'Lannister',3,1,true),
('Catelyn', 'Stark',4,2,false);