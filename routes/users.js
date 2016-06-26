var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var auth = require(__dirname + "/../middlewares/authentication");
var database = require(__dirname + "/../middlewares/database");

router.get('/register', [auth.redirectIfLogin], function(req, res) {
    res.render('register', { title: "Register Page" });
});

router.post('/register', function(req, res) {
    var name=req.body.name.split(" ");
    database.user.create({ fname: name[0], lname: name[1], email: req.body.email, password: req.body.password }, function(err, user) {
        if (user) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            res.redirect("/dashboard");
        } else {
            res.redirect("/register");
        }
    });
});

router.get('/login', [auth.redirectIfLogin], function(req, res) {
    res.render('login', { title: "Login Page" });
});

router.post('/login', function(req, res) {
    database.user.findOne({ email: req.body.email, password: req.body.password }, function(err, user) {
        if (user) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            res.redirect("/dashboard");
        } else {
            res.redirect("/login");
        }
    });
});

router.get('/dashboard', [auth.authenticatedUser], function(req, res) {
    var boards=[];
    console.log(req.session.user._id);
    database.board.find({user:req.session.user._id}, function(err, boards){
        if(boards){
            console.log(boards);
            req.session.boards=boards;
            res.render('dashboard', { title: "Dashboard Page" , user:req.session.user, boards:boards});
        }else{
            console.log("Hello World1");
            res.render('dashboard', { title: "Dashboard Page" , user:req.session.user, boards:[]});
        }
    });
    console.log("Hello World");
});

router.post("/board/create", [auth.authenticatedUser], function(req, res){
    database.board.create({
        name:req.body.name,
        user:req.session.user._id,
        users:[req.session.user._id]
    }, function(err, board){
        if(board){
            res.redirect("/dashboard");
        }else{
            res.redirect("/dashboard");
        }
    });
});

router.post("/board/:id/task/create", [auth.authenticatedUser], function(req, res){
    database.board.findOne({_id:req.params.id}, function(err, board){
        if(board){
            console.log(board);
            var task={
                name:req.body.name,
                user:req.session.user._id,
                status:"Todo"
            }
            board.tasks.push(task);
            board.save(function(err, board){
                console.log(board);
                if(board){
                    res.redirect("/board/show/"+board._id);
                }else{
                    res.redirect("/board/show/"+board._id);
                }
            });
        }
    });
});

router.get("/board/delete/:id",[auth.authenticatedUser], function(req, res){
    database.board.remove({_id:req.params.id}, function(err, removed){
        if(removed){
            res.end("true");
        }else{
            res.end("false");
        }
    });
});

router.get("/board/:id/delete/task/:taskid",[auth.authenticatedUser], function(req, res){
    database.board.findOne({_id:req.params.id}, function(err, board){
        if(board){
            console.log(board.tasks);
            board.tasks.forEach(function(task, index){
                if(task._id==req.params.taskid){
                    board.tasks.splice(index,1);
                    board.save(function(err, data){
                        if(data){
                            res.end("true");
                        }else{
                            res.end("false");
                        }
                    });
                }
            });
        }else{
            res.end("false");
        }
    });
});

router.get("/board/:id/update/task/:taskid/:status",[auth.authenticatedUser], function(req, res){
    database.board.findOne({_id:req.params.id}, function(err, board){
        if(board){
            board.tasks.forEach(function(task, index){
                if(task._id==req.params.taskid){
                    board.tasks[index].status=req.params.status;
                    board.save(function(err, data){
                        if(data){
                            res.redirect("/board/show/"+board._id);
                        }else{
                            res.redirect("/board/show/"+board._id);
                        }
                    });
                }
            });
        }else{
            res.end("false");
        }
    });
});

router.get("/board/show/:id", [auth.authenticatedUser], function(req, res){
    database.board.findOne({_id:req.params.id}, function(err, board){
        if(board){
            console.log(board);
            res.render('board', { title: "Board Page" , user:req.session.user, board:board});
        }else{
            res.render('board', { title: "Board Page" , user:req.session.user, board:null});
        }
    })
});

router.get('/logout', function(req, res) {
    req.session.user = undefined;
    req.session.isLoggedIn = false;
    res.redirect("/login");
});

module.exports = router;
