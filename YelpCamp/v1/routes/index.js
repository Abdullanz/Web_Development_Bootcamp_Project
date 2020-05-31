var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//landing page
router.get("/", function(req, res) {
    res.render("landing");
});


//show the register form
router.get("/register", function(req, res) {
    res.render("register");
});


//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    if (req.body.adminCode === "Admin123") {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "أهلا بك في البزنس صديقنا " + user.username);
            res.redirect("/campgrounds");
        });
    });
});


// show login form
router.get("/login", function(req, res) {
    res.render("login");
});


//handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {

});


//LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logOut();
    req.flash("success", "نراك لاحقا");
    res.redirect("/campgrounds");
});


module.exports = router;