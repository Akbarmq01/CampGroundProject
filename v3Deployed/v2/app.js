
var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    flash = require("connect-flash"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy  = require("passport-local"),
    Campground = require("./models/campground"),
    User = require("./models/user"),
    Comment  = require("./models/comment"),
    seedDB = require("./seeds");
    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

//mongoose.connect("mongodb://campgroundDB:awdrgyjilp123@ds151141.mlab.com:51141/yelpcamp");

mongoose.connect(process.env.DATABASEURL);
// this is local DB on C9     mongoose.connect("mongodb://localhost/yelp_camp");

//  mongodb://campgroundDB:awdrgyjilp123@ds151141.mlab.com:51141/yelpcamp


app.use(bodyParser.urlencoded({extended:true}));   // body parser to extract body contents
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));   // to use custome stylesheets
app.use(methodOverride("_method"));
app.use(flash());
//  seed commented out           seedDB();

// Passport Congiguration
app.use(require("express-session")({
    secret: "yelp camp app",
    resave: "false",
    saveUninitialized: "false"
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){      // middleware for putting user information in every template. otherwise we have to do it by putting currentUser: req.user in every route
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use(indexRoutes);
app.use(commentRoutes);
app.use( campgroundRoutes);






//making server listen to to port od c9 
app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("YelpCamp Server is online");
});