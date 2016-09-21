angular.module('phsDriverApp.directives')
.directive('spinner', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope:{
      	isLoading:'='
      },
      templateUrl: 'templates/directives/spinner.html'
    };
  });