'use strict';

var angular = require("angular");

angular.module("blogger")
.controller("postViewCtrl", function ($scope, dataService) {
	
	dataService.getBlogPosts(function (response) {
		$scope.posts = response.data.blogPosts;
	});
	
	//postDate and postContent are defined in the postView template
	$scope.datePosted = new Date(postDate);
	$scope.contentPosted = postContent;

	var newLine = /br/g;
	if(newLine.test($scope.contentPosted)) {
		var str = $scope.contentPosted.replace(newLine, "<br>");
		$scope.contentPosted = str;
	};
});