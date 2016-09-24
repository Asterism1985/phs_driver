'use strict';
angular.module('phsDriverApp.services')

.factory('UserService', ['$window', '$localForage', 'AppConfig', '$q', 'Utils',
  function($window, $localForage, AppConfig, $q, Utils) {
    var UserService = {};

    UserService.getCurrentUser = function() {
        var deferred = $q.defer();
        $localForage.getItem(AppConfig.appKeys.currentUser).then(function(user) {
          deferred.resolve(user);
        });
        return deferred.promise;
      },

      UserService.setCurrentUser = function(user) {
        var deferred = $q.defer();
        $localForage.setItem(AppConfig.appKeys.currentUser, user).then(function() {
          deferred.resolve(true);
        });
        return deferred.promise;
      },

      UserService.createSession = function(user) {
        return $window.localStorage.user = JSON.stringify(user);
      };

    UserService.getSession = function() {
      return JSON.parse($window.localStorage.user);
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

    UserService.logOut = function() {
      var deferred = $q.defer();
      return UserService.clearAll().then(function(){
        return Utils.clearHistory();
      })
      .then(function(){
        deferred.resolve(true);
      }, function(error){
        deferred.reject(error);
      })
      deferred.promise();
    };

    return UserService;
  }
]);