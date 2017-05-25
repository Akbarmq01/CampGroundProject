var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// new comment

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn,function(req, res) {
    
    Campground.findById(req.params.id, function(err,campground){
        if(err)
            console.log(err);
        else
            res.render("comment/new", {campground:campground});        
    });
    
});

// put comment in db

router.post("/campgrounds/:id/comments", middleware.isLoggedIn,function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err)
            console.log(err);
        else{
            req.flash("error", "Something went wrong");
            Comment.create(req.body.comment, function(err, comment){
               if(err)
                    console.log(err);
               else{
                   // add a username and id to comment 
                   comment.Author.Id = req.user._id;
                   comment.Author.Username = req.user.username;
                   
                   comment.save();
                   // req.user.username isgiven by passport its should be as is
                   //save comment
                    campground.Comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/"+ campground._id);
               }
            });
        }
            
    }); 
});

// COMMENT EDIT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership,function(req, res){
    
    Comment.findById(req.params.comment_id, function(err, foundComment) {
       if(err){
           res.redirect("back");
       }
       else{
           res.render("comment/edit", {campground_id : req.params.id, comment : foundComment });

       }
    });
    
});

// COMMENT UPDATE ROUTE

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership,function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
       if(err)
            res.redirect("back");
       else{
            
            res.redirect("/campgrounds/" + req.params.id);
       }
            
    });
});


// COMMENT DELETE ROUTE

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership,function(req,res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err)
            res.redirect("back");
        else{
             req.flash("success", "Successfully removed the comment");
             res.redirect("/campgrounds/" + req.params.id);
        }
           
    });
});


module.exports = router;
