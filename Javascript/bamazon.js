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
  
  connection.connect(function(err) {
    if (err) throw err;
    //Begin
    begin();
    connection.end();
  });

  function begin() {
      connection.query("select * from products", function(error, results){
          if (error) throw error;

          var table = new Table({
              head: ["ID", "Name", "Department", "Price", "In Stock"],
              colWidths: [10, 20, 20, 20, 10]
          });

          for (i = 0; i < results.length; i ++) {
              table.push(
                  [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
              );
          }
          console.log(table.toString());
          buy();
      });
  }

  function buy () {
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
      ]).then(function(answer) {
          connection.query(
              "select `stock_quantity` where `item_id` = ?", answer.id
          )

          console.log(answer.id);
      })
  }