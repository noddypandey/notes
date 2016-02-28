var express = require('express');
var app = express();

// Set view folder
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.end("Hello Express");
});

app.get('/users', function(req, res) {
    res.render("users");
});

app.listen(3000, function() {
    console.log("Server listening on port 3000");
});
