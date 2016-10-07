'use strict';

var angular = require("angular");

angular.module("blogger")
.controller("createPostCtrl", function ($scope, dataService) {

	dataService.getUser(function (response) {
		$scope.user = response.data.user[0];
	});

	this.createNewPost = function () {
		var postData = {
			newPostTitle: this.newPostTitle,
			newPostContent: this.newPostContent,
			newPostAuthor: $scope.user.name,
			newPostAuthorId: $scope.user._id
		};

		dataService.createPost(postData, function (response) {
			console.log(response.data.blogPost);
			$scope.user.posts.push(response.data.blogPost);
			dataService.updateUser($scope.user, function (response) {
				console.log(response.data);
			});
		});
	}
});