angular.module('phsDriverApp.controllers')
  .controller('LeagueCtrl', ['$scope', '$window', '$log', 'LeagueService', function($scope, $window, $log, LeagueService) {

    $scope.init = function() {
      $scope.isLoading = true;
      if ($window.innerWidth < 375) {
        $scope.smallScreen = true;
      } else {
        $scope.smallScreen = false;
      }
      $scope.setAll(true);
    }
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
      })
    };
    var getMyFLTLeague = function() {
      LeagueService.getMyFLTLeague().then(function(data) {
        $log.debug("my flt : ", data.rows);
        $scope.isLoading = false;
        $scope.leagueTable = data.rows;
      })
    };



    // for (var i = 1; i < 10; i++) {
    //   var singleLeague = {
    //     id: i,
    //     name: 'John Smith',
    //     convertedLeads: [10, 9, 9]
    //   };

    //   $scope.leagueTable.push(singleLeague);
    // }

    $scope.init();

  }])