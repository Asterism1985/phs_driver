angular.module('phsDriverApp.services')
  .factory('AppConfig', ['$window', '$localForage', '$q', function($window, $localForage, $q) {

    var AppConfig = {};
    var appKeys = {
      currentUser: 'phsUser',
      appText: 'appText'
    };

    AppConfig.cacheAppText = function(textObj) {
      var deferred = $q.defer();
      $localForage.setItem(appKeys.appText, textObj).then(function() {
        deferred.resolve(true);
      });
      return deferred.promise;
    };

    AppConfig.appKeys = function() {
      return appKeys;
    };
    
    AppConfig.getAppTextCached = function() {
      var deferred = $q.defer();
      $localForage.getItem(appKeys.appText).then(function(textObj) {
        deferred.resolve(textObj);
      });
      return deferred.promise;
    }

    return AppConfig;
  }]);