angular.module('phsDriverApp.controllers')
  .controller('StoryDetailCtrl', ['$scope', '$state', '$log', '$stateParams', 'Utils', 'PhsServer', function($scope, $state, $log, $stateParams, Utils, PhsServer) {
    $scope.storyDetails = {};
    $scope.storyDetails = JSON.parse($stateParams.storyInfo);
  }])