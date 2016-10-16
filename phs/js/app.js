angular.module('phsDriverApp.services', []);
angular.module('phsDriverApp.controllers', []);
angular.module('phsDriverApp.directives', []);
angular.module('phsDriverApp.templates', []);

angular.module('phsDriverApp', ['ionic', 'phsDriverApp.controllers', 'phsDriverApp.directives', 'phsDriverApp.services', 'phsDriverApp.templates', 'ngCordova', 'ngCountup', 'LocalForageModule', 'ngFileUpload'])

.constant('Config', {
    api: 'https://mobilewebapi.phs.co.uk/Salesforce.MobileServices/api' // baseURL
  })

.run(function($ionicPlatform, $rootScope, UserService, $log, AppConfig, Utils, RequestService, $cordovaGoogleAnalytics) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.useLocalService = true;

    $rootScope.isDevice = (ionic.Platform.device().available && ionic.Platform.device().platform !== 'browser') || false;
    window.isDevice = $rootScope.isDevice;
    $log.debug("isDevice is: ", $rootScope.isDevice);
    var currentUser = {};
    $rootScope.AppText = {};
    UserService.getCurrentUser().then(function(user){
      $log.debug('user id', user);
      $rootScope.currentUser = user;
      RequestService.setToken(user.token);
      return AppConfig.getAppTextCached();
    })
    .then(function(appText){
      $log.debug('get app text from cache');
      $rootScope.AppText = appText;
      Utils.toLocation('/app/home');
    }, function(error) {
    });


    //Setup google analytics
    if (window.isDevice) {
      $cordovaGoogleAnalytics.debugMode();
      $cordovaGoogleAnalytics.startTrackerWithId('UA-85735750-1');
      $cordovaGoogleAnalytics.setUserId('85735750');
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $logProvider, $httpProvider, $localForageProvider) {

  $localForageProvider.config({
        driver      : 'localStorageWrapper',
        name        : 'PhsDriver', // name of the database and prefix for your data, it is "lf" by default
        version     : 1.0, // version of the database, you shouldn't have to use this
        storeName   : 'phstbl' // name of the table
  });


  $httpProvider.interceptors.push('RequestService');

  $logProvider.debugEnabled(true);

  $stateProvider

  .state('login', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.newlead', {
      url: '/newlead',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/newLead.html',
          controller: 'NewLeadCtrl'
        }
      }
    })

  .state('app.leadstatus', {
      url: '/leadstatus',
      views: {
        'menuContent': {
          templateUrl: 'templates/leadstatus.html',
          controller: 'LeadStatusCtrl'
        }
      }
    })
    .state('app.leaguetable', {
      url: '/leaguetable',
      views: {
        'menuContent': {
          templateUrl: 'templates/leaguetable.html',
          controller: 'LeagueCtrl'
        }
      }
    })
    .state('app.stories', {
      url: '/stories',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/stories.html',
          controller: 'StoriesCtrl'
        }
      }
    })
    .state('app.storySingle', {
      url: '/storyDetail',
      cache: false,
      params: {
        storyInfo: null
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/storiesSingle.html',
          controller: 'StoryDetailCtrl'
        }
      }
    })
    .state('app.newStory', {
      url: '/newstory',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/newStory.html',
          controller: 'NewStoryCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});