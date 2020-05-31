/**
 * Author: Abdullah Najjar
 * Date:
 * Description: 
 * filename: Campgrounds.js
 */
var mongoose = require("mongoose"); //
var Comment = require("./comment"); //
var Review = require("./review"); //



/**
 * Campgrounds Schema
 */
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
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
        type: Number,
        default: 0,
    },
});



/**
 * The model to be exported too.
 */
module.exports = mongoose.model("Campground", campgroundSchema);