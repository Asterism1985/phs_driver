angular.module('phsDriverApp.controllers')
  .controller('HomeCtrl', ['$rootScope', '$scope', '$log', '$ionicPlatform', '$timeout', '$window', 'PhsServer', 'Utils',
    function($rootScope, $scope, $log, $ionicPlatform, $timeout, $window, PhsServer, Utils) {

      $scope.init = function() {
        //showLoading first
        Utils.showLoading();

        $scope.item_width = Math.round($window.innerWidth / 3);
        if ($scope.item_width > 150) {
          $scope.center_badges = 88;
        } else {
          $scope.center_badges = Math.round($scope.item_width / 2) + 6;
        }

        $scope.myStat = {
          "margin-top": "-" + $scope.center_badges + "px"
        };

        $scope.badges = {};

        $scope.badges.lead = 0;
        $scope.badges.convertedLead = 0;
        $scope.badges.story = 0;

        $timeout(function() {
          $scope.badges.lead = 49;
          $scope.badges.convertedLead = 10;
          $scope.badges.story = 10;
        }, 100);



        var sektor1 = new Sektor('.sektor1', {
          size: 20,
          stroke: 3,
          arc: true,
          angle: 0,
          sectorColor: '#11A8A5',
          fillCircle: false
        });

        var sektor2 = new Sektor('.sektor2', {
          size: 20,
          stroke: 3,
          arc: true,
          angle: 0,
          sectorColor: '#11A8A5',
          fillCircle: false
        });

        var sektor3 = new Sektor('.sektor3', {
          size: 20,
          stroke: 3,
          arc: true,
          angle: 0,
          sectorColor: '#11A8A5',
          fillCircle: false
        });

        $timeout(function() {
          sektor1.animateTo(360, 500);
          sektor2.animateTo(110, 500);
          sektor3.animateTo(120, 500);
        }, 500);

        PhsServer.getBadges().then(function(data) {
            $log.debug("[Home] Badges is: ", data);
            $scope.badges = data;
            return PhsServer.getLeadRecent();
          })
          .then(function(leadRecents) {
            $log.debug("[Home] Lead Recent: ", leadRecents);
            Utils.hideLoading();
            $scope.leadRecents = leadRecents;
          })
      };

      $scope.init();

    }
  ])