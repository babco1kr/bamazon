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

// On conncecting calls function to start the application
connection.connect(function (err) {
    if (err) throw err;
    //Begin
    begin();
});



function begin() {
    // SQL Query to select all items from a table
    connection.query("select * from products", function (error, results) {
        if (error) throw error;

        var table = new Table({
            head: ["ID", "Name", "Department", "Price", "In Stock", "Product Sales"],
            colWidths: [10, 20, 20, 20, 10, 20]
        });

        for (i = 0; i < results.length; i++) {
            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, "$"  + results[i].price, results[i].stock_quantity, "$" + results[i].product_sales]
            );
        }
        console.log(table.toString());
        toPurchase();
    });
}

// Prompt that asks the user what the want to do
function toPurchase(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Buy", "Exit"],
            name: "decision"
        }

        //Based on the users response the program either ends or calls the buy function
    ]).then(function(answer) {
        switch(answer.decision){
            case "Buy":
            buy();
            break;

            case "Exit":
            connection.end();
        }
    })
}

// Asks user for ID of item and quantity to buy
function buy() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the product you'd like to buy?",
            name: "id"
        },
        {
            type: "input",
            message: "How much would you like to buy?",
            name: "amount"
        }
        // Selectes item from DB and makes suer there is enough to purchase
    ]).then(function (answer) {
        connection.query(
            "SELECT * FROM `products` WHERE `item_id` = ?", answer.id, function (error, results) {
                if (error) throw error;
                // console.log(results[0].stock_quantity);
                if (answer.amount > results[0].stock_quantity) {
                    console.log("Insufficient quantity!");
                    connection.end();
                } else {
                    // Updates the inventory and totals the sale cost to show the user and add to the product sales
                    connection.query(
                        "UPDATE `products` SET ? WHERE ?",
                        [
                            {
                                stock_quantity: results[0].stock_quantity - answer.amount,
                                product_sales: ((results[0].price * answer.amount) + results[0].product_sales)
                            },
                            {
                                item_id: answer.id
                            },
                        ],
                        function (error) {
                            if (error) throw error;
                            console.log("Purchased, Your total is: $" + results[0].price * answer.amount);
                            begin();
                        }
                    )
                }
            }
        );

    })

}