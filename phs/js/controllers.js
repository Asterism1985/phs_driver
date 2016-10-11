angular.module('phsDriverApp.controllers')

.controller('AppCtrl', ['$rootScope', '$scope', '$timeout', '$ionicModal', '$ionicPopover', '$ionicSideMenuDelegate', '$log', 'Utils', 'UserService', 'PhsServer', '$cordovaNativeAudio', function($rootScope, $scope, $timeout, $ionicModal, $ionicPopover, $ionicSideMenuDelegate, $log, Utils, UserService, PhsServer, $cordovaNativeAudio) {

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
       .preloadSimple('menuSwoop', 'audio/ContactMenuSwoop.mp3')
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
          } else {
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

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.init();
}])

.controller('NewStoryCtrl', function($scope, $ionicPopup, $rootScope, $timeout, $log, StoryService, $cordovaNativeAudio) {
  $scope.data = {
    title: '',
    body: ''
  };
  $scope.submitStory = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: '',
      cssClass: 'confirm-title',
      template: 'Are you sure you want to submit your post?',
      cancelType: 'cancel-btn',
      okType: 'ok-btn-selected'
    });

    confirmPopup.then(function(res) {
      if (res) {
        $log.log('You are sure');
        StoryService.postNewStory($scope.data).then(function() {
          $scope.showPopup();
          if ($rootScope.isDevice) {
            $cordovaNativeAudio.play('newLead');
          }
        });
      } else {
        $log.log('You are not sure');
      }
    });
  };

  $scope.showPopup = function() {
    $scope.data = {};
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/popups/story-confirmed.html',
      scope: $scope
    });

    myPopup.then(function(res) {
      $log.log('Tapped!', res);
    });

    $timeout(function() {
      myPopup.close();
    }, 2000);
  };




});