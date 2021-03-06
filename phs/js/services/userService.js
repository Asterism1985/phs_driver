angular.module('phsDriverApp.services')

.factory('UserService', ['$rootScope', '$window', '$log', 'PhsServer', '$localForage', 'AppConfig', '$q', 'Utils', '$timeout', '$cordovaGoogleAnalytics',
  function($rootScope, $window, $log, PhsServer, $localForage, AppConfig, $q, Utils, $timeout, $cordovaGoogleAnalytics) {
    var UserService = {};
    var currentUser = null;

    UserService.getCurrentUser = function() {
      var deferred = $q.defer();
      $localForage.getItem(AppConfig.appKeys().currentUser).then(function(user) {
        if (user) {
          deferred.resolve(user);
        } else {
          deferred.reject();
        }
      });
      return deferred.promise;
    };

    UserService.setCurrentUser = function(user) {
      var deferred = $q.defer();
      var realImageUser = Utils.corectImageBase64(user.image);
      user.image = realImageUser;
      currentUser = user;
      $localForage.setItem(AppConfig.appKeys().currentUser, user).then(function() {
        deferred.resolve(true);
      });
      return deferred.promise;
    };

    UserService.createSession = function(user) {
      $window.localStorage.user = JSON.stringify(user);
    };

    UserService.getSession = function() {
      var deferred = $q.defer();
      $localForage.getItem(AppConfig.appKeys().currentUser).then(function(session) {
        deferred.resolve(session);
      });
      return deferred.promise;
    };

    UserService.deleteSession = function() {
      delete $window.localStorage.user;
      return true;
    };

    UserService.checkSession = function() {
      if ($window.localStorage.user) {
        return true;
      } else {
        return false;
      }
    };

    UserService.clearAll = function() {
      return $localForage.clear();
    };

    UserService.registerTimeoutSession = function() {
      $log.debug("Register trigger 5s to logout");
      var timeOutTimerValue = 24 * 60 * 60 * 1000; //1 day to logout the app. to milisecond
      // Start a timeout
      if ($rootScope.isDevice) {
        $cordovaGoogleAnalytics.trackEvent('SessionInterval', 'time out session', 'Auto logout', timeOutTimerValue);
      }
      var TimeOut_Thread = $timeout(function() {
        UserService.logOut().then(function() {
          //track call auto log out
          if ($rootScope.isDevice) {
            $cordovaGoogleAnalytics.trackEvent('Logout', 'Auto Logout', 'Auto logout', timeOutTimerValue);
          }
          $log.debug("auto call logout Service");
          Utils.toLocation('/login');
        });
      }, timeOutTimerValue);
    };

    UserService.logOut = function() {
      var deferred = $q.defer();
      PhsServer.doLogout(currentUser.token).then(function() {
          return UserService.clearAll();
        })
        .then(function() {
          return Utils.clearHistory();
        })
        .then(function() {
          deferred.resolve(true);
        }, function(error) {
          deferred.reject(error);
        });
      return deferred.promise;
    };

    return UserService;
  }
]);