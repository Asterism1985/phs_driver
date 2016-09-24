angular.module('phsDriverApp.services')
  .service('PhsServer', PHSDriverService);

function PHSDriverService($rootScope, $log, $q, $http, Config, $cordovaFileTransfer) {

  path = {
    login: Config.api + '/Authentication/Login',
    logout: Config.api + '/Authentication/Logout',
    user: Config.api + '/user/',
    register: Config.api + '/reg/',
    badges: Config.api + '/DriverLeads/Badges',
    contactInfos: Config.api + '/DriverLeads/ContactInfo',
    elementLabelApp: Config.api + '/DriverLeads/ElementLabels',
    leadRecent: Config.api + '/DriverLeads/Leads/Recent',
    leadStatus: Config.api + '/DriverLeads/LeadStatus',
    //league table
    leagueTable: Config.api + '/DriverLeads/LeagueTable',
    storiesRecent: Config.api + '/DriverLeads/Stories/Recent',
    submitLead: Config.api + '/DriverLeads/Leads',
    //social
    like: Config.api + '/DriverLeads/Stories/Like', //GET
    unLike: Config.api + '/DriverLeads/Stories/Unlike',
    nearBy: Config.api + '/DriverLeads/Customers/Nearby' //Nearby?lat=51.600697&lgt=0.549094
  };


  this.getAppConfigs = function() {
    var deferred = $q.defer();
    $http.get(path.elementLabelApp).then(
      function(res) {
        deferred.resolve(res.data);
      },
      function(error) {
        $log.error(error);
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

  this.getContactInfos = function() {
    var deferred = $q.defer();
    $http.get(path.contactInfos).then(
      function(res) {
        deferred.resolve(res.data);
      },
      function(error) {
        $log.error(error);
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

  // User and Authentication
  this.doLogin = function(user) {
    $log.debug('user', user);
    var deferred = $q.defer();
    $http.post(path.login, user).then(
      function(res) {
        deferred.resolve(res.data);
      },
      function(error) {
        $log.error(error);
        deferred.reject(error);
      }
    );
    return deferred.promise;
  };
  this.doLogout = function() {
    $log.debug('logout call');
    var deferred = $q.defer();
    $http.post(path.logout).then(
      function(res) {
        deferred.resolve(true);
      },
      function(error) {
        $log.error(error);
        deferred.reject(error);
      }
    );
    return deferred.promise;
  };

  // Home UI 
  this.getLeadRecent = function() {
    var deferred = $q.defer();
    $http.get(path.leadRecent).then(
      function(res) {
        deferred.resolve(res.data);
      },
      function(error) {
        $log.error(error);
        deferred.reject(error);
      }
    );
    return deferred.promise;
  };
  this.getBadges = function() {
    var deferred = $q.defer();
    $http.get(path.badges).then(
      function(res) {
        deferred.resolve(res.data);
      },
      function(error) {
        $log.error(error);
        deferred.reject(error);
      }
    );
    return deferred.promise;
  };

  // LEAD Status UI
  this.getLeadStatus = function() {
    var deferred = $q.defer();
    $http.get(path.leadStatus).then(
      function(res) {
        deferred.resolve(res.data);
      },
      function(error) {
        $log.error(error);
        deferred.reject(error);
      }
    );
    return deferred.promise;
  };

  this.getStoriesRecent = function() {
    var deferred = $q.defer();
    $http.get(path.storiesRecent).then(
      function(res) {
        deferred.resolve(res.data);
      },
      function(error) {
        $log.error(error);
        deferred.reject(error);
      }
    );
    return deferred.promise;
  };

  // League Table UI
  this.getDataLeagueTable = function(param) {
    var deferred = $q.defer();
    $http.get(path.leagueTable + param).then(
      function(res) {
        deferred.resolve(res.data);
      },
      function(error) {
        $log.error(error);
        deferred.reject(error);
      }
    );
    return deferred.promise;
  };

  this.getAllLocationNearBy = function(param) {
    var deferred = $q.defer();
    $http.get(path.nearBy + param).then(
      function(res) {
        deferred.resolve(res.data);
      },
      function(error) {
        $log.error(error);
        deferred.reject(error);
      }
    );
    return deferred.promise;
  };


  this.getUserInformations = function(userId) {
    var deferred = $q.defer();
    $log.debug('userId', userId);
    $http.get(path.user + userId).then(
      function(response) {
        $log.debug('getUserInformations is: ', JSON.stringify(response.data));
        deferred.resolve(response.data);
      },
      function(error) {
        $log.debug('error getUserInformations', JSON.stringify(error));
        deferred.reject(error);
      }
    );
    return deferred.promise;
  };

}