
angular.module('phsDriverApp.services').factory('LocationService', ['$rootScope', '$state', 'Utils', '$q', '$log', 'PhsServer', '$cordovaGeolocation', function($rootScope, $state, Utils, $q, $log, PhsServer, $cordovaGeolocation) {
  var LocationService = {};

  LocationService.getAllNearBy = function(location) {
    var deferred = $q.defer();
    PhsServer.getAllLocationNearBy(location).then(function(data) {
      deferred.resolve(data);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };

  LocationService.getCurrentLocation = function() {
    var posOptions = {
      timeout: 10000,
      enableHighAccuracy: false
    };
    var deferred = $q.defer();
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function(position) {
        $log.debug("current position: ", position);
        var curPosition = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        };
        deferred.resolve(curPosition);
      }, function(error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  return LocationService;
}]);