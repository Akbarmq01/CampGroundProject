
var mongoose = require("mongoose");
    
// Set up SCHEMA........

var campgroundSchema = new mongoose.Schema({
                                                Name:  String,
                                                Price: String,
                                                Image: String,
                                                Description: String,
                                                Author: {
                                                         Id:{
                                                            type: mongoose.Schema.Types.ObjectId,
                                                            ref: "User" // name of the model used in seed.js
                                                            },
                                                            Username: String

                                                },
                                                Comments: [
                                                            {
                                                                type: mongoose.Schema.Types.ObjectId,
                                                                ref: "Comment" // name of the model used in seed.js  and is comments post route
                                                            }
                                                          ]
                                           });
    
var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
