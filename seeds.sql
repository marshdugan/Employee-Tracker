USE employee_DB;

--Populating department table
INSERT INTO department(name) VALUES ("Sales"), ("Engineering"), ("Finace"), ("Legal"), ("HR");

--Populating role table
INSERT INTO role(title, salary, department_id) VALUES ("Salesperson", 80000, 1), ("Sales Lead", 110000, 1), ("Software Developer", 100000, 2), ("Senior Software Developer", 150000, 2), ("Lawyer", 120000, 4), ("Lead Legal Team", 200000, 4), ("HR Rep", 70000, 5), ("Engineer", 100000, 2), ("Lead Engineer", 180000, 2), ("Accountant", 130000, 3)
