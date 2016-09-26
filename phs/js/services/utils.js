angular.module('phsDriverApp.services')
  .factory('Utils', ['$rootScope', '$ionicLoading', '$timeout', '$ionicHistory', '$location', '$cordovaFileTransfer', '$log', function($rootScope, $ionicLoading, $timeout, $ionicHistory, $location, $cordovaFileTransfer, $log) {
    var UtilsSrv = {

      showLoadingTitle: function(msg) {
        $ionicLoading.show({
          template: msg || 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
      },

      showLoading: function(msg) {
        if (!msg) {
          msg = 'loading...';
        }
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'+'<p>'+msg+'</p>',
            noBackdrop: 'true'
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
        //SessionFactory.clearAll();
        $ionicHistory.clearHistory();
        return $ionicHistory.clearCache();
      },
      toLocation: function(url) {
        $location.path(url);
      },
      corectImageBase64: function (base64) {
        return 'data:image/jpeg;base64,'+ base64;
      }
    };
    return UtilsSrv;
  }]);