const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();
require("console.table");

const questions = ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Exit"]

const roles = ["Salesperson", "Sales Lead", "Software Developer", "Senior Software Developer", "Lawyer", "Lead Legal Team", "HR Rep", "Engineer", "Lead Engineer", "Accountant"];

const connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_PASS,
    database: "employee_DB"
});

connection.connect(err => {
    if (err) throw err;
    allQuestions();
});

function allQuestions() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            default: "Use arrow keys",
            choices: questions,
            name: "choice"
        }
    ]).then(function({choice}) {
        console.log(choice);
        if (choice === questions[0]) { //View all
            viewEmployee();
        } else if (choice === questions[1]) { //View all by department
            viewByDepartment();
        } else if (choice === questions[2]) { //View all by manager
            viewByManager();
        } else if (choice === questions[3]) { //Add employee
            addEmployee();
        } else if (choice === questions[4]) { //Remove employee
            removeEmployee();
        } else if (choice === questions[5]) { //Update employee role
            updateEmployee();
        } else if (choice === questions[6]) { //Update employee manager
            updateEmployee();
        }
        else {
            connection.end();
        }
    });
}

function viewEmployee() {
    connection.query(`SELECT firstName AS 'First Name', 
    lastName AS 'Last Name', 
    role.title AS Title, 
    department.name AS Department, 
    managerId as Manager
    FROM ((employee 
    INNER JOIN role ON employee.roleId = role.id)
    INNER JOIN department ON role.department_id = department.id)`, function(err, data) {
        if (err) throw err;
        console.table(data);
        allQuestions();
    });
}

function viewByDepartment() {
    connection.query("SELECT * FROM employee INNER JOIN department ON employee.department = department.id")
}

function viewByManager() {

}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the employee?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the last name of the employee?",
            name: "lastName"
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: roles,
            name: "role"
        },
        {
            type: "input",
            message: "Who is that manager of this employee?",
            name: "manager"
        }
    ]).then(function(data) {
        connection.query(`SELECT id FROM role WHERE role.title = "${data.role}"`, function(err, res) {
            if (err) throw err;
            console.log(res[0].id);
            connection.query("INSERT INTO employee SET ?", [
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    roleid: res[0].id,
                    managerId: data.manager
                }
            ], function(err, res) {
                if (err) throw err;
                allQuestions();
            });
        });
    });
}