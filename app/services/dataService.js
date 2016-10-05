'use strict';

var angular = require("angular");

angular.module("blogger")
.service("dataService", function ($http) {
	//Retrieve all blogPosts from all users
	this.getBlogPosts = function (callback) {
		$http.get('/blogPosts').then(callback);
	}

	//Retrieve user data
	this.getUsers = function (callback) {
		//mock data
		$http.get("/mockUsers").then(callback);
	}

	this.registerUser = function (newUser, callback) {
		$http.post("/register", newUser).then(callback);
	}
});