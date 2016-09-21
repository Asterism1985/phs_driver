angular.module('phsDriverApp.controllers')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$log', 'Utils', 'PhsServer', 'SessionFactory', '$window', function($rootScope, $scope, $log, Utils, PhsServer, SessionFactory, $window) {

    $scope.init = function() {
      $scope.passcode = {
        number1: '',
        number2: '',
        number3: '',
        number4: '',
        number5: ''
      };
    }

    $scope.doLogin = function() {

      Utils.showLoading();
      PhsServer.doLogin($scope.passcode).then(function(user) {
        $rootScope.currentUser = user;
        $log.debug('User Infos', JSON.stringify(user));
        return SessionFactory.setCurrentUser(user);
      })
      .then(function() {
        return PhsServer.getAppConfigs();
      })
      .then(function(appConfigs) {
        $window.appConfigs = appConfigs;
        Utils.hideLoading();
        Utils.toLocation('/app/home');
      }
      , function(error) {
        $log.debug('Login error Infos', error);
        Utils.hideLoading();
        Utils.toast('Can\'t process your request', 2000);
      });
    };

    $scope.init();

  }])