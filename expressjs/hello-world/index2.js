var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

app.get('/', function(req, res){
   res.render('form');
});

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});

// mongoose (mongoDB interaction with form)

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');
var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);

app.get('/person', function(req, res){
   res.render('person');
});

app.post('/person', function(req, res){
   var personInfo = req.body; //Get the parsed information
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
         message: "Sorry, you provided wrong info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });

      newPerson.save(function(err, Person){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added", type: "success", person: personInfo});
      });
   }
});

// data fetching from mongoDB
// This will fetch all the documents from the person's collection.
Person.find(function(err, response){
   console.log(response);
});

// This will fetch all documents where field name is "Ayush" and age is 20.
Person.find({name: "Ayush", age: 20},
   function(err, response){
      console.log(response);
});

// If we only want the names of the people whose nationality is "Indian",
Person.find({nationality: "Indian"}, "name", function(err, response){
   console.log(response);
});

// A route to view all people records:

app.get('/people', function(req, res){
   Person.find(function(err, response){
      res.json(response);
   });
});

// route that Finds by ID and updates
app.put('/people/:id', function(req, res){
   Person.findByIdAndUpdate(req.params.id, req.body, function(err, response){
      if(err) res.json({message: "Error in updating person with id " + req.params.id});
      res.json(response);
   });
});

// this route uses a session variable to keep count of your views
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

app.get('/viewcounter', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});

app.listen(3000);
