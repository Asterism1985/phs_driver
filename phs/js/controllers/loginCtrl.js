angular.module('phsDriverApp.controllers')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$log', 'Utils', 'PhsServer', 'PhsLocalService', 'UserService', 'RequestService', 'AppConfig', '$cordovaGoogleAnalytics', function($rootScope, $scope, $log, Utils, PhsServer, PhsLocalService, UserService, RequestService, AppConfig, $cordovaGoogleAnalytics) {

    $scope.init = function() {
      $scope.errorMsg = null;
      if ($rootScope.isDevice) {
        $cordovaGoogleAnalytics.trackView('Login screen');
      }
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
          AppConfig.cacheAppText(appConfigs);
          Utils.hideLoading();
          UserService.registerTimeoutSession();
          Utils.toLocation('/app/home');
        }, function(error) {
          $scope.errorMsg = "Connect problem with server.";
          $log.debug('Login error Infos', error);
          Utils.hideLoading();
          if ($rootScope.isDevice) {
            $cordovaGoogleAnalytics.trackEvent('Login', 'Login Fail', employeeNumber, false);
          }
          //Utils.toast('Can\'t process your request', 2000);
          if ($rootScope.useLocalService) {
            $rootScope.currentUser = PhsLocalService.doLogin();
            $rootScope.AppText = PhsLocalService.getAppConfigs();
            Utils.toLocation('/app/home');
          }
        });
    };

    $scope.init();

  }]);