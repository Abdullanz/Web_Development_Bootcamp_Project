var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var Review = require("./models/review");
var User = require("./models/user");


/**
 * 
 */
var seeds = [{
    name: "Cloud's Rest",
    price: "22.00",
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        username: String,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }, ],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    }, ],
    rating: {
        type: 4,
        default: 0,
    },
}, ];




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
        //like python feature for this of that loop
        for (const seed of seeds) {
            let campground = await Campground.create(seed);
            console.log("Campground created");
            let comment = await Comment.create({
                text: "This place is great, but I wish there was internet",
                author: "Homer",
            });
            console.log("Comment created");
            campground.comments.push(comment);
            campground.save();
            console.log("Comment added to campground");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = seedDB;