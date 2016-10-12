angular.module('phsDriverApp.controllers')
  .controller('NewLeadCtrl', ['$rootScope', '$scope', '$cordovaImagePicker', '$ionicModal', '$ionicPopover', '$ionicPopup', '$timeout', '$log', '$ionicSlideBoxDelegate', 'ModalService', 'LocationService', 'Utils', 'PhsServer', '$cordovaNativeAudio', function($rootScope, $scope, $cordovaImagePicker, $ionicModal, $ionicPopover, $ionicPopup, $timeout, $log, $ionicSlideBoxDelegate, ModalService, LocationService, Utils, PhsServer, $cordovaNativeAudio) {

    $scope.init = function() {

      $scope.data = {
        surname: '',
        companyName: '',
        description: '',
        accountNo: '',
        postcode: '',
        phone: '',
        email: ''
      };

      Utils.showLoading("Get current location...");

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
            LocationService.getAllNearBy(data).then(function(data) {
              $scope.locationsNearby = data;
              Utils.hideLoading();
              $scope.showModalLocationPick();
            }, function(error) {
              $log.debug("Can not get nearby location");
              Utils.hideLoading();
              $scope.showModalLocationPick();
            });

            
          }
        });
      }, function(error) {
        $log.debug("Can not get current location");
        Utils.hideLoading();
        $scope.showModalLocationPick();
      });
    };

    // Location picked from modal
    $scope.locationPicked = function(location) {
      $scope.data = {
        surname: '',
        companyName: location.name,
        description: location.street + ' ' + location.town,
        accountNo: location.accountNumber,
        postcode: location.postcode,
        phone: '',
        email: ''
      };
      $scope.closeModal();
    };

    $scope.inputYourLocation = function() {
      $scope.closeModal();
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

    // Popover info for successful submit & submit
    // A confirm dialog
    $scope.submitLead = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: '',
        cssClass: 'confirm-title',
        template: $rootScope.AppText.LEAD_CREATE_TITLE,
        cancelType: 'cancel-btn',
        okType: 'ok-btn-selected'
      });

      confirmPopup.then(function(res) {
        if (res) {
          $log.log('You are sure');
          Utils.showLoading();
          PhsServer.submitNewLead($scope.data).then(function(){
            Utils.hideLoading();
            $scope.showPopup();
            if ($rootScope.isDevice) {
              $cordovaNativeAudio.play('newLead');
            }
          }, function(error) {
            Utils.hideLoading();
            $log.debug("Create new lead error", error);
          })
          
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
  }]);