const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "bamazonDB"
})

connection.connect(function(err) {
    if (err) throw err;
})

function getCommand() {
    inquirer.prompt([
    {
        name: "productId",
        type: "input",
        message: "What is the product ID you would like to buy?",
        default: 1        
    }, {
        name: "quantity",
        type: "input",
        message: "How many units would you like to buy?",
        default: 1        
    }                             
    ]).then(function(answers) {
        // console.log(answers);                                         
        connection.query("SELECT quantity FROM products WHERE id = ?", answers.productId, function(err, res) {
            if (err) throw err;
            // if(res.quantity)
            // console.log(answers.quantity);
            // console.log(res[0].quantity);
            let custQuantity = parseInt(answers.quantity);
            if(parseInt(res[0].quantity) > parseInt(answers.quantity))
                proceedCheckout(custQuantity, res[0].quantity, answers.productId);
            else
                console.log("Insufficient quantity");
        })         
    })        
}
getCommand();

function proceedCheckout(custQuantity, inventory, productId) {
    let remain = inventory - custQuantity;
    var query = "UPDATE products SET quantity = ? WHERE id = ?";
    connection.query(query, [remain, productId], function(err, res) {
        if (err) throw err;
        // console.log(res);
        printTotal(custQuantity, productId);
    })               
}
    
function printTotal (custQuantity, productId) {
    var query = "SELECT price FROM products WHERE id = ?";
    connection.query(query, productId, function(err, res) {
        if (err) throw err;
        let total = res[0].price * custQuantity;
        console.log("Your Total Cost: $" + total);
        
    }) 
}

 