angular.module('phsDriverApp.services')
  .service('PhsServer', PHSDriverService);

function PHSDriverService($rootScope, $log, $q, $http, Config, SessionFactory, $cordovaFileTransfer) {

  path = {
    login: Config.api + '/Authentication/Login',
    user: Config.api + '/user/',
    register: Config.api + '/reg/'
  };

  // User and Authentication
  this.doLogin = function(user) {
    $log.debug('user', user);
    var deferred = $q.defer();
    $http.post(path.login, user).then(
      function(res) {
        $log.debug('User Infos', JSON.stringify(res));
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