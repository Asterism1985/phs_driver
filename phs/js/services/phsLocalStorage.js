
angular.module('phsDriverApp.services')
  .factory('LocalStorageService',['$log', '$q', 'Utils', function ($log, $q, Utils) {
    var service = {};

    service.set = function (key, value, expires) {
      var deferred = $q.defer();

      return deferred.promise;
    };

    service.get = function (key) {
      return deferred.promise;
    };

    service.clearAppData = function(keepUser) {
      return window.clearCacheApplication(keepUser);
    };

    service.clearAll = function () {
      service.enabled().then(function (enabled) {
        if (enabled === false) {
          return false;
        }
        $log.debug('[Cache] clearAll:');
        return window.localforage.clear();
      });
    };

    return service;
  }]);
