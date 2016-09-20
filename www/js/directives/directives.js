
angular.module('phsDriverApp.directives', [])

.directive('phsNumber', [function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elem, attr, ctrl) {
      elem.bind('keydown', function(event) {
        var valid = true;
        if (this.value.length < 1 || [8, 9, 46, 37, 39, 110].indexOf(event.keyCode) !== -1) {
          valid = true;
        } else {
          event.preventDefault();
          valid = false;
        }
        ctrl.$setValidity('passcode', valid);
        return valid;
      });
      elem.bind('keyup', function(event) {
        if (this.value.length !== 1) {
          ctrl.$setValidity('passcode', false);
        }
      });
    }
  };
}])

.directive("moveNext", ['$timeout', function ($timeout) {
  return {
    restrict: "A",
    link: function($scope, element) {
      element.on("input", function(e) {
        if (parseInt(element.attr("maxlength"))) {
          if (element.val().length === parseInt(element.attr("maxlength"))) {
            var $nextElement = element.next();
            if ($nextElement.length) {
              $timeout(function () {
                $nextElement[0].focus();
              }, 10);
            }
          }
        }
      });
    }
  };
}])

.directive('autofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  }
}])
  ;