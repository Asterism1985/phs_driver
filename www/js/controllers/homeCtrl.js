angular.module('phsDriverApp.controllers')
  .controller('HomeCtrl',['$rootScope', '$scope', '$ionicPlatform', '$timeout', '$window', function($rootScope, $scope, $ionicPlatform, $timeout, $window) {

    $ionicPlatform.ready(function() {

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

    });



  }])