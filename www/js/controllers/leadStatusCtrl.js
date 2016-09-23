angular.module('phsDriverApp.controllers')
  .controller('LeadStatusCtrl', ['$scope', '$log', 'Utils', 'PhsServer', function($scope, $log, Utils, PhsServer) {

    $scope.init = function() {
      $scope.isLoading = true;
      PhsServer.getLeadStatus().then(function(data){
        $scope.isLoading = false;
        $scope.leadStatuses = data;
      })
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

  }])