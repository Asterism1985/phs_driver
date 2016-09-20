angular.module('phsDriverApp.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $ionicPlatform, $ionicModal, $ionicPopover, $ionicSideMenuDelegate, Utils) {



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

  $scope.logout = function() {
    Utils.toLocation("/login");
  };

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
})

.controller('HomeCtrl', function($scope, $ionicPlatform, $timeout, $window) {

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




})

.controller('NewLeadCtrl', function($rootScope, $scope, $ionicPlatform, $ionicModal, $ionicPopover, $ionicPopup, $timeout, $log, $ionicSlideBoxDelegate, ModalService) {
  // Triggered on a button click, or some other target
$scope.showPopupInputYourLocation = function() {
  $scope.data = {};
  var myLocationInputPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.location">',
    title: 'Enter your location',
    scope: $scope,
    buttons: [
      { text: 'Cancel',
      type: 'cancel-btn'
       },
      {
        text: '<b>Save</b>',
        type: 'ok-btn-selected',
        onTap: function(e) {
          if (!$scope.data.location) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.location;
          }
        }
      }
    ]
  });
  myLocationInputPopup.then(function(res) {
    console.log('Tapped!', res);
  });
 };

  // Location picked from modal
  $scope.locationPicked = function() {
    console.log("loc picked");
    $scope.closeModal();
  };

  $scope.inputYourLocation = function() {
    $scope.closeModal();
    $scope.showPopupInputYourLocation();
  };

  $scope.uploadImage = function() {
    $scope.showModalUploadFile();

    // plugins.imagePicker.getPictures(
    //   function(results) {
    //     for (var i = 0; i < results.length; i++) {
    //       console.log('Image URI: ' + results[i]);
    //     }
    //   }, function (error) {
    //     console.log('Error: ' + error);
    //   }
    // );
  }


  $scope.showModalLocationPick = function() {
    ModalService
      .init('templates/newLead-modal.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };
  $scope.showModalLocationPick();

  $scope.showModalUploadFile = function() {
    ModalService
      .init('templates/popups/file-upload-modal.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };

    $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  // Popover info for successful submit & submit
  // A confirm dialog
  $scope.submitLead = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: '',
      cssClass:'confirm-title',
      template: 'Are you sure you want to submit your lead?',
      cancelType: 'cancel-btn',
      okType: 'ok-btn-selected'
    });

    confirmPopup.then(function(res) {
      if (res) {
        $log.log('You are sure');
        $scope.showPopup();
        if ($rootScope.isDevice) {
          window.plugins.NativeAudio.play('newLead');
        }
      } else {
        $log.log('You are not sure');
      }
    });
  };

  $scope.showPopup = function() {
    $scope.data = {};
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/popups/confirmed.html',
      scope: $scope
    });

    myPopup.then(function(res) {
      $log.log('Tapped!', res);
    });

    $timeout(function() {
      myPopup.close();
    }, 2000);
  };
})

.controller('LeadStatusCtrl', function($scope, $log) {

  $scope.groups = groups;

  $log.debug($scope.groups);
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

.controller('LeagueCtrl', function($scope, $ionicPlatform, $window) {

  $ionicPlatform.ready(function() {

    if ($window.innerWidth < 375)
    {
      $scope.smallScreen = true;
    } else {
      $scope.smallScreen = false;
    }
    $scope.setAll = function(bool) {
      console.log(bool);
      $scope.all = bool;
    };

    $scope.leagueTable = [];

    for (var i = 1; i < 10; i++) {
      var singleLeague = {
        id: i,
        name: 'John Smith',
        convertedLeads: [10, 9, 9]
      };

      $scope.leagueTable.push(singleLeague);
    }

  });
})

.controller('StoriesCtrl', function($scope, $state) {

  $scope.openSingleStory = function(id) {

    $state.go('app.stories.');

  };


  $scope.stories = [];

  for (var i = 0; i < 4; i++) {
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

.controller('NewStoryCtrl', function($scope, $ionicPopup, $rootScope, $timeout, $log) {

  $scope.submitStory = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: '',
      cssClass:'confirm-title',
      template: 'Are you sure you want to submit your post?',
      cancelType: 'cancel-btn',
      okType: 'ok-btn-selected'
    });

    confirmPopup.then(function(res) {
      if (res) {
        $log.log('You are sure');
        $scope.showPopup();
        if ($rootScope.isDevice) {
          window.plugins.NativeAudio.play('newLead');
        }
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