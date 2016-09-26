'use strict';
angular.module('phsDriverApp.services')
.factory('LeagueService', [
  '$rootScope',
  'Utils',
  '$q',
  '$log',
  'PhsServer',
  function(
    $rootScope,
    Utils,
    $q,
    $log,
    PhsServer
  ) {
    var LeagueService = {};
    var params = {
      noparam: '',
      allL: '?type=all',
      myflt: '?type=myflt'
    };

    LeagueService.getCategoryLeague = function(type) {
      var deferred = $q.defer();
      PhsServer.getDataLeagueTable(type).then(function(data) {
        deferred.resolve(data);
      }, function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    LeagueService.getAllLeague = function() {
      return LeagueService.getCategoryLeague(params.allL);
    };

    LeagueService.getMyFLTLeague = function() {
      return LeagueService.getCategoryLeague(params.myflt);
    };

    return LeagueService;
  }
]);