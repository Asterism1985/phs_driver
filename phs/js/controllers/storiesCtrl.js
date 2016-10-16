angular.module('phsDriverApp.controllers')
  .controller('StoriesCtrl', ['$rootScope', '$scope', '$state', '$log', 'Utils', 'PhsServer', '$cordovaGoogleAnalytics',
    function($rootScope, $scope, $state, $log, Utils, PhsServer, $cordovaGoogleAnalytics) {

      $scope.init = function() {
        if ($rootScope.isDevice) {
          $cordovaGoogleAnalytics.trackView('Story list screen');
        }

        Utils.showLoading();
        PhsServer.getStoriesRecent().then(function(data) {
          Utils.hideLoading();
          $log.debug("stories data is : ", data);
          $scope.stories = data;
        }, function(error) {
          $log.debug("can not get story recent");
          alert("error");
          Utils.hideLoading();
        });
      };

      $scope.openSingleStory = function(id) {
        $log.debug("open story at index: ", id);
        var data = JSON.stringify($scope.stories[id]);
        $log.debug("data to send: ", data);
        $state.go('app.storySingle', {
          storyInfo: data
        });
      };

      $scope.init();

    }
  ]);