angular.module('phsDriverApp.controllers')

.controller('AppCtrl', ['$rootScope', '$scope', '$timeout', '$ionicModal', '$ionicPopover', '$ionicSideMenuDelegate', '$log', 'Utils', 'UserService', 'PhsServer', '$cordovaNativeAudio', 'PhsLocalService', function($rootScope, $scope, $timeout, $ionicModal, $ionicPopover, $ionicSideMenuDelegate, $log, Utils, UserService, PhsServer, $cordovaNativeAudio, PhsLocalService) {

    if ($rootScope.isDevice) {

       $cordovaNativeAudio
       .preloadSimple('badge', 'audio/BadgeAcquisition.mp3')
       .then(function(msg) {
         console.log(msg);
         $log.debug("prepare sound badge", msg);
       }, function(error) {
        $log.debug("error", error);
       });

       $cordovaNativeAudio
       .preloadSimple('contactSound', 'audio/ContactMenuSwoop.mp3')
       .then(function(msg) {
         console.log(msg);
         $log.debug("prepare sound successfully", msg);
       }, function(error) {
        $log.debug("error", error);
       });

       $cordovaNativeAudio
       .preloadSimple('menuSwishReverse', 'audio/MenuSwishReverse.mp3')
       .then(function(msg) {
         console.log(msg);
         $log.debug("prepare sound menuSwishReverse", msg);
       }, function(error) {
        $log.debug("error", error);
       });

       $cordovaNativeAudio
       .preloadSimple('menuSwish', 'audio/MenuSwish.mp3')
       .then(function(msg) {
         console.log(msg);
         $log.debug("prepare sound menuSwish", msg);
       }, function(error) {
        $log.debug("error", error);
       });

       $cordovaNativeAudio
       .preloadSimple('newLead', 'audio/NewLead.mp3')
       .then(function(msg) {
         console.log(msg);
         $log.debug("prepare sound newLead", msg);
       }, function(error) {
        $log.debug("error", error);
       });

      $scope.$watch(function() {
          return $ionicSideMenuDelegate.getOpenRatio();
        },
        function(ratio) {
          if (ratio === 1) {
            window.plugins.NativeAudio.play('menuSwish');
          } 
          else {
            window.plugins.NativeAudio.play('menuSwishReverse');
          }
        });
    } else {
      $log.debug("Not a real device");
    }

  $scope.init = function() {
    PhsServer.getContactInfos().then(function(data) {
      $scope.contactInfos = data[0];
      $log.debug("[GLOBAL] contactinfos: ", $scope.contactInfos);
    }, function(error) {
      $scope.contactInfos = PhsLocalService.getContactInfos()[0];
    });
  };

  $scope.logout = function() {
    Utils.showLoading("Logging out...");

    UserService.logOut().then(function() {
      $log.debug("clear all history and app data");
      Utils.hideLoading();
      Utils.toLocation("/login");
    }, function(error) {
      //alert("can not log out, please check your network");
      $log.debug('can not log out, please check your network');
      Utils.hideLoading();
    });
  };

  $scope.showPopOverContact = function(event) {
    $scope.popover.show(event);
    if ($rootScope.isDevice) {
      $cordovaNativeAudio.play('contactSound');
    }
  }

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.init();
}])
