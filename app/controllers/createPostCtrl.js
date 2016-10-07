'use strict';

var angular = require("angular");

angular.module("blogger")
.controller("createPostCtrl", function ($scope, $mdToast, dataService) {

	$scope.toastPosition = {
		bottom: true,
		top: false,
		left: false,
		right: true
	};

	$scope.getToastPosition = function () {
		return Object.keys($scope.toastPosition)
			.filter(function (pos) {
				return $scope.toastPosition[pos];
			})
			.join(' ');
	};

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
			dataService.updateUser({
				user: $scope.user,
				message: "Your article has been posted, " + $scope.user.name
			}, function (response) {
				//Put this in a toast
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.message)
						.position($scope.getToastPosition())
						.hideDelay(3000)
				);
				console.log(response.data);
			});
		});
	}
});