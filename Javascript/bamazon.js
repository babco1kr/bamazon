var mysql = require("mysql");
var inquirer = require("inquirer");

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

          for (i = 0; i < results.length; i ++) {
            console.log(results[i]);
          }
      });
  }