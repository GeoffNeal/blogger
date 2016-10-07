'use strict';

var angular = require("angular");

angular.module("blogger")
.filter("blurbFilter", function () {
	return function (input) {
		var out = input;
		console.log(input.length);
		// console.log(input[0]);
		if(input.length > 15) {
			console.log(typeof out.split(''));
			out = out.split('');
			// var arr = Object.keys(out).map(function (key) {
			// 	return out[key];
			// });
			// console.log(typeof arr);
			console.log(out.splice(0, 15, "...").join(''));
			// out = splice(15, (input.length - 15), "...");
			out = out.splice(15, out.length, "...").join('');
			return out;
		} else {
			return out;
		}	
	}
});