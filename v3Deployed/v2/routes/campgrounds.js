var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/campgrounds", function(req, res){
    
    Campground.find({}, function(err, allCampgrounds){
        
        if(err)
            console.log("Error in retrieving from database");
        else
            res.render("campground/index", {campgrounds:allCampgrounds});
    });
    
     
});

// CREATE route -----> store new campground to DB

router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
    // get data from form and add it to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
        
            Id : req.user._id,
            Username : req.user.username
    }
    
    var newCampGround = {Name: name, Price: price, Image: image, Description: description, Author: author};
    // Create a new campground and save it to DB
    Campground.create(newCampGround, function(err, newCampground) {
        if(err)
            console.log("Error in storing in DB");
        else
            res.redirect("/campgrounds");  // will go to get request campground      
            console.log(newCampground);
        });
    
 });

// NEW route ----> add new campground to DB

router.get("/campgrounds/new", middleware.isLoggedIn,function(req, res) {
    res.render("campground/new");
    
});


// SHOW ----> show more detaild about one campground
router.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided ID
    // coming from the show info button
    
    Campground.findById(req.params.id).populate("Comments").exec(function(err, foundCampground){
        if(err)
            console.log("error in description");
        else
            res.render("campground/show", {campground: foundCampground});
    });
});

// EDIT CAMPGROUND
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership,function(req, res) {
    
        
            Campground.findById(req.params.id, function(err, foundCampground){
                req.flash("error","Campground notfound");
                            res.render("campground/edit", {campground : foundCampground});    
              
            });

    
});
// UPDATE CAMPGROUND

router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
   
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
   }); 
});

// DELETE CAMPGROUND

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err)
            res.redirect("/campgrounds");
       else
            res.redirect("/campgrounds");
   }); 
});


module.exports = router;