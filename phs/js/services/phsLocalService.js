angular.module('phsDriverApp.services')
  .service('PhsLocalService', PHSLocalService);

function PHSLocalService($rootScope, $log, $q, $http, Config, $cordovaFileTransfer) {


  this.getAppConfigs = function() {
    var response = {
      "HEADER_CONTACT": "Contact",
      "HOME_FOOTER_MESSAGE": "Thank you for being part of the team, John Smith",
      "HOME_TITLE": "Home",
      "HOME_MENU": "Home",
      "HOME_YOUR_BADGES": "Your Badges",
      "HOME_MOST_RECENT_LEADS": "Most Recent Leads",
      "HOME_STATUS": "Status",
      "HOME_NEW_LEAD": "New Lead",
      "NEW_LEAD_TITLE": "New Lead",
      "LEAD_CREATE_TITLE": "New Lead",
      "NEW_LEAD_MENU": "New Lead",
      "NEW_LEAD_YOUR_LOCATION": "Your Location",
      "NEW_LEAD_NO_LOCATION": "I can't find my location",
      "LEAD_CREATE_LEAD_CONTACT_SURNAME": "Lead Contact Surname",
      "LEAD_CREATE_LEAD_COMPANY_NAME": "Lead Company Name",
      "LEAD_CREATE_DESCRIPTION": "Description *",
      "LEAD_CREATE_UPLOAD": "Upload",
      "LEAD_CREATE_ACCOUNT_NO": "AccountNo",
      "LEAD_CREATE_POSTCODE": "Postcode",
      "LEAD_CREATE_PHONE": "Phone",
      "LEAD_CREATE_EMAIL": "Email",
      "LEAD_CREATE_SUBMIT": "Submit",
      "LEAD_STATUS_TITLE": "Lead Status",
      "LEAD_STATUS_LEAD": "Lead:",
      "LEAD_STATUS_COMPANY_NAME": "Company Name:",
      "LEAD_STATUS_DATE": "Date:",
      "LEAGUE_TABLE_LEAD_TITLE": "League Table",
      "LEAGUE_TABLE_MY_FLT": "My FLT",
      "LEAGUE_TABLE_ALL": "All",
      "LEAGUE_TABLE_POSITION": "Position",
      "LEAGUE_TABLE_DRIVER": "Driver",
      "LEAGUE_TABLE_CONVERTED_LEADS": "Converted Leads",
      "LEAGUE_TABLE_YOUR_CURRENT_POSITON": "Your current position",
      "ALL_STORIES_TITLE": "All Stories",
      "ALL_STORIES_POSTED_BY": "Posted By:",
      "ALL_STORIES_DATE": "Date:",
      "NEW_STORY_TITLE": "Post New Story",
      "NEW_STORY_STORY_TITLE": "Story title",
      "NEW_STORY_STORY_BODY": "Type your story here...",
      "NEW_STORY_SUBMIT": "Submit",
    };
    return response;
  };

  this.getContactInfos = function() {
    return [{
      "title": "My FLT Admin Contacts",
      "image": "uU2CM1SEly6cAVv9PdTpH8...IjdmINwhHBosvt5kdg==",
      "sections": [{
        "sectionHeaderId": "SALES_CONTACT",
        "sectionHeaderLabel": "Sales Contacts",
        "items": [{
          "id": "NAME",
          "label": "Name(s):",
          "values": [
            "John Smith",
            "Joe Jones"
          ]
        }, {
          "id": "EMAIL",
          "label": "Email:",
          "values": [
            "FLT001@phs.co.uk"
          ]
        }, {
          "id": "PHONE",
          "label": "Phone:",
          "values": [
            "02920 809956"
          ]
        }]
      }, {
        "sectionHeaderId": "SERVICE_CONTACT",
        "sectionHeaderLabel": "Service Contacts",
        "items": [{
          "id": "NAME",
          "label": "Name(s):",
          "values": [
            "John Jones"
          ]
        }, {
          "id": "EMAIL",
          "label": "Email:",
          "values": [
            "FLT001@phs.co.uk"
          ]
        }, {
          "id": "PHONE",
          "label": "Phone:",
          "values": [
            "02920 809957"
          ]
        }]
      }]
    }]
  };

  // User and Authentication
  this.doLogin = function(user) {
    var response = {
      "token": "U6sQyf4kNYIYVxtbuPeYkFwhEDHcf5uak7n0Bx4Efum6BtbmW8Q7sUmpKkm5I2fSDHOZjEK8VLT0sBRkBurioyTAU9pqk96npEC4QndsxSlSaw7jEbDoL8EeZnelotXWPFKZ9XFor9VGnbAxbgWjGSNsayfCi2ed5zdGWhlRHo8Mm81XYSkiIOq83sZKScgA5RLZ94L45f",
      "expiryDate": "2016-10-01T12:19:14.8795966+01:00",
      "fullName": "Graham Callaway",
      "image": "iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAAAo1JREFUWAntmG1r01AUx//puifX1bW2q62bttvoNlHoGAxfTEFBEPTd8M0+gH6OfQw/hSD62gc2JvhA58Bqrbp1k67DVVrrJtiH5VxZQzEmubk3hUIOFJKck//55Z97by5VVh48bKLLwtNlvAzXhe7UW3Oddp02cMAdHgbmSE25Tku100DMa5CzlUqeP4uZRBS+UwOoHv7Gh68FZPN7trT+d5M06F5vD+5cS+Hy1Hhbr9T0BWzmdvD4RRp/avW2nN0TaWP67s2Ff4BPoOhBKC8rpEDPJmKYGo8YMlGe6mSEFOj5i3FLLPOz1urMxKRAR4KnzfqwfOSMtTozMWForzoBhwb7zfqwPNVRvWgIQ9fUFaHy68gSB9VRvWgIQxPA3kHZEofVOjMxKdDrGzmzPixvtc5MTAr0duE7NrJ5w16UpzoZIe2L+Oj5Wza2F1NJKIrSYms2m1hNZ/HsdaZ1TfRAGrTKhqevMnj/+Rum41EMq3uPn+re4+NWAcVSRZSz7X4p0IlYWF3KPPiULzJAPch4LIRavYHdYqkNwM6JEDR9lhfnkoiGRljvg3IVbzJb2C+VUakewe8bxGjAj7mZOMKBYVazo0KvqcMlu21/56fY+Ycp6B/C7aspJM6F7RjF7vmyu48nq2n8qBxya3CvHmORIO4tXRcCJsqJsVHcX7oB0uMNLmhyePnWFfT1Co2qFiPpkB7p8gQX9MKlSQz09/Hom9aSHunyBBd0KODj0bZcy6vLBU1rsRPBq8sFTTPeieDV5ZpRLzf/boxo5vd4uJ5X91nrjQYI+ERXt0jnIhc0vcb1dzn209Hq2CVxuzqGqjVyoTUvnD1ynXbWX03ddVrzwtkj12ln/dXUu9LpY+3RqpY1suktAAAAAElFTkSuQmCC"
    };
    return response;
  };
  this.doLogout = function() {
    $log.debug('logout call');
    var deferred = $q.defer();
    // $http.post(path.logout).then(
    //   function(res) {
    deferred.resolve(true);
    //   },
    //   function(error) {
    //     $log.error(error);
    //     deferred.reject(error);
    //   }
    // );
    return deferred.promise;
  };

  // Home UI 
  this.getLeadRecent = function() {
    return [{
      "id": "001580000034wa3AAA",
      "createdDate": "2016-04-01 16:20:00",
      "companyName": "My Company 1",
      "status": "New"
    }, {
      "id": "001580000034wa3AAB",
      "createdDate": "2016-03-10 12:20:00",
      "companyName": "My Company 1",
      "status": "Opportunity"
    }, {
      "id": "001580000034wa3AAC",
      "createdDate": "2016-03-10 12:10:00",
      "companyName": "My Company 1",
      "status": "Won"
    }];

  };
  this.getBadges = function() {
    var response = [{
      "badgeId": "LEAD",
      "badgeName": "Lead",
      "badgeScore": 50,
      "badgeScoreBands": [{
        "bandId": "NO_ACHIEVEMENT",
        "bandName": "No Achievement",
        "rangeMin": 0,
        "rangeMax": 19
      }, {
        "bandId": "BRONZE",
        "bandName": "Bronze",
        "rangeMin": 20,
        "rangeMax": 49
      }, {
        "bandId": "SILVER",
        "bandName": "Silver",
        "rangeMin": 50,
        "rangeMax": 99
      }, {
        "bandId": "GOLD",
        "bandName": "Gold",
        "rangeMin": 100,
        "rangeMax": 99999999
      }]
    }, {
      "badgeId": "CONVERTED_LEAD",
      "badgeName": "Converted Lead",
      "badgeScore": 25,
      "badgeScoreBands": [{
        "bandId": "NO_ACHIEVEMENT",
        "bandName": "No Achievement",
        "rangeMin": 0,
        "rangeMax": 19
      }, {
        "bandId": "BRONZE",
        "bandName": "Bronze",
        "rangeMin": 20,
        "rangeMax": 49
      }, {
        "bandId": "SILVER",
        "bandName": "Silver",
        "rangeMin": 50,
        "rangeMax": 99
      }, {
        "bandId": "GOLD",
        "bandName": "Gold",
        "rangeMin": 100,
        "rangeMax": 99999999
      }]
    }, {
      "badgeId": "STORY",
      "badgeName": "Story",
      "badgeScore": 5,
      "badgeScoreBands": [{
        "bandId": "NO_ACHIEVEMENT",
        "bandName": "No Achievement",
        "rangeMin": 0,
        "rangeMax": 19
      }, {
        "bandId": "BRONZE",
        "bandName": "Bronze",
        "rangeMin": 1,
        "rangeMax": 2
      }, {
        "bandId": "SILVER",
        "bandName": "Silver",
        "rangeMin": 3,
        "rangeMax": 7
      }, {
        "bandId": "GOLD",
        "bandName": "Gold",
        "rangeMin": 8,
        "rangeMax": 99999999
      }]
    }];
    return response;
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

  this.getAllLocationNearBy = function(location) {
    //Nearby?lat=51.600697&lgt=0.549094
    var deferred = $q.defer();
    //cheat code to test  (lat=51.600697&lng=0.549094)
    location.lat = '51.600697';
    location.lng = '0.549094';

    $http.get(path.nearBy + '?lat=' + location.lat + '&lng=' + location.lng).then(
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

  // Submit New Lead 
  this.submitNewLead = function(leadObj) {
    $log.debug('leadObj', leadObj);
    var deferred = $q.defer();
    $http.post(path.submitNewLead, leadObj).then(
      function() {
        deferred.resolve(true);
      },
      function(error) {
        $log.error(error);
        deferred.reject(error);
      }
    );
    return deferred.promise;
  };

  // Submit New Lead 
  this.postNewStory = function(storyObj) {
    $log.debug('storyObj', storyObj);
    var deferred = $q.defer();
    $http.post(path.submitNewStory, storyObj).then(
      function() {
        deferred.resolve(true);
      },
      function(error) {
        $log.error(error);
        deferred.reject(error);
      }
    );
    return deferred.promise;
  };

  this.rsvpAStory = function(storyObj) {
    $log.debug('storyObj', storyObj);
    var deferred = $q.defer();
    $http.post(path.like, storyObj).then(
      function() {
        deferred.resolve(true);
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