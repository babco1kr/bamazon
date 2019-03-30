var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    //Begin
    begin();

});

function begin() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Product Sales by Department", "Create new Department", "Exit"],
            name: "action"
        }
    ]).then(function(answer){
        switch(answer.action) {
            case "View Product Sales by Department":
            viewProduct();
            break;

            case "Create new Department":
            createDepartment();
            break;

            case "Exit":
            connection.end();
        }
    })
}

function viewProduct() {
    // connection.query(
    //     ""
    // )
}

function createDepartment() {

}