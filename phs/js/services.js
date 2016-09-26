angular.module('phsDriverApp.services')

  .factory('Store', function($http, $q){

    var self = this;

    return self;

  })

  .factory('TokenInterceptor', ['$q', '$window', function($q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
        config.headers['X-Key'] = $window.sessionStorage.user;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },
 
    response: function(response) {
      return response || $q.when(response);
    }
  };
}])
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
