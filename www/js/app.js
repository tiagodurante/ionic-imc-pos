// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngStorage'])

app.controller('imcCtrl', function($scope, $localStorage) {
  $scope.model = {};
  $scope.model.medidas = [];
  $localStorage.medidas = [];
  $scope.calcular = function() {
    $scope.model.imc = $scope.model.peso / ($scope.model.altura * $scope.model.altura);
    if ($scope.model.imc < 20) {
      $scope.model.stats = 'Magro';
    } else if ($scope.model.imc >= 20 && $scope.model.imc < 25) {
      $scope.model.stats = 'Normal';
    } else if ($scope.model.imc >= 25 && $scope.model.imc < 30) {
      $scope.model.stats = 'Gordo';
    } else {
      $scope.model.stats = 'Obeso';
    }
    adicionarAoHistorico();
  };

  function adicionarAoHistorico() {
    $localStorage.medidas.push({
      peso: $scope.model.peso,
      altura: $scope.model.altura,
      stats: $scope.model.stats
    });
    $scope.model.medidas = $localStorage.medidas;
  }
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
