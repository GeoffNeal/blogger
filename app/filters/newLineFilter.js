'use strict';

var angular = require("angular");

angular.module("blogger")
.filter("newLineFilter", function () {
	return function (input) {
		//Find all instances of the new line character (\n)
		var newLine = new RegExp(/\n/g);
		// console.log(newLine.test(contentPosted));
		return input + " filter is working";
	}
});