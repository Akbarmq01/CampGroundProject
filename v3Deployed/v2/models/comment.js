var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
                    Text: String,
                    Author: {
                        Id:{
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "User" // name of the model used in seed.js
                        },
                        Username: String
                    }
                    });
                    
module.exports = mongoose.model("Comment", commentSchema);