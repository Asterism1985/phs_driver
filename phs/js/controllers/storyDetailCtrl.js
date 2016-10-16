angular.module('phsDriverApp.controllers')
  .controller('StoryDetailCtrl', ['$rootScope', '$scope', '$state', '$log', '$stateParams', 'Utils', 'StoryService', '$cordovaGoogleAnalytics',
    function($rootScope, $scope, $state, $log, $stateParams, Utils, StoryService, $cordovaGoogleAnalytics) {

      if ($rootScope.isDevice) {
        $cordovaGoogleAnalytics.trackView('Story detail screen');
      }
      $scope.storyDetails = {};
      $scope.storyDetails = JSON.parse($stateParams.storyInfo);

      $scope.rsvpAStory = function(storyobj) {
        $scope.data = {
          id: storyobj.id
        };
        if ($scope.storyDetails.likedByCurrentUser) {
          $scope.storyDetails.likes = $scope.storyDetails.likes - 1;
        } else {
          $scope.storyDetails.likes = $scope.storyDetails.likes + 1;
        }
        $scope.storyDetails.likedByCurrentUser = !$scope.storyDetails.likedByCurrentUser;
        StoryService.rsvpToAStory($scope.data).then(function() {}, function(error) {
          $scope.storyDetails.likedByCurrentUser = !$scope.storyDetails.likedByCurrentUser;
          if ($scope.storyDetails.likedByCurrentUser) {
            $scope.storyDetails.likes = $scope.storyDetails.likes + 1;
          } else {
            $scope.storyDetails.likes = $scope.storyDetails.likes - 1;
          }
        })
      }
    }
  ]);