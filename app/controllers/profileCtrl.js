'use strict';

var angular = require("angular");

angular.module("blogger")
.controller("profileCtrl", function ($scope, $mdToast, dataService) {
	console.log($mdToast);

	$scope.toastPosition = {
		bottom: true,
		top: false,
		left: false,
		right: true
	};

	$scope.getToastPosition = function () {
		return Object.keys($scope.toastPosition)
			.filter(function (pos) {
				return $scope.toastPosition[pos];
			})
			.join(' ');
	};

	dataService.getUser(function (response) {
		$scope.user = response.data.user[0];
	});

	this.updateUser = function () {
		console.log($scope.user);
		$scope.user.summary = this.summary;
		dataService.updateUser($scope.user, function (response) {
			//Put this in a toast
			$scope.message = response.data.message;
			console.log(response.data);
		});
	}

	this.deletePost = function (index) {
		dataService.deleteBlogPost($scope.user.posts, index);
		dataService.updateUser($scope.user, function (response) {
			//Put this in a toast
			$mdToast.show(
				$mdToast.simple()
					.textContent(reponse.data.message)
					.position($scope.getToastPosition())
					.hideDelay(3000)
			);
			// $scope.message = response.data.message;
			// console.log(response.data);
		});
	};
});