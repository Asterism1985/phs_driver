angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $timeout, $ionicPlatform, $ionicModal, $ionicPopover, $ionicSideMenuDelegate) {



    $ionicPlatform.ready(function(){
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




    $scope.logout = function(){
      alert("logged out");
    };

    $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });
  })

  .controller('HomeCtrl', function ($scope, $ionicPlatform, $timeout, $window) {

    $ionicPlatform.ready(function(){

      $scope.dev_width = $window.innerWidth;
      $scope.center_badges = $scope.dev_width/5;


      $scope.myStat = {
        "margin-top" : "-"+$scope.center_badges+"px"
      };

      $scope.badges = {};

      $scope.badges.lead = 0;
      $scope.badges.convertedLead = 0;
      $scope.badges.story = 0;

      $timeout(function(){
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



      $timeout(function(){
        sektor1.animateTo(360, 500);
        sektor2.animateTo(110, 500);
        sektor3.animateTo(120, 500);
      }, 500);


    });




  })

  .controller('NewLeadCtrl', function ($scope, $ionicPlatform, $ionicModal, $ionicPopover) {


    // Modal for Location
    $ionicModal.fromTemplateUrl('templates/newLead-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      //$scope.modal.show();

    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    // Location picked from modal
    $scope.locationPicked = function(){
      console.log("loc picked");
    };

    $scope.uploadImage = function(){

      plugins.imagePicker.getPictures(
        function(results) {
          for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
          }
        }, function (error) {
          console.log('Error: ' + error);
        }
      );

    }

    // Popover info for successful submit & submit



    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('templates/NewLeadAdded-popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
      $scope.popover.show();

    });

    $scope.submitLead = function(){

      $scope.popover.show();
      window.plugins.NativeAudio.play( 'newLead' );


    };

  })

  .controller('LeadStatusCtrl', function ($scope) {

    $scope.groups = groups;

    console.log($scope.groups);

    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
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

  })

  .controller('LeagueCtrl', function ($scope, $ionicPlatform) {

    $ionicPlatform.ready(function(){


      $scope.setAll = function(bool){
        console.log(bool);
        $scope.all = bool;
      };

      $scope.leagueTable = [];

      for(var i = 1; i < 10; i++){
        var singleLeague = {
          id: i,
          name: 'John Smith',
          convertedLeads: [10, 9, 9]
        };

        $scope.leagueTable.push(singleLeague);
      }

    });
  })

  .controller('StoriesCtrl', function ($scope, $state) {

    $scope.openSingleStory = function(id){

      $state.go('app.stories.');

    };


    $scope.stories = [];

    for (var i=0; i<4; i++) {
      $scope.stories[i] = {
        title: 'Post Title',
        name: 'John Smith',
        date: '01/01/2016'
      };

    }

    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
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

  })

  .controller('NewStoryCtrl', function ($scope) {

    $scope.submitStory = function(){

    }

  });
