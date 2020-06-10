var express = require('express');
var app = express();

var things = require('./things.js');


app.get('/', function(req, res){
   res.send("Hello world!");
});

app.get('/hello', function(req, res){
   res.send("Hello World from the /hello path!");
});

app.post('/hello', function(req, res){
   res.send("You just called the post method at '/hello'!\n");
});

app.all('/test', function(req, res){
   res.send("HTTP method doesn't have any effect on this route!");
});

//both index.js and things.js should be in same directory
app.use('/things', things);

// if put before other definitions, this will always be called i.e. even if you add /things to url
app.get('/:id', function(req, res){
   res.send('The id you specified is ' + req.params.id);
});

app.get('/things/:name/:id', function(req, res) {
   res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

// You can also use regex to restrict URL parameter matching. Let us assume you need the id 
// to be a 5-digit long number. You can use the following route definition: 
app.get('/things/:id([0-9]{5})', function(req, res){
   res.send('id: ' + req.params.id);
});

//Other routes here
app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});


app.listen(3000);