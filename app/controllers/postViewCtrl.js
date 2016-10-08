'use strict';

var angular = require("angular");

angular.module("blogger")
.controller("postViewCtrl", function ($scope, dataService) {
	
	dataService.getBlogPosts(function (response) {
		$scope.posts = response.data.blogPosts;
	});
	
	$scope.datePosted = new Date(postDate);
});