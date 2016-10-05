angular.module('phsDriverApp.controllers')

.controller('AppCtrl', ['$scope', '$timeout', '$ionicPlatform', '$ionicModal', '$ionicPopover', '$ionicSideMenuDelegate', '$log', 'Utils', 'UserService', 'PhsServer', function($scope, $timeout, $ionicPlatform, $ionicModal, $ionicPopover, $ionicSideMenuDelegate, $log, Utils, UserService, PhsServer) {

  $ionicPlatform.ready(function() {
    /*
          window.plugins.NativeAudio.preloadSimple( 'badge', 'audio/Badge_Acquisition.mp3', function(msg){
          }, function(msg){
            console.log( 'error: ' + msg );
          });

          window.plugins.NativeAudio.preloadSimple( 'menuSwoop', 'audio/Contact Menu Swoop.mp3', function(msg){
          }, function(msg){
            console.log( 'error: ' + msg );
          });
          window.plugins.NativeAudio.preloadSimple( 'menuSwishReverse', 'audio/Menu Swish Reverse.mp3', function(msg){
          }, function(msg){
            console.log( 'error: ' + msg );
          });
          window.plugins.NativeAudio.preloadSimple( 'menuSwish', 'audio/Menu Swish.mp3', function(msg){
          }, function(msg){
            console.log( 'error: ' + msg );
          });
          window.plugins.NativeAudio.preloadSimple( 'newLead', 'audio/New Lead.mp3', function(msg){
          }, function(msg){
            console.log( 'error: ' + msg );
          });

          window.plugins.NativeAudio.play( 'badge' );

          $scope.$watch(function () {
              return $ionicSideMenuDelegate.getOpenRatio();
            },
            function (ratio) {
              if (ratio === 1){
                window.plugins.NativeAudio.play( 'menuSwish' );
              } else{
                //window.plugins.NativeAudio.play( 'menuSwishReverse' );
              }
            });*/
  });
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

.controller('NewStoryCtrl', function($scope, $ionicPopup, $rootScope, $timeout, $log, StoryService) {
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
            window.plugins.NativeAudio.play('newLead');
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