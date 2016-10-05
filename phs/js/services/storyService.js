
angular.module('phsDriverApp.services')

.factory('StoryService',[
  '$rootScope',
  '$state',
  'Utils',
  '$q',
  '$log',
  'PhsServer',
  function (
  $rootScope,
  $state,
  Utils,
  $q,
  $log,
  PhsServer
) {
  var StoryService = {};

  var allStories = [];

  StoryService.getAllStories = function () {
    var deferred = $q.defer();
    PhsServer.getStoriesRecent().then(function(data){
      deferred.resolve(data);
      allStories = data;
    }, function(error){
      deferred.reject(error);
    });
    return deferred.promise;
  };

  StoryService.postNewStory = function (story) {
    var deferred = $q.defer();
    PhsServer.postNewStory(story).then(function(){
      deferred.resolve(true);
    }, function(error){
      deferred.reject(error);
    });
    return deferred.promise;
  };

  StoryService.getOneStory = function (index) {
    return allStories[index];
  };

  StoryService.rsvpToAStory = function (storyId) {
    var deferred = $q.defer();
    PhsServer.rsvpAStory(storyId).then(function(){
      deferred.resolve(true);
    }, function(error){
      deferred.reject(error);
    });
    return deferred.promise;
  };

  StoryService.getAllStoriesCache = function() {
    return allStories;
  };

  return StoryService;
}]);
