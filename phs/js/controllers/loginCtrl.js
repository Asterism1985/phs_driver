angular.module('phsDriverApp.controllers')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$log', 'Utils', 'PhsServer', 'UserService', 'RequestService', function($rootScope, $scope, $log, Utils, PhsServer, UserService, RequestService) {

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
      var employeeNumber = '' + $scope.passcode.number1 + $scope.passcode.number2 + $scope.passcode.number3 + $scope.passcode.number4 + $scope.passcode.number5;
      $scope.data = {
        employeeNumber: employeeNumber
      };

      Utils.showLoading();
      PhsServer.doLogin($scope.data).then(function(user) {
        $rootScope.currentUser = user;
        RequestService.setToken(user.token);
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