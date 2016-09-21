'use strict';
angular.module('phsDriverApp.services')
  .factory('AppConfig', [function () {
    return {
      keys: {
      	currentUser: 'phsUser'
      }
    };
  }]);