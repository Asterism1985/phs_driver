angular.module('phsDriverApp.controllers')
  .controller('NewLeadCtrl', ['$rootScope', '$scope', '$cordovaImagePicker', '$ionicModal', '$ionicPopover', '$ionicPopup', '$timeout', '$log', '$ionicSlideBoxDelegate', 'ModalService', 'LocationService', 'Utils', function($rootScope, $scope, $cordovaImagePicker, $ionicModal, $ionicPopover, $ionicPopup, $timeout, $log, $ionicSlideBoxDelegate, ModalService, LocationService, Utils) {

    $scope.init = function() {

      Utils.showLoading("Get current location...");

      LocationService.getAllNearBy().then(function(data) {
        $scope.locationsNearby = data;
      }, function(error) {
        $log.debug("Can not get nearby location");
        alert("please check your network.");
        Utils.hideLoading();
      });

      LocationService.getCurrentLocation().then(function(data) {
        var latlng = new google.maps.LatLng(data.lat, data.long);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'latLng': latlng
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              $scope.currentAddress = results[0].formatted_address;
            } else {
              $scope.currentAddress = "Can not find my address";
            }
            Utils.hideLoading();
            $scope.showModalLocationPick();
          }
        });
      }, function(error) {
        $log.debug("Can not get current location");
        Utils.hideLoading();
        $scope.showModalLocationPick();
      });
    };
    // Triggered on a button click, or some other target
    $scope.showPopupInputYourLocation = function() {
      $scope.data = {};
      var myLocationInputPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.location">',
        title: 'Enter your location',
        scope: $scope,
        buttons: [{
          text: 'Cancel',
          type: 'cancel-btn'
        }, {
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
        }]
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
      if ($rootScope.isDevice) {
        var options = {
          maximumImagesCount: 10,
          width: 800,
          height: 800,
          quality: 80
        };
        $cordovaImagePicker.getPictures(options)
          .then(function(results) {
            for (var i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
            }
          }, function(error) {
            // error getting photos
          });
      } else {
        $scope.showModalUploadFile();
      }
    };

    $scope.showModalLocationPick = function() {
      ModalService
        .init('templates/popups/location-modal.html', $scope)
        .then(function(modal) {
          modal.show();
        });
    };

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
        cssClass: 'confirm-title',
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

    $scope.init();
  }])