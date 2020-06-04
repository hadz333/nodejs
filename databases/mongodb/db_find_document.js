/*
In MongoDB we use the find and findOne methods to find data in a collection.
Just like the SELECT statement is used to find data in a table in a MySQL database.
*/

// Find the first document in the customers collection:
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
  });
});

/*
The find() method returns all occurrences in the selection.
The first parameter of the find() method is a query object. In this example we use an empty query object, 
which selects all documents in the collection.

No parameters in the find() method gives you the same result as SELECT * in MySQL.
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

/*
The second parameter of the find() method is the projection object that describes which fields to include in the result.
This parameter is optional, and if omitted, all fields will be included in the result.
*/
// Return the fields "name" and "address" of all documents in the customers collection:
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

// This example will return only the "name" field:
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").find({}, { projection: { _id: 0, name: 1 } }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

// Setting a field to 0 will set all other fields to 1, and vice versa.
// Everything EXCEPT the name field will be in result:
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").find({}, { projection: { name: 0 } }).toArray(function(err, result) {
    if (err) throw err;
    console.log("hello this is last");
    console.log(result);
    console.log(result[2].address);
    db.close();
  });
});


// The first argument of the find() method is a query object, and is used to limit the search.

// Find documents with the address "Park Lane 38":
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { address: "Park Lane 38" };
  dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

// Find documents where the address starts with the letter "S":
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { address: /^S/ };
  dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});


/*
Use the sort() method to sort the result in ascending or descending order.
The sort() method takes one parameter, an object defining the sorting order.
*/

// Sort the result alphabetically by name: 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  // { name: 1 } is ascending
  // { name: -1 } is descending
  var mysort = { name: 1 };
  dbo.collection("customers").find().sort(mysort).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
  /*
	SQL Translation:
	SELECT * 
	FROM customers
	SORT BY name ASC;
  */
});

/*
To delete a record, or document as it is called in MongoDB, we use the deleteOne() method.

The first parameter of the deleteOne() method is a query object defining which document to delete.
Note: If the query finds more than one document, only the first occurrence is deleted.
*/
// Delete the document with the address "Mountain 21":
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { address: 'Mountain 21' };
  dbo.collection("customers").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});

/*
To delete more than one document, use the deleteMany() method.

The first parameter of the deleteMany() method is a query object defining which documents to delete.
*/
// Delete all documents where the address starts with the letter "O":
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { address: /^O/ };
  dbo.collection("customers").deleteMany(myquery, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
    db.close();
  });
});

/*
You can delete a table, or collection as it is called in MongoDB, by using the drop() method.

The drop() method takes a callback function containing the error object and the result parameter 
which returns true if the collection was dropped successfully, otherwise it returns false.
*/
// Delete the "customers" table:
/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});
*/


/*
You can update a record, or document as it is called in MongoDB, by using the updateOne() method.

The first parameter of the updateOne() method is a query object defining which document to update.
Note: If the query finds more than one record, only the first occurrence is updated.

The second parameter is an object defining the new values of the document.
*/
// Update the document with the address "Valley 345" to name="Mickey" and address="Canyon 123":
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { address: "Valley 345" };
  // When using the $set operator, only the specified fields are updated:
  var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
  dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});

/*
To update all documents that meets the criteria of the query, use the updateMany() method.
*/
// Update all documents where the name starts with the letter "S":
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { address: /^S/ };
  var newvalues = {$set: {name: "Minnie"} };
  dbo.collection("customers").updateMany(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " document(s) updated");
    db.close();
  });
});

/*
The limit() method takes one parameter, a number defining how many documents to return.
*/
// Limit the result to only return 5 documents:
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").find().limit(5).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

// JOINs
/*
MongoDB is not a relational database, but you can perform a left outer join by using the $lookup stage.

The $lookup stage lets you specify which collection you want to join with the current collection, and which fields that should match.

Consider you have a "orders" collection and a "products" collection:

orders:
[
  { _id: 1, product_id: 154, status: 1 }
]

products:
[
  { _id: 154, name: 'Chocolate Heaven' },
  { _id: 155, name: 'Tasty Lemons' },
  { _id: 156, name: 'Vanilla Dreams' }
]

Join the matching "products" document(s) to the "orders" collection:
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection('orders').aggregate([
    { $lookup:
       {
         from: 'products',
         localField: 'product_id',
         foreignField: '_id',
         as: 'orderdetails'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});

Which will give you the result:
[
  { "_id": 1, "product_id": 154, "status": 1, "orderdetails": [
    { "_id": 154, "name": "Chocolate Heaven" } ]
  }
]
*/
