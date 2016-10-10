angular.module('phsDriverApp.controllers')
  .controller('HomeCtrl', ['$rootScope', '$scope', '$log', '$ionicPlatform', '$timeout', '$window', 'PhsServer', 'Utils',
    function($rootScope, $scope, $log, $ionicPlatform, $timeout, $window, PhsServer, Utils) {

      $scope.init = function() {
        $scope.isLoading = true;
        //showLoading first
        Utils.showLoading();
        //Update UI for cross device
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
          sektor1.animateTo(180, 500);
          sektor2.animateTo(110, 500);
          sektor3.animateTo(120, 500);
        }, 500);

        PhsServer.getBadges().then(function(data) {
            $log.debug("[Home] Badges is: ", data);
            Utils.hideLoading();
            $scope.badges = data;
            initBadges(data);
            return PhsServer.getLeadRecent();
          })
          .then(function(leadRecents) {
            $log.debug("[Home] Lead Recent: ", leadRecents);
            $scope.isLoading = false;
            $scope.leadRecents = leadRecents;
          });

        var initBadges = function(badges) {
          $scope.badgeLead = badges[0];
          $scope.leadStar = calculateStarColor($scope.badgeLead);

          $scope.badgeConvertedLead = badges[1];
          $scope.convertedLeadStar = calculateStarColor($scope.badgeConvertedLead);

          $scope.badgeStory = badges[2];
          $scope.storyStar = calculateStarColor($scope.badgeStory);

          $timeout(function() {
            $scope.badges.lead = $scope.badgeLead.badgeScore;
            $scope.badges.convertedLead = $scope.badgeConvertedLead.badgeScore;
            $scope.badges.story = $scope.badgeStory.badgeScore;
          }, 100);
        };

        var calculateStarColor = function(badge) {
          var range = badge.badgeScoreBands;
          var isNumber = 0;
          if (badge.badgeScore >= range[1].rangeMin && badge.badgeScore <= range[1].rangeMax) {
            isNumber = 1;
          } else if (badge.badgeScore >= range[2].rangeMin && badge.badgeScore <= range[2].rangeMax) {
            isNumber = 2;
          } else if (badge.badgeScore >= range[3].rangeMin && badge.badgeScore <= range[3].rangeMax) {
            isNumber = 3;
          } else {
            isNumber = 0;
          }
          return isNumber;
        }
      };
      $scope.init();
    }
  ]);