'use strict';

var angular = require("angular");

angular.module("blogger")
.service("dataService", function ($http) {

	//Retrieve all blogPosts from all users
	this.getBlogPosts = function (callback) {
		$http.get('/blogPosts').then(callback);
	}

	//Create a new post
	this.createPost = function (postData, callback) {
		$http.post("/blogPost", postData).then(callback);
	}

	//Delete a post
	this.deleteBlogPost = function (userBlogPostArray, index) {
		console.log(index);
		$http.delete("/blogPosts/" + userBlogPostArray[index]._id);
		userBlogPostArray.splice(index, 1);
	}

	//Retrieve all users
	this.getUsers = function (callback) {
		$http.get("/users").then(callback);
	}

	//Retrieve current user data
	this.getUser = function (callback) {
		$http.get("/user").then(callback);
	}

	this.updateUser = function (newUserData, callback) {
		console.log(newUserData.user._id);
		$http.put("/user/" + newUserData.user._id, newUserData).then(callback);
	}

	// this.getPost = function (post, callback) {
	// 	$http.get("/postView/" + post._id).then(callback);
	// }

	// this.redirect = function (location, post) {
	// 	console.log(location);
	// 	if(post) {
	// 		$http.post(location, {post: post});
	// 	} else {
	// 		$http.get(location);
	// 	}
	// }
});