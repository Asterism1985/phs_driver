'use strict';
angular.module('phsDriverApp.services')

.factory('SessionFactory', ['$window',
  function($window) {
    var _sessionFactory = {};

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
    return _sessionFactory;
  }
]);