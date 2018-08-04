var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Please select from menu options",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        viewProducts();
        break;

      case "View Low Inventory":
        viewLowInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        addNewProduct();
        break;
      }
    });
}

function viewProducts() {
    var query = "SELECT *FROM products";
    connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
        console.log("Product Id: " + res[i].id + " || Product Name: " + res[i].product_name + 
        " || Price: " + res[i].price + " || Quantity: " + res[i].quantity);
    }
    runSearch();
    });

}

function viewLowInventory() {
  var query = "SELECT * FROM products WHERE quantity < 5";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
        console.log("Product Id: " + res[i].id + " || Product Name: " + res[i].product_name + 
        " || Price: " + res[i].price + " || Quantity: " + res[i].quantity);
    }
    runSearch();
  });
}

function addInventory() {
    inquirer.prompt([
        {
            name: "productId",
            type: "input",
            message: "Which product ID you would like to add?",
            default: 1        
        }, {
            name: "quantity",
            type: "input",
            message: "How many units would you like to add?",
            default: 1        
        }                             
        ]).then(function(answers) {
            // console.log(answers);  
            var query = "SELECT quantity FROM products WHERE id = ?";
            connection.query(query, answers.productId, function(err, res) {
                if (err) throw err;
                let quantity = parseInt(res[0].quantity);
                let newQuantity = parseInt(answers.quantity) + parseInt(quantity);
             
                var query = "UPDATE products SET quantity = ? WHERE id = ?";                                       
                connection.query(query, [newQuantity, answers.productId], function(err, res) {
                    if (err) throw err;
                    console.log("Product Id: " + answers.productId + " || New Quantity: " + newQuantity);
                })    
            });     
        })   
}

function addNewProduct() {
    inquirer.prompt([
        {
            name: "productId",
            type: "input",
            message: "Please enter new product ID",
            default: 1        
        }, {
            name: "productName",
            type: "input",
            message: "Please enter new product name",
            default: 1
        }, {
            name: "deptName",
            type: "input",
            message: "Please enter department name",
            default: 1  
        }, {
            name: "price",
            type: "input",
            message: "Please enter price per unit",
            default: 1
        }, {
            name: "quantity",
            type: "input",
            message: "Please enter product quantity",
            default: 1          
        }                             
        ]).then(function(answers) {
            console.log("productID: " + answers.productId);  
            console.log("productName: " + answers.productName); 
            console.log("deptName: " + answers.deptName); 
            console.log("price: " + answers.price); 
            console.log("quantity: " + answers.quantity); 
            var query = "INSERT INTO products (id, product_name, department_name, price, quantity)" +
                " VALUES(?, ?, ?, ?, ?)";
            connection.query(query, [answers.productId, answers.productName, answers.deptName,
                answers.price, answers.quantity], function(err, res) {
                if (err) throw err;
 
            });     
        })   
}
