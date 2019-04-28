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
  password: "Ahamay125!",
  database: "bamazondb"
});
//the below uses cli table to format the output - you push the response 
//items into an array after iterating through the response

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
//need to get item to add into inquirer question
//here we request that the user enter an item id and we pass that to our SQL
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
          //1st check to see if we got a value back
          console.log("Please enter a valid item");
          customerChoice();
        }
        //now ask for the quantity
        else {
          inquirer.prompt({

            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
          })
            .then(function (antwo) {
              //wait for a response
              var quantity = antwo.quantity;
              var updatedQuantity = res[0].stock_quantity - quantity;
              var totalOrderPrice = quantity * res[0].price;
              //check to see if customer has ordered more than avail
              if (quantity > res[0].stock_quantity) {
                console.log("We don't have sufficient stock. Please enter a lower quantity.")
                customerChoice();
              }
              //if there is enough then reduce the inventory by amount ordered - this is currently broken
              else {
                connection.query("UPDATE products SET stock_quantity  =? where item_id =?", [updatedQuantity, choice],
                  function (err, res) {
                    if (err) throw err;
                  })                
                console.log("We've fufilled your order.  Your cost was $" + totalOrderPrice);
                process.exit(-1);; //exit once order complete
              }
            })
        }
      })
  })
}

showAllItems();
