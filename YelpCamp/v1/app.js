var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js"),
    seedDB = require("./seeds.js"),
    User = require("./models/user.js");




/**
 * To call the routes
 */
var commentRoutes = require("./routes/comments"),
    reviewRoutes = require("./routes/reviews"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");


/**
 * To conncet to local database
 */
mongoose.connect("mongodb://localhost/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


/**
 * To 
 */
app.use(bodyParser.urlencoded({ extended: true })); //Tp set up body parser
app.set("view engine", "ejs"); //To setup the ejs file types
app.use(express.static(__dirname + "/public")); //To access styling sheets
app.use(methodOverride("_method")); //

seedDB(); //To seed the database with default data


/**
 * PASSPORT CONFIGURATION
 */
app.use(
    require("express-session")({
        secret: "Rusty is the best",
        resave: false,
        saveUninitialized: false,
    })
);





/**
 * Inits to use libraries as a middleware
 */
app.use(flash());
app.locals.moment = require("moment");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/**
 * it would run for every single route
 */
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});




/**
 * To use these routes
 */
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

//To connect to server ports
app.listen(3000, function() {
    console.log("The Server Has Started!");
});
