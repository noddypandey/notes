var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('cookie-session');
var database = require(__dirname + "/middlewares/database");
var config = require(__dirname + "/config/config");

//Database configuration
database.init();
//var User = database.initUser();

//Get All User Specific routes
var routes = require(__dirname + "/routes/users");

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

app.get("/", function(req, res) {
    res.end("Hello World");
})

app.listen(config.port, function() {
    console.log("Server listening on port " + config.port);
});
