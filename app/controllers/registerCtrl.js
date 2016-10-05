'use strict';

var angular = require("angular");

angular.module("blogger")
.controller("registerCtrl", function ($scope, dataService) {

	this.registerNewUser = function () {
		var newUser = {
			name: this.name,
			email: this.email,
			password: this.password,
			confirmPassword: this.confirmPassword
		};
		dataService.registerUser(newUser, function (response) {
			console.log(response.data);
		});
	}
});