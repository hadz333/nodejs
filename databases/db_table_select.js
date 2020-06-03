var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs_db"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT name, address FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    console.log("print one result example below");
    console.log(result[2].address);

    // the fields object is an array containing information about each field as an object.
    console.log(fields);
    // Return the name of the second field:
    console.log(fields[1].name);
  });
});

// When query values are variables provided by the user, you should escape the values.
// This is to prevent SQL injections, which is a common web hacking technique to destroy or misuse your database.
var adr = 'Mountain 21';
var sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adr);
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result);
});

// If you have multiple placeholders, the array contains multiple values, in that order:
var name = 'Amy';
var adr = 'Mountain 21';
var sql = 'SELECT * FROM customers WHERE name = ? OR address = ?';
con.query(sql, [name, adr], function (err, result) {
  if (err) throw err;
  console.log(result);
});

// limit and offset useful for paging results (show 20 results per page, show next 20 on 2nd page etc)
// Start from position 3, and return the next 5 records:
con.connect(function(err) {
  if (err) throw err;
  var sql = "SELECT * FROM customers LIMIT 5 OFFSET 2";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});

// JOIN example
/*
con.connect(function(err) {
  if (err) throw err;
  var sql = "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});
*/

// Left JOIN example
// "Left" table is the first table in the SELECT statement
// Left JOIN will include all entries in left table regardless if they meet condition
/*
SELECT users.name AS user,
products.name AS favorite
FROM users
LEFT JOIN products ON users.favorite_product = products.id
*/

// Right JOIN example
// "Right" table is the second table in SELECT statement
// includes all entries in the right table regardless if they meet condition(s)
/*
SELECT users.name AS user,
products.name AS favorite
FROM users
RIGHT JOIN products ON users.favorite_product = products.id
*/

// Result of last statement (RIGHT JOIN):
/*
[
  { user: 'John', favorite: 'Chocolate Heaven' },
  { user: 'Peter', favorite: 'Chocolate Heaven' },
  { user: 'Amy', favorite: 'Tasty Lemons' },
  { user: null, favorite: 'Vanilla Dreams' }
]
*/