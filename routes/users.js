var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var auth = require(__dirname + "/../middlewares/authentication");
var database = require(__dirname + "/../middlewares/database");



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
    res.render('dashboard', { title: "Dashboard Page" });
});

router.get('/logout', function(req, res) {
    req.session.user = undefined;
    req.session.isLoggedIn = false;
    res.redirect("/login");
});

module.exports = router;
