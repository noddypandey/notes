var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('cookie-session');
var database = require(__dirname + "/middlewares/database");

//Database configuration
database.init();
//var User = database.initUser();

//Get All User Specific routes
var routes = require(__dirname + "/routes/users");
//Get All Admin Specific routes
var admin = require(__dirname + "/routes/admin");

// Set view folder
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//Serving static folders
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/bower_components"));


//Middlewares
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

app.use("/", routes);
app.use("/admin/", admin);



/*app.get('/users', function(req, res) {
    /*res.render("users", {
        users: [
            { name: "Nandan Pandey", age: "21" },
{ name: "Prashant Yadav", age: "22" }
        ]
    });*/
/*
    res.json({
        users: [
            { id: 1, name: "Nandan Pandey", age: "21" },
            { id: 2, name: "Prashant Yadav", age: "22" }
        ]
    });
});

app.get('/user', function(req, res) {
    res.render("users");
});*/

app.listen(3000, function() {
    console.log("Server listening on port 3000");
});
