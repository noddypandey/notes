var mongoose = require('mongoose');

var database = {};

database.init = function() {
    mongoose.connect('mongodb://localhost/todo');
    db = mongoose.connection;
    return db;
}

database.initUser = function() {
    var UserSchema = mongoose.Schema({
        fname: String,
        lname: String,
        email: String,
        password: String
    });

    var User = mongoose.model('users', UserSchema);
    return User;
}

database.user = database.initUser();

module.exports = database;
