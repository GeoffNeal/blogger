'use strict';

var express = require("express");
var router = express.Router();
var User = require("../models/user");
var BlogPost = require("../models/blogPost");
var mid = require("../middleware");

/********REGISTRATION, LOGIN AND GENERAL ROUTES********/

//GET /
router.get("/", function (req, res, next) {
	return res.render("index", {title: "Home"});
});

//GET /register
router.get("/register", mid.loggedOut, function (req, res, next) {
	return res.render("register", {title: "Register"});
});

//POST /register
router.post("/register", function (req, res, next) {
	//Check the user entered all fields
	if(req.body.name &&
		req.body.email &&
		req.body.password &&
		req.body.confirmPassword) {

		//Check that password and confirmPassword are the same
		if(req.body.password !== req.body.confirmPassword) {
			var err = new Error("Passwords do not match");
			err.status = 400;
			return next(err);
		}

		//Create object containing user's info
		var userData = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		}

		//Use schema's `create` method to insert document into Mongo
		User.create(userData, function (error, user) {
			if(error) {
				return next(error);
			} else {
				req.session.userId = user._id;

				return res.redirect("/profile");
			}
		});

	} else {
		var err = new Error("All fields are required");
		err.status = 400;
		return next(err);
	}
});

//GET /login
router.get("/login", mid.loggedOut, function (req, res, next) {
	return res.render("login", {title: "Log in"});
});

//POST /login
router.post("/login", function (req, res, next) {
	
	//Check that both fields have been filled in
	if(req.body.email && req.body.password) {
		//Authenticate user
		User.authenticate(req.body.email, req.body.password, function (error, user) {
			
			if(error || !user) {
				var err = new Error("Wrong email or password");
				err.status = 401;
				return next(err);
			} else {
				req.session.userId = user._id;
				console.dir(req.session.userId.toString());
				if(req.session.userId.toString() === "57eb9951784e4943965d7ddf") {
					return res.redirect("/admin");
				} else {
					return res.redirect("/profile");
				}
			}
		});
	} else {
		var err = new Error("All fields are required");
		err.status = 401;
		return next(err);
	}
});

//GET /blogPost (The pug template)
router.get("/blogPost", function (req, res, next) {
	return res.render("blogPost", {title: "Post an item"});
});

//POST /blogPost
router.post("/blogPost", function (req, res, next) {

	//Check that all fields have been filled in
	if(req.body.title && req.body.content) {

		//Create object containing post's data
		var postData = {
			title: req.body.title,
			content: req.body.content,
			author: "Sarah White"
		}

		//Use schema's `create` method to insert document into Mongo
		BlogPost.create(postData, function (error, blogPost) {
			if(error) {
				return next(error);
			} else {
				console.log(blogPost);
				return res.redirect("/news");
			}
		});
	} else {
		var err = new Error("All fields are required");
		err.status = 401;
		return next(err);
	}
});

//GET /blogPosts (The databse query to return all blogPosts)
router.get("/blogPosts", function (req, res, next) {
	BlogPost.find({}, function (err, blogPosts) {
		if(err) {
			return next(err);
		}
		// console.log(blogPosts);
		return res.json({blogPosts: blogPosts});
	});
});

//DELETE /blogPosts (The databse query to delete a single blogPost)
router.delete("/blogPosts/:id", function (req, res, next) {
	BlogPost.findOne({_id: req.params.id}, function (err, blogPost) {
		if(err) {
			return next(err);
		}
		blogPost.remove();
		return res.redirect("/news");
	});
});

//GET /profile
router.get("/profile", mid.requiresLogin, function (req, res, next) {
	User.findById(req.session.userId)
		.exec(function (error, user) {
			if(error) {
				return next(error);
			} else {
				return res.render("profile", {title: "Profile", name: user.name});
			}
		});
});

//GET /logout
router.get("/logout", function (req, res, next) {
	//If a session exists
	if(req.session) {
		//Destroy session
		req.session.destroy(function (err) {
			if(err) {
				return next(err);
			} else {
				return res.redirect("/");
			}
		});
	}
});

//GET /about
router.get("/about", function (req, res, next) {
	return res.render("about", {title: "About"});
});

module.exports = router;

