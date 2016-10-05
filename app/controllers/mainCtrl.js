'use strict';

var angular = require("angular");

angular.module("blogger")
.controller("mainCtrl", function ($scope, dataService) {

	dataService.getUsers(function (response) {
		$scope.users = response.data.users;
		console.log(response.data.users);
	});

	$scope.selectUser = function (user) {
		$scope.selectedUser = user;
	}
});