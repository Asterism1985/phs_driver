angular.module('phsDriverApp.controllers')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$log', 'Utils', 'PhsServer', 'UserService', '$window', function($rootScope, $scope, $log, Utils, PhsServer, UserService, $window) {

    $scope.init = function() {
      $scope.passcode = {
        number1: '',
        number2: '',
        number3: '',
        number4: '',
        number5: ''
      };
    };

    $scope.doLogin = function() {

      Utils.showLoading();
      PhsServer.doLogin($scope.passcode).then(function(user) {
        $rootScope.currentUser = user;
        $log.debug('User Infos', JSON.stringify(user));
        return UserService.setCurrentUser(user);
      })
      .then(function() {
        return PhsServer.getAppConfigs();
      })
      .then(function(appConfigs) {
        $log.debug("AppConfig label: ", appConfigs);
        $rootScope.AppText = appConfigs;
        Utils.hideLoading();
        UserService.registerTimeoutSession();
        Utils.toLocation('/app/home');
      }, function(error) {
        $log.debug('Login error Infos', error);
        Utils.hideLoading();
        Utils.toast('Can\'t process your request', 2000);
      });
    };

    $scope.init();

  }]);