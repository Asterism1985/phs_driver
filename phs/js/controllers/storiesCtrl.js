angular.module('phsDriverApp.controllers')
  .controller('StoriesCtrl', ['$scope', '$state', '$log', 'Utils', 'PhsServer', function($scope, $state, $log, Utils, PhsServer) {

    $scope.init = function() {
      Utils.showLoading();
      PhsServer.getStoriesRecent().then(function(data) {
        Utils.hideLoading();
        $log.debug("stories data is : ", data);
        $scope.stories = data;
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

  }]);