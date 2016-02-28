var express = require('express');
var router = express.Router();
var auth = require(__dirname + "/../middlewares/authentication");

router.get('/login', [auth.redirectIfLogin], function(req, res) {
    res.render('login', { title: "Admin Login Page" });
});

router.post('/login', function(req, res) {
    if (req.body.email === "admin" && req.body.password === "admin") {
        req.session.user = { email: "admin", password: "admin" };
        req.session.isLoggedIn = true;
        res.redirect("/dashboard");
    } else {
        res.redirect("/login");
    }
});

router.get('/dashboard', [auth.authenticatedUser], function(req, res) {
    res.render('dashboard', { title: "Admin Dashboard Page" });
});

router.get('/logout', function(req, res) {
    req.session.user = undefined;
    req.session.isLoggedIn = false;
    res.redirect("/login");
});

module.exports = router;
