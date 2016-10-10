angular.module('phsDriverApp.services')

  .factory('Store', function($http, $q){

    var self = this;

    return self;

  })

.factory('RequestService', function RequestService() {
  var token = '0BjXPsVtV6vAFMjIPF5wPdZK2NLkX68PGqOoiVpVCdZjR46dJ5BxH647MK5bSKGZ8Q4p86z4pk5MoP39SHL2FKhLwSNJ0oc3H0mbaRfOGHixasS7R7tk9OuyIt3qt0ebhceoD29aB8w8CVKdaQ245243QZDSY0vQDgq9oDEZ9sUbsw6YT0qN9kgpilJPzrnMMRFvFL0Hmd5Mi2Lu3P98JSSs0';

  var setToken = function setToken(someToken) {
    token = someToken;
  };

  var getToken = function getToken() {
    return token;
  };

  var request = function request(config) {

    if (token) {
      config.headers.auth_key = token;
    }
    return config;
  };

  return {
    setToken: setToken,
    getToken: getToken,
    request: request
  };
})
//TO USE IT
// $scope.modal1 = function() {
//     ModalService
//       .init('modal1.html', $scope)
//       .then(function(modal) {
//         modal.show();
//       });
//   };

//   $scope.modal2 = function() {
//     ModalService
//       .init('modal2.html')
//       .then(function(modal) {
//         modal.show();
//       });
//   };

//http://stackoverflow.com/questions/25214451/ionic-modal-windows-from-service
.service('ModalService', ['$ionicModal', '$rootScope', function($ionicModal, $rootScope) {
  var init = function(tpl, $scope) {
    var promise;
    $scope = $scope || $rootScope.$new();

    promise = $ionicModal.fromTemplateUrl(tpl, {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function(modal) {
      $scope.modal = modal;
      return modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    return promise;
  };

  return {
    init: init
  };

}]);
