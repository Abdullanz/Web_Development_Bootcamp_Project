//all middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var Review = require("../models/review");


var middlewareObj = {};

//middleware to check for campground ownership
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                req.flash("error", "لم نجد المنتج");
                res.redirect("back");
            } else {
                if (
                    foundCampground.author.id.equals(req.user._id) ||
                    req.user.isAdmin
                ) {
                    next();
                } else {
                    req.flash("error", "ليس لديك تصريح للقيام بذلك");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "عليك تسجيل الدخول للقيام بذلك");
        res.redirect("back");
    }
}

//middleware to check for comment ownership
middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                req.flash("error", "التعليق غير موجود");
                res.redirect("back");
            } else {
                if (
                    foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "ليس لديك تصريح للقيام بذلك");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "عليك تسجيل الدخول للقيام بذلك");
        res.redirect("back");
    }
}


//middleware function to verify if the user is logged in or not
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "عليك تسجيل الدخول للقيام بذلك");
    res.redirect("/login");
}


//review
middlewareObj.checkReviewOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Review.findById(req.params.review_id, function(err, foundReview) {
            if (err || !foundReview) {
                res.redirect("back");
            } else {
                // does user own the comment?
                if (
                    foundReview.author.id.equals(req.user._id) ||
                    (req.user.isAdmin)
                ) {
                    next();
                } else {
                    req.flash("error", "ليس لديك تصريح للقيام بذلك");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "عليك تسجيل الدخول للقيام بذلك");
        res.redirect("back");
    }
};



//review
middlewareObj.checkReviewExistence = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id)
            .populate("reviews")
            .exec(function(err, foundCampground) {
                if (err || !foundCampground) {
                    req.flash("error", "المنتج غير موجود");
                    res.redirect("back");
                } else {
                    // check if req.user._id exists in foundCampground.reviews
                    var foundUserReview = foundCampground.reviews.some(function(review) {
                        return review.author.id.equals(req.user._id);
                    });
                    if (foundUserReview) {
                        req.flash("error", "لقد قمت بكتابة تقييم مسبقا");
                        return res.redirect("/campgrounds/" + foundCampground._id);
                    }
                    // if the review was not found, go to the next middleware
                    next();
                }
            });
    } else {
        req.flash("error", "عليك تسجيل الدخول أولا");
        res.redirect("back");
    }
};


module.exports = middlewareObj