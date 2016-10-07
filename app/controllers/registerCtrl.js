'use strict';

var angular = require("angular");

angular.module("blogger")
.controller("registerCtrl", function ($scope, dataService) {

	//For register.pug

	// this.registerNewUser = function () {
	// 	var newUser = {
	// 		name: this.name,
	// 		email: this.email,
	// 		password: this.password,
	// 		confirmPassword: this.confirmPassword
	// 	};
	// 	dataService.registerUser(newUser, function (response) {
	// 		console.log(response.data);
	// 	});
	// }

	//For login.pug

	// this.logInUser = function () {
	// 	var loginData = {
	// 		email: this.loginEmail,
	// 		password: this.loginPassword
	// 	};
	// 	dataService.login(loginData, function (response) {
	// 		console.log(response.data);
	// 	});
	// }
});