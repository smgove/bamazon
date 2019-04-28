var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

//connection info for mysql DB
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazondb"
});


var showAllItems = function () {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    var table = new Table({
      head: ['Product Id', 'Product Description', 'Department','Cost','Quantity'],
      colWidths: [10, 40, 20, 8, 10],
    });
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
    console.log(table.toString());
    customerChoice()
  });
};

var customerChoice = function () {
  inquirer.prompt({
    name: "myProduct",
    type: "input",
    message: "Which item do you want to buy(enter the ID)?"
  }).then(function (anone) {
    var choice = anone.myProduct;
    connection.query(
      "SELECT * from products where item_id=?", choice,
      function (err, res) {
        if (err) throw err;
        if (res.length === 0) {
     
          console.log("Please enter a valid item");
          customerChoice();
        }
       
        else {
          inquirer.prompt({

            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
          })
            .then(function (antwo) {
              var quantity = antwo.quantity;
              var updatedQuantity = res[0].stock_quantity - quantity;
              var totalOrderPrice = quantity * res[0].price;
            
              if (quantity > res[0].stock_quantity) {
                console.log("We don't have sufficient stock. Please enter a lower quantity.")
                customerChoice();
              }
              
              else {
                connection.query("UPDATE products SET stock_quantity  =? where item_id =?", [updatedQuantity, choice],
                  function (err, res) {
                    if (err) throw err;
                  })                
                console.log("We've fufilled your order.  Your cost was $" + totalOrderPrice);
                process.exit(-1);; 
              }
            })
        }
      })
  })
}

showAllItems();
