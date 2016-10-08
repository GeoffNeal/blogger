'use strict';

var port = process.env.PORT,
    address = "http://127.0.0.1";

var express = require("express"),
	app = express(),
    parser = require("body-parser"),
    mongoose = require("mongoose"),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    User = require("./models/user"),
    router = require("./router");

    //Connect to mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blogger", function() {
	console.log("MongoDB connection successful");
});
var db = mongoose.connection;
//Mongo error
db.on("error", console.error.bind(console, "connection error: "));

//Use sessions for tracking logins
app.use(session({
	secret: "Suppherin' suchotash!",
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
}));

//Make user ID available in templates
app.use (function (req, res, next) {
	res.locals.currentUser = req.session.userId;
	next();
});

//Set up view engine
app.set("view engine", "pug");
app.set('views', __dirname + '/views');

//Serve static files from /public
app.use(express.static("public"));

//Parse incoming requests
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

//Include routes
app.use("/", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('File Not Found');
	err.status = 404;
	next(err);
});

//Error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render("error", {
		message: err.message,
		error: {}
	});
});

app.listen(port, function() {
	console.log("Server running at " + address + ":" + port);
});