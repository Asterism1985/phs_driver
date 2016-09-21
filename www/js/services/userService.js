'use strict';
angular.module('phsDriverApp.services')

.factory('SessionFactory', ['$window', '$localForage', 'AppConfig', '$q', 'Utils',
  function($window, $localForage, AppConfig, $q, Utils) {
    var _sessionFactory = {};

    _sessionFactory.getCurrentUser = function() {
        var deferred = $q.defer();
        $localForage.getItem(AppConfig.appKeys.currentUser).then(function(user) {
          deferred.resolve(user);
        });
        return deferred.promise;
      },

      _sessionFactory.setCurrentUser = function(user) {
        var deferred = $q.defer();
        if (user.image) {
          user.image = Utils.corectImageBase64(user.image);
        }
        $localForage.setItem(AppConfig.appKeys.currentUser, user).then(function() {
          deferred.resolve(true);
        });
        return deferred.promise;
      },

      _sessionFactory.createSession = function(user) {
        return $window.localStorage.user = JSON.stringify(user);
      };

    _sessionFactory.getSession = function() {
      return JSON.parse($window.localStorage.user);
    };

    _sessionFactory.deleteSession = function() {
      delete $window.localStorage.user;
      return true;
    };

    _sessionFactory.checkSession = function() {
      if ($window.localStorage.user) {
        return true;
      } else {
        return false;
      }
    };

    _sessionFactory.clearAll = function() {
      return $localForage.clear();
    };

    return _sessionFactory;
  }
]);