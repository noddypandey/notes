var mongoose = require('mongoose');
var config = require(__dirname + "/../config/config");

var database = {};

database.init = function() {
    mongoose.connect(config.dbstring);
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
