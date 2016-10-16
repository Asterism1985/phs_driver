angular.module('phsDriverApp.controllers')
  .controller('LeagueCtrl', ['$rootScope', '$scope', '$window', '$log', 'LeagueService', '$cordovaGoogleAnalytics',
    function($rootScope, $scope, $window, $log, LeagueService, $cordovaGoogleAnalytics) {

      $scope.init = function() {
        if ($rootScope.isDevice) {
          $cordovaGoogleAnalytics.trackView('League table screen');
        }
        $scope.isLoading = true;
        if ($window.innerWidth < 375) {
          $scope.smallScreen = true;
        } else {
          $scope.smallScreen = false;
        }
        $scope.setAll(true);
      };
      $scope.setAll = function(flag) {
        $scope.isLoading = true;
        $log.debug("set all: ", flag);
        $scope.all = flag;
        if (flag) {
          getAllLeague();
        } else {
          getMyFLTLeague();
        }
      };
      var getAllLeague = function() {
        LeagueService.getAllLeague().then(function(data) {
          $log.debug("all league: ", data.rows);
          $scope.isLoading = false;
          $scope.leagueTable = data.rows;
        });
      };
      var getMyFLTLeague = function() {
        LeagueService.getMyFLTLeague().then(function(data) {
          $log.debug("my flt : ", data.rows);
          $scope.isLoading = false;
          $scope.leagueTable = data.rows;
        });
      };

      $scope.init();

    }
  ]);