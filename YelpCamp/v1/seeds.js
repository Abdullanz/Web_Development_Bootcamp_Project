var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var Review = require("./models/review");
var User = require("./models/user");


/**
 * To seed the database
 */
var seeds = [{}];




/**
 * To seed the database with default information
 */
async function seedDB() {
    try {
        //await means waiting for this event until it finishes
        //so we wait until the campgrounds & comments are removed
        await Campground.deleteMany({});
        console.log("Campgrounds removed!!");
        await Comment.deleteMany({});
        console.log("Comments removed!!");
        await Review.deleteMany({});
        console.log("Reviews removed!!");
        await User.deleteMany({});
        console.log("Users removed!!");
    } catch (err) {
        console.log(err);
    }
}

module.exports = seedDB;
