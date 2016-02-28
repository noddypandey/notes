var auth = {};

auth.redirectIfLogin = function(req, res, next) {
    if (req.session.isLoggedIn !== "undefined" && req.session.isLoggedIn !== false) {
        res.redirect("/dashboard");
    }
    next();
}

auth.authenticatedUser = function(req, res, next) {
    if (req.session.isLoggedIn === "undefined" || req.session.isLoggedIn === false) {
        res.redirect("/login");
    }
    next();
}

module.exports = auth;
