angular.module('phsDriverApp', ['ionic', 'phsDriverApp.controllers', 'phsDriverApp.directives', 'phsDriverApp.services', 'ngCordova', 'ngCountup'])

.constant('Config', {
    api: 'https://mobilewebapi.phs.co.uk/Salesforce.MobileServices/api' // baseURL
  })

.run(function($ionicPlatform, $rootScope) {
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

    $rootScope.isDevice = (ionic.Platform.device().available && ionic.Platform.device().platform !== 'browser') || false;
    window.isDevice = $rootScope.isDevice;
  });
})

.config(function($stateProvider, $urlRouterProvider, $logProvider) {

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
      views: {
        'menuContent': {
          templateUrl: 'templates/stories.html',
          controller: 'StoriesCtrl'
        }
      }
    })
    .state('app.storySingle', {
      url: '/stories/:singleID',
      views: {
        'menuContent': {
          templateUrl: 'templates/storiesSingle.html',
          controller: 'StoriesCtrl'
        }
      }
    })
    .state('app.newStory', {
      url: '/newstory',
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