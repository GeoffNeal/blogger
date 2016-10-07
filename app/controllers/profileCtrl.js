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

	$scope.updateUserSummary = function () {
		console.log($scope.user);
		$scope.user.summary = $scope.summary;
		dataService.updateUser({
			user: $scope.user,
			message: "Your summary has been updated, " + $scope.user.name
		}, function (response) {
			//Put this in a toast
			$mdToast.show(
				$mdToast.simple()
					.textContent(response.data.message)
					.position($scope.getToastPosition())
					.hideDelay(3000)
			);
			// $scope.message = response.data.message;
			// console.log(response.data);
		});
	}

	$scope.deletePost = function (index) {
		dataService.deleteBlogPost($scope.user.posts, index);
		dataService.updateUser({
			user: $scope.user,
			message: "Your post has been deleted, " + $scope.user.name
		}, function (response) {
			//Put this in a toast
			$mdToast.show(
				$mdToast.simple()
					.textContent(response.data.message)
					.position($scope.getToastPosition())
					.hideDelay(3000)
			);
			// $scope.message = response.data.message;
			// console.log(response.data);
		});
	};
});