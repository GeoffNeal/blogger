webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module("blogger", ["ngAnimate", "ngMaterial"]);

	// require("./../node_modules/angular-material/angular-material.min.js");
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module("blogger")
	.service("dataService", function ($http) {
		//Retrieve all blogPosts from all users
		this.getBlogPosts = function (callback) {
			$http.get('/blogPosts').then(callback);
		}

		//Retrieve user data
		this.getUsers = function (callback) {
			//mock data
			$http.get("/mockUsers").then(callback);
		}

		this.registerUser = function (newUser, callback) {
			$http.post("/register", newUser).then(callback);
		}
	});

/***/ }
]);