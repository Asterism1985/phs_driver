angular.module('phsDriverApp.directives')
  .directive('spinner', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        isLoading: '='
      },
      templateUrl: 'templates/directives/spinner.html'
    };
  })
  .directive('imageSlider', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/image-slider.html',
      controller: ['$rootScope', '$scope', '$log', '$ionicSlideBoxDelegate', '$timeout', '$cordovaImagePicker', '$ionicActionSheet', '$cordovaCamera', function($rootScope, $scope, $log, $ionicSlideBoxDelegate, $timeout, $cordovaImagePicker, $ionicActionSheet, $cordovaCamera) {

        $scope.files = [];

        $scope.chooseOptions = function() {

          $ionicActionSheet.show({
            buttons: [{
              text: 'Take a picture'
            }, {
              text: 'Select from gallery'
            }],
            titleText: 'Please select',
            buttonClicked: function(index) {
              if (index === 0) {
                $scope.takePicture();
              } else {
                $scope.selectImageCameraRoll();
              }
              return true;
            }
          });
        }

        $scope.takePicture = function() {
          var options = {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 400,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
          };
          $cordovaCamera.getPicture(options).then(function(fileURL) {
            $scope.files.push(fileURL);
            $timeout(function() {
              $ionicSlideBoxDelegate.slide(0);
              $ionicSlideBoxDelegate.update();
              $scope.$apply();
            }, 10);
          }, function(err) {
            // error
          });
        }

        $scope.selectImageCameraRoll = function() {
          var options = {
            maximumImagesCount: 5,
            width: 300,
            height: 400,
            quality: 100
          };
          $cordovaImagePicker.getPictures(options)
            .then(function(results) {
              $scope.files = $scope.files.concat(results);
              $timeout(function() {
                $ionicSlideBoxDelegate.slide(0);
                $ionicSlideBoxDelegate.update();
                $scope.$apply();
              }, 10);

            }, function(error) {
              // error getting photos
              $log.debug(error);
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
        $scope.removeImage = function(index) {
          $scope.files.splice($scope.slideIndex, 1);
          $timeout(function() {
            $ionicSlideBoxDelegate.slide(0);
            $ionicSlideBoxDelegate.update();
            $scope.$apply();
          }, 10);
        };

        $scope.$watch(function($scope) {
            return $scope.files;
          },
          function(newValue, oldValue) {
            if (newValue !== oldValue && $scope.files.length > 0) {
              $timeout(function() {
                $ionicSlideBoxDelegate.slide($scope.files.length - 1);
                $ionicSlideBoxDelegate.update();
                $scope.$apply();
              }, 10);
            }
          }
        );

      }]
    };
  });