// middleware goes here

var Campground  = require("../models/campground");
var Comment  = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership =     function (req, res, next){
      // is Userligged in??
    if(req.isAuthenticated()){
        
            Campground.findById(req.params.id, function(err, foundCampground){
               if(err){
                         req.flash("error", "Campground not found");
                         res.redirect("back");
                      }

                  else{
                         //does user own campground
                         if(foundCampground.Author.Id.equals(req.user._id)){    // foundCampground.Author.Id & req.user._id have same value but cannot be compared by equal to sign since former is object and later is string
                            next();    
                         }
    else{
            req.flash("error", "You do not have permission to do that");
        }
                              
                      }
            
            });

    }
    else{
        res.redirect("back");
    }
  
}


middlewareObj.checkCommentOwnership = 
    function (req, res, next){
      // is Userligged in??
    if(req.isAuthenticated()){
        
            Comment.findById(req.params.comment_id, function(err, foundComment){
               if(err){
                         console.log("Error in updating campground");
                         res.redirect("back");
                      }

                  else{
                         //does user own campground
                         if(foundComment.Author.Id.equals(req.user._id)){    // foundComment.Author.Id & req.user._id have same value but cannot be compared by equal to sign since former is object and later is string
                            next();    
                         }
                         else{
                             req.flash("error", "You do not have permission to do that");
                             res.redirect("back");
                         }
                              
                      }
            
            });

    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
  
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
};
  


module.exports = middlewareObj;