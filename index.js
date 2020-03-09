const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();

const connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_PASS,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) throw err;
    
});