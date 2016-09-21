angular.module('phsDriverApp.controllers')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$log', 'Utils', 'PhsServer', 'SessionFactory', function($rootScope, $scope, $log, Utils, PhsServer, SessionFactory) {
    $scope.passcode = {
      number1: '',
      number2: '',
      number3: '',
      number4: '',
      number5: ''
    };
    $scope.doLogin = function() {
      Utils.showLoading();
      PhsServer.doLogin($scope.passcode).then(function(user) {
        $rootScope.currentUser = user;
        $log.debug('User Infos', JSON.stringify(user));
        SessionFactory.setCurrentUser(user).then(function() {
          Utils.hideLoading();
          Utils.toLocation('/app/home');
        });
      }, function(error) {
        $log.debug('Login error Infos', error);
        Utils.hideLoading();
        Utils.toast('Can\'t process your request', 2000);
      });
    }
  }])