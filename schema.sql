DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT(10) AUTO_INCREMENT NOT NULL,
    name VARCHAR (30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT(10) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT(10),
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT(10) AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    roleId INT,
    managerId INT DEFAULT NULL,
    PRIMARY KEY(id)
);