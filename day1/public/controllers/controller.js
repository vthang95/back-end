var myApp = angular.module('myApp', []);

myApp.controller('AppController', ($scope, $http) => {
  $http({
    method: 'GET',
    url: '/addImage',
    headers: { 'Content-Type': 'application/json' }
  }).then(res => {
    if (!res) return;
    $scope.imageList = res.data;
    $scope.image = {};
  });

  $scope.removeImage = (image) => {
    $http({
      method: 'DELETE',
      url: '/addImage/' + image.slugName,
      headers: { 'Content-Type': 'application/json' }
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
    $scope.image = {};
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
    });
  };

  $scope.edit = (image) => {
    $scope.editContentIsActive = false;
    $http({
      method: 'GET',
      url: '/addImage/' + image.slugName,
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      $scope.image = response.data;
    });
  };

  $scope.update = () => {
    if (Object.keys($scope.image).length === 0 || $scope.image.name === undefined) return;
    $http({
      method: 'PUT',
      url: '/addImage/' + $scope.image.slugName,
      headers: { 'Content-Type': 'application/json' },
      data: $scope.image
    }).then((response) => {
      $scope.imageList = response.data;
      $scope.image = {};
    });
  };

  $scope.popup = () => {
    console.log('s')
  };

});

myApp.config(['$qProvider', ($qProvider) => {
  $qProvider.errorOnUnhandledRejections(false);
}]);