'use strict';
angular.module('phsDriverApp.services')
  .factory('AppConfig', ['$window', function ($window) {
    return {
      appKeys: {
      	currentUser: 'phsUser'
      },

      appLabel: $window.appConfigs
    };
  }]);