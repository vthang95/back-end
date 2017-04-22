var myApp = angular.module('myApp', []);

myApp.controller('AppController', ($scope, $http) => {
  $http({
    method: 'GET',
    url: '/api/image',
    headers: { 'Content-Type': 'application/json' }
  }).then(res => {
    if (!res) return;
    $scope.imageList = res.data;
    $scope.image = {};
  });

  $scope.removeImage = (image) => {
    $http({
      method: 'DELETE',
      url: '/api/image/' + image.slugName,
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      $scope.imageList = response.data;
      $scope.image = {};
    });
  };

  $scope.removeIsActive = true;
  $scope.editContentIsActive = true;
  $scope.inputIsActive = true;
  $scope.addImageIsActive = true;
  $scope.doneIsActive = true;

  $scope.done = () => {
    $scope.editContentIsActive = true;
    $scope.inputIsActive = true;
    $scope.addImageIsActive = true;
    $scope.doneIsActive = true;
    $scope.image = {};
  };

  $scope.clearForm = () => {
    $scope.image = {};
  };

  $scope.showAddImage = () => {
    $scope.inputIsActive = false;
    $scope.addImageIsActive = false;
    $scope.editContentIsActive = true;
    $scope.doneIsActive = false;
  };
  $scope.showEdit = () => {
    $scope.inputIsActive = false;
    $scope.editContentIsActive = false;
    $scope.addImageIsActive = true;
    $scope.doneIsActive = false;
  };

  $scope.addImage = () => {
    if (Object.keys($scope.image).length === 0 || $scope.image.name === undefined) return;
    $http({
      method: 'POST',
      url: '/api/image',
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
      url: '/api/image/' + image.slugName,
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      $scope.image = response.data;
    });
  };

  $scope.update = () => {
    if (Object.keys($scope.image).length === 0 || $scope.image.name === undefined) return;
    $http({
      method: 'PUT',
      url: '/api/image/' + $scope.image.slugName,
      headers: { 'Content-Type': 'application/json' },
      data: $scope.image
    }).then((response) => {
      $scope.imageList = response.data;
      $scope.image = {};
    });
  };

  $scope.popup = (image) => {
    $http({
      method: 'GET',
      url: '/image/' + image.slugName,
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      window.location = '/image/' + image.slugName;
    });
  };

});

myApp.config(['$qProvider', ($qProvider) => {
  $qProvider.errorOnUnhandledRejections(false);
}]);