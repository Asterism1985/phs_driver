angular.module('phsDriverApp.controllers')
.controller('LoginCtrl', function($scope, $log, Utils, PhsServer) {
  $scope.passcode = {
      number1: '',
      number2: '',
      number3: '',
      number4: '',
      number5: ''
    };
    $scope.doLogin = function() {
      Utils.showLoading();
      PhsServer.doLogin($scope.passcode).then(function(data) {
        Utils.hideLoading();
        Utils.toLocation('/app/home');
      }, function(error) {
        Utils.hideLoading();
        Utils.toast('Can\'t process your request', 2000);
      });
    }

})