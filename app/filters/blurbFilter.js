'use strict';

var angular = require("angular");

angular.module("blogger")
.filter("blurbFilter", function () {
	return function (input) {
		if(input.length > 150) {
			var out = input.split('');
			out.splice(150, out.length - 150, "...");
			out = out.join('');
			return out;
		} else {
			return input;
		}	
	}
});