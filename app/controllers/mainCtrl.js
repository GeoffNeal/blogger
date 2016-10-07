'use strict';

var angular = require("angular");

angular.module("blogger")
.controller("mainCtrl", function ($scope, dataService) {

	dataService.getUsers(function (response) {
		$scope.users = response.data.users;
		console.log(response.data.users);
	});

	dataService.getBlogPosts(function (response) {
		$scope.blogPosts = response.data.blogPosts;
	});

	$scope.selectUser = function (user) {
		if(!user) {
			$scope.selectedUser = null;
		} else {
			$scope.selectedUser = user;
		}
	}
});