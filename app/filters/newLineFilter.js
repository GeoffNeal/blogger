'use strict';

var angular = require("angular");

angular.module("blogger")
.filter("newLineFilter", ["$rootscope", function ($rootscope) {
	return function (input) {
		//Find all instances of the new line character (\n)
		console.log($rootscope);
		var newLine = new RegExp(/\n/g);
		console.log(newLine.test($scope.contentPosted));
		return input + " filter is working";
	}
}]);