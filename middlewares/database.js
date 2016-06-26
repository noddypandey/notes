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

    var User = mongoose.model('User', UserSchema);
    return User;
}


database.initBoard=function(){
    var BoardSchema=mongoose.Schema({
        name:String,
        createdAt:{ type: Date},
        updatedAt:{type:Date, default:Date.now},
        users:[],
        user:mongoose.Schema.Types.ObjectId,
        tasks:[
            {
                name:String,
                createdAt:{type: Date},
                updatedAt:{type:Date, default:Date.now},
                user:mongoose.Schema.Types.ObjectId,
                status:{
                    type:String,
                    enum:["Todo", "Doing", "Done"]
                },
                comments:[{
                    description:String,
                    createdAt:{type: Date},
                    user:mongoose.Schema.Types.ObjectId
                }]
            }
        ]
    });

    var Board = mongoose.model('Board', BoardSchema);
    return Board;
}


database.user = database.initUser();
database.board = database.initBoard();

module.exports = database;
