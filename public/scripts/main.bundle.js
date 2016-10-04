webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module("blogger", ["ngAnimate", "ngMaterial"]);

	__webpack_require__(3);
	__webpack_require__(4);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module("blogger")
	.controller("mainCtrl", function ($scope, dataService) {
		//
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module("blogger")
	.service("dataService", function ($http) {
		//Retrieve all blogPosts from all users
		this.getBlogPosts = function (callback) {
			$http.get('/blogPosts').then(callback);
		}
	});

/***/ }
]);