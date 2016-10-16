angular.module('phsDriverApp.controllers')
  .controller('LeadStatusCtrl', ['$rootScope', '$scope', '$log', 'Utils', 'PhsServer', '$cordovaGoogleAnalytics',
    function($rootScope, $scope, $log, Utils, PhsServer, $cordovaGoogleAnalytics) {

    $scope.init = function() {
      if ($rootScope.isDevice) {
        $cordovaGoogleAnalytics.trackView('Lead status screen');
      }
      $scope.isLoading = true;
      PhsServer.getLeadStatus().then(function(data){
        $scope.isLoading = false;
        $scope.leadStatuses = data;
      }, function(error) {
        $scope.isLoading = false;
      });
    };
    //$log.debug($scope.groups);
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

    $scope.init();

  }]);