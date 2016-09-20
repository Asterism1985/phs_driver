angular.module('phsDriverApp.services')
  .factory('Utils', ['$rootScope', '$ionicLoading', '$timeout', '$ionicHistory', '$location', '$cordovaFileTransfer', '$log', function($rootScope, $ionicLoading, $timeout, $ionicHistory, $location, $cordovaFileTransfer, $log) {
    var UtilsSrv = {

      showLoading: function(msg) {
        $ionicLoading.show({
          template: msg || 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
      },

      hideLoading: function() {
        $ionicLoading.hide();
      },

      toast: function(msg, time) {
        if (!time) {
          time = 1000;
        }
        UtilsSrv.showLoading(msg);
        $timeout(function() {
          UtilsSrv.hideLoading();
        }, time);
      },
      clearHistory: function() {
        // SessionFactory.clearAll();
        $ionicHistory.clearHistory();
        return $ionicHistory.clearCache();
      },
      toLocation: function(url) {
        $location.path(url);
      }

    };
    return UtilsSrv;
  }]);