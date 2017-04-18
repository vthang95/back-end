var myApp = angular.module('myApp', []);

myApp.controller('AppController', function($scope, $http) {
  $http({
    method: 'GET',
    url: '/addImage',
    headers: { 'Content-Type': 'text/plain' }
  }).then(res => {
    if (!res) return;
    $scope.imageList = res.data;
    $scope.image = {};
  });

  $scope.removeImage = (image) => {
    $http({
      method: 'DELETE',
      url: '/addImage/' + image.slugName,
      headers: { 'Content-Type': 'text/plain' }
    }).then((response) => {
      $scope.imageList = response.data;
      $scope.image = {};
    });
  };

  $scope.removeIsActive = true;
  $scope.editContentIsActive = true;

  $scope.enableEdit = () => {
    $scope.removeIsActive = false;
  };

  $scope.disableEdit = () => {
    $scope.removeIsActive = true;
    $scope.editContentIsActive = true;
  };

  $scope.addImage = () => {
    if (Object.keys($scope.image).length === 0 || $scope.image.name === undefined) return;
    $http({
      method: 'POST',
      url: '/addImage',
      data: $scope.image
    }).then((response) => {
      if (!response) return;
      $scope.imageList = response.data;
      $scope.image = {};
    })
  };

  $scope.edit = (image) => {
    $scope.editContentIsActive = false;

  };

});

myApp.config(['$qProvider', function($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);