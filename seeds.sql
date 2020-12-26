USE employees_db;

INSERT INTO departments (dept_name)
VALUES ('House Baratheon'),('House Stark'), ('House Lannister'), ('House Targaryen'), ('House Mormont');

INSERT INTO roles (title, salary, dept_id)
VALUES ('King of the Seven Kingdoms', 100000, 1),
('Queen of the Seven Kingdoms', 990000,1)
('Warden of the North', 15000,2),
('Member of the Kingsguard', 10000,3),
('Lady of Winterfell', 10000,2),
('exiled Princess', 1000,4),
('exiled Knight', 500,5),
('exiled Prince and Heir', 1001,4),
('bastard',5,2),
('Heir to Winterfell',11000,2);


INSERT INTO employees (first_name, last_name, role_id, manager_id, is_manager)
VALUES ('Robert','Baratheon', 1, Null, true), 
('Ned', 'Stark', 3, 1, true),
('Jaime', 'Lannister',4,1,true),
('Catelyn', 'Stark',5,2,true),
('Cersei','Lannister',2,1,true),
('Daenerys', 'Targaryen',6,Null,true),
('Jorah', 'Mormont',7,6,false),
('Viserys', 'Targaryen',8,Null,true),
('Jon', 'Snow',9,2,false),
('Robb', 'Stark',10,2,true);