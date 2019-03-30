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
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            name: "action"
        }
    ]).then(function(answer){
        switch(answer.action) {
            case "View Products for Sale":
            view();
            break;

            case "View Low Inventory":
            lowInventory();
            break;

            case "Add to Inventory":
            addInventory();
            break;

            case "Add New Product":
            addProduct();
            break;

            case "Exit":
            connection.end();
        }
    })
}

function view() {
    connection.query("select * from products", function (error, results) {
        if (error) throw error;

        var table = new Table({
            head: ["ID", "Name", "Department", "Price", "In Stock"],
            colWidths: [10, 20, 20, 20, 10]
        });

        for (i = 0; i < results.length; i++) {
            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
            );
        }
        console.log(table.toString());
        begin();
    });
}

function lowInventory() {
    connection.query(
        "select * from products where stock_quantity < 5", function(error, results) {
            if (error) throw error;

            var table = new Table({
                head: ["ID", "Name", "Department", "Price", "In Stock"],
                colWidths: [10, 20, 20, 20, 10]
            });

            
            for (i = 0; i < results.length; i++) {
                table.push(
                    [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
                );
            }
            console.log(table.toString());
            begin();
        }
    )
}

function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the item to add inventory?",
            name: "id"
        },
        {
            type: "input",
            message: "How much would you like to add?",
            name: "number"
        }
    ]).then(function(answer){
        connection.query("update products set stock_quantity = stock_quantity + ? where ?", answer.number, {item_id: answer.id}, function(error, results){
            if (error) throw error;
            console.log("Update complete");
            begin();
        })
        
        
        
    })
}

function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the product name?",
            name: "name"
        },
        {
            type: "input",
            message: "What department does this product belong to?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the price of the product?",
            name: "price"
        },
        {
            type: "input",
            message: "How much of this product do we have in stock?",
            name: "stock"
        }
    ]).then(function(answer) {
        connection.query(
            "insert into products set ?", 
            {
                product_name: answer.name,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.stock
            }, function(error, results) {
                if (error) throw error;
                console.log(results.affectedRows + "product inserted!\n");
                begin();
            }
        )
    })
}