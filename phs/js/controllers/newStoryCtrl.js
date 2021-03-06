angular.module('phsDriverApp.controllers')
  .controller('NewStoryCtrl', ['$rootScope', '$scope', '$ionicPopup', '$timeout', '$log', 'StoryService', '$cordovaNativeAudio', '$cordovaGoogleAnalytics',
    function($rootScope, $scope, $ionicPopup, $timeout, $log, StoryService, $cordovaNativeAudio, $cordovaGoogleAnalytics) {

      if ($rootScope.isDevice) {
        $cordovaGoogleAnalytics.trackView('New story screen');
      }
      $scope.data = {
        title: '',
        body: ''
      };
      $scope.submitStory = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: '',
          cssClass: 'confirm-title',
          template: 'Are you sure you want to submit your post?',
          cancelType: 'cancel-btn',
          okType: 'ok-btn-selected'
        });
        confirmPopup.then(function(res) {
          if (res) {
            $log.log('You are sure');
            StoryService.postNewStory($scope.data).then(function() {
              $scope.showPopup();
              if ($rootScope.isDevice) {
                $cordovaNativeAudio.play('newLead');
                $cordovaGoogleAnalytics.trackEvent('Create New Story', 'Create New Lead', 'successfully', true);
              }
            }, function(error) {
              if ($rootScope.isDevice) {
                $cordovaGoogleAnalytics.trackEvent('Create New Story', 'Create New Lead', 'Fail', false);
              }
              if ($rootScope.useLocalService) {
                $scope.showPopup();
                if ($rootScope.isDevice) {
                  $cordovaNativeAudio.play('newLead');
                }
              }
            });
          } else {
            $log.log('You are not sure');
          }
        });
      };

      $scope.showPopup = function() {
        $scope.data = {};
        var myPopup = $ionicPopup.show({
          templateUrl: 'templates/popups/story-confirmed.html',
          scope: $scope
        });

        myPopup.then(function(res) {
          $log.log('Tapped!', res);
        });

        $timeout(function() {
          myPopup.close();
        }, 2000);
      };

    }
  ]);