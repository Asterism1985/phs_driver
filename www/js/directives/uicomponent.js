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
      controller: ['$scope', '$ionicSlideBoxDelegate', function($scope, $ionicSlideBoxDelegate) {
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
      }]
    };
  });