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
	console.log(req.body);
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

//GET /users (The databse query to get all users)
router.get("/users", function (req, res, next) {
	User.find({}, function (err, users) {
		if(err) {
			return next(err);
		}
		return res.json({users: users});
	});
});

//GET /user._id (The databse query to get a single user)
router.get("/user", function (req, res, next) {
	User.find({_id: req.session.userId}, function (err, user) {
		if(err) {
			return next(err);
		}
		//console.log(user) //Returns an array?
		return res.json({user: user});
	});
});

//PUT /user._id (The databse query to update a single user)
router.put("/user/:id", function (req, res, next) {
	var newData = req.body.user;
	console.log(newData);
	User.findByIdAndUpdate(req.params.id, newData, {new: true}, function (err, user) {
		if(err) {
			return next(err);
		}
		//console.log(user) //Returns an array?
		return res.json({user: user, message: req.body.message || "User info updated."});
	});
});

//GET /blogPost (The pug template)
router.get("/blogPost", function (req, res, next) {
	return res.render("blogPost", {title: "Post an item"});
});

//POST /blogPost
router.post("/blogPost", function (req, res, next) {

	//Check that all fields have been filled in
	if(req.body.newPostTitle && req.body.newPostContent && req.body.newPostAuthor && req.body.newPostAuthorId) {

		//Create object containing post's data
		var postData = {
			title: req.body.newPostTitle,
			content: req.body.newPostContent,
			author: req.body.newPostAuthor,
			author_id: req.body.newPostAuthorId
		}

		//Use schema's `create` method to insert document into Mongo
		BlogPost.create(postData, function (error, blogPost) {
			if(error) {
				return next(error);
			} else {
				console.log(blogPost);
				return res.json({blogPost: blogPost});
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
		return res.redirect("/profile");
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

//GET /createPost
router.get("/createPost", function (req, res, next) {
	return res.render("createPost", {title: "Create a new article"});
});

//GET /postView/:id
router.get("/postView/:id", function (req, res, next) {
	BlogPost.findById({_id: req.params.id}, function (err, blogPost) {
		if(err) {
			return next(err);
		}
		// console.log(blogPost);
		req.session.post = blogPost;
		return res.redirect("/postView");
		// return res.render("postView", {title: "Read", postData: blogPost});
	});
});

//GET /postView
router.get("/postView", function (req, res, next) {
	return res.render("postView", {title: "Read", postData: req.session.post});
});

router.get("/mockUsers", function (req, res, next) {
	var users = [
		{
			name: "George Matthews",
			avatar: "svg-1",
			content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},
		{
			name: "Craig Hodgeson",
			avatar: "svg-2",
			content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
		},
		{
			name: "Samantha West",
			avatar: "svg-3",
			content: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
		},
		{
			name: "Holly Colne",
			avatar: "svg-4",
			content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
		}
	];
	return res.json({users: users});
});

module.exports = router;

