var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [{Name: "Cloud's Nest",
            Image: "https://farm4.staticflickr.com/3741/9586943706_b22f00e403.jpg",
            Description: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."}, 
            {Name: "Valley base",
            Image: "https://farm4.staticflickr.com/3230/2935192829_a5f13ea821.jpg",
            Description: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."},
            {Name: "Canyon's Nest",
            Image: "https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg",
            Description: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."}];

//remove everything

function seedDB(){

Campground.remove({}, function(err){
    if(err)
        console.log(err);
    else    
        console.log("data removed");
        
    // add few campgrounds 
data.forEach(function(seed){
  Campground.create(seed, function(err, campground){
     if(err)
        console.log(err);
     else{
         console.log("added a campground");
         // add few comments
         Comment.create({Text: "this is a great place. I wish there was internet", Author: "Homer"}, function(err, comment){
             if(err)
                console.log(err);
             else{
                 campground.Comments.push(comment);
                 campground.save();
                 console.log("comment added");
             }
                
         });
         
     }
        
      
  });  
});

});



    
};

module.exports = seedDB;
