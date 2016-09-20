angular.module('phsDriverApp.services')
  .service('PHSDriverServer', PHSDriverService);

function PHSDriverService($rootScope, $log, $q, $http, Config, SessionFactory, $cordovaFileTransfer) {

  path = {
    login: Config.api + '/Authentication/Login',
    user: Config.api + '/user/',
    register: Config.api + '/reg/'
  };

  this.register = register;
  this.createUser = createUser;
  this.getUserDetails = getUserDetails;
}