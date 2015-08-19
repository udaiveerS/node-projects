(function() {
   var app = angular.module('app', []);

   app.constant('API_URL', 'http://localhost:3000');

   app.controller('MainCtrl', function(RandomUserFactory) {
       var vm = this; 

       vm.getRandomUser = getRandomUser;

       function getRandomUser() {
           RandomUserFactory.getUser().then(function(response) {
               vm.randomUser = response.data;
            });
       }
   });

   app.factory('RandomUserFactory', function($http, API_URL) {
       return {
           getUser: getUser
       };

       function getUser() {
           return $http.get(API_URL + '/random-user');
       }
   });

})();
