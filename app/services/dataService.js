'use strict';

var angular = require("angular");

angular.module("blogger")
.service("dataService", function ($http) {
	//Retrieve all blogPosts from all users
	this.getBlogPosts = function (callback) {
		$http.get('/blogPosts').then(callback);
	}
});