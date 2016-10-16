angular.module('phsDriverApp.controllers')
  .controller('HomeCtrl', ['$rootScope', '$scope', '$log', '$ionicPlatform', '$timeout', '$window', 'PhsServer', 'Utils', '$cordovaNativeAudio', 'PhsLocalService', '$cordovaGoogleAnalytics',
    function($rootScope, $scope, $log, $ionicPlatform, $timeout, $window, PhsServer, Utils, $cordovaNativeAudio, PhsLocalService, $cordovaGoogleAnalytics) {

      $scope.init = function() {
        if ($rootScope.isDevice) {
          $cordovaGoogleAnalytics.trackView('Home screen');
        }
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

        PhsServer.getBadges().then(function(data) {
            $log.debug("[Home] Badges is: ", data);
            Utils.hideLoading();
            $scope.badges = data;
            initBadges(data);
            return PhsServer.getLeadRecent();
          })
          .then(function(leadRecents) {
            if ($rootScope.isDevice) {
              $cordovaNativeAudio.play('badge');
            }
            $log.debug("[Home] Lead Recent: ", leadRecents);
            $scope.isLoading = false;
            var count = leadRecents.length;
            if (count > 3) {
              $scope.leadRecents = leadRecents.slice(count - 3, count);
            } else {
              $scope.leadRecents = leadRecents;
            }
          }, function(error) {
            Utils.hideLoading();
            $scope.isLoading = false;
            if ($rootScope.useLocalService) {
              $scope.badges = PhsLocalService.getBadges();
              initBadges($scope.badges);
              $scope.leadRecents = PhsLocalService.getLeadRecent();
              if ($rootScope.isDevice) {
                $cordovaNativeAudio.play('badge');
              }
            }
          });

        var initBadges = function(badges) {
          $scope.badgeLead = badges[0];
          $scope.leadStar = calculateStarColor($scope.badgeLead);
          $scope.percentLead = calculatePercent($scope.badgeLead, $scope.leadStar);
          $scope.angleLead = percentToDegree($scope.percentLead);

          $scope.badgeConvertedLead = badges[1];
          $scope.convertedLeadStar = calculateStarColor($scope.badgeConvertedLead);
          $scope.percentConvertedLead = calculatePercent($scope.badgeConvertedLead, $scope.convertedLeadStar);
          $scope.angleConvertedLead = percentToDegree($scope.percentConvertedLead);

          $scope.badgeStory = badges[2];
          $scope.storyStar = calculateStarColor($scope.badgeStory);
          $scope.percentStory = calculatePercent($scope.badgeStory, $scope.storyStar);
          $scope.angleStory = percentToDegree($scope.percentStory);

          $timeout(function() {
            $scope.badges.lead = $scope.badgeLead.badgeScore;
            $scope.badges.convertedLead = $scope.badgeConvertedLead.badgeScore;
            $scope.badges.story = $scope.badgeStory.badgeScore;
          }, 100);

          $timeout(function() {
            sektor1.animateTo($scope.angleLead, 500);
            sektor2.animateTo($scope.angleConvertedLead, 500);
            sektor3.animateTo($scope.angleStory, 500);
          }, 500);

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
        };

        var percentToDegree = function(ratio) {
          return ratio * 360;
        };

        var calculatePercent = function(badge, number) {
          var range = badge.badgeScoreBands;
          if (number === 1) {
            return (badge.badgeScore - range[1].rangeMin) / (range[1].rangeMax - range[1].rangeMin + 1);
          } else if (number === 2) {
            return (badge.badgeScore - range[2].rangeMin) / (range[2].rangeMax - range[2].rangeMin + 1);
          } else if (number === 3) {
            return (badge.badgeScore - range[3].rangeMin) / (range[3].rangeMax - range[3].rangeMin + 1);
          } else {
            return (badge.badgeScore - range[0].rangeMin) / (range[0].rangeMax - range[0].rangeMin + 1);
          }
        }
      };
      $scope.init();
    }
  ]);