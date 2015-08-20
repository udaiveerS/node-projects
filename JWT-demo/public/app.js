(function() {
    var app = angular.module('app', [], function config($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });

    app.constant('API_URL', 'http://localhost:3000');

    app.controller('MainCtrl', function(RandomUserFactory, UserFactory) {
       var vm = this; 

       vm.getRandomUser = getRandomUser;
       vm.login = login; 
       vm.logout = logout;

    function getRandomUser() {
        RandomUserFactory.getUser().then(function(response) {
           vm.randomUser = response.data;
        });
    }

    function login(username, password) {
        UserFactory.login(username, password).then(function(response) { 
            vm.user = response.user;
            alert(response.token);
        }, handleError); 
    }

    function logout() {
        UserFactory.logout();        
        vm.username = ''; 
        vm.password = '';
        vm.user = null;
    }

    function handleError(response) {
        alert('Error: ' + response.data);
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

   app.factory('UserFactory', function UserFacatory($http, API_URL, AuthTokenFactory) {

       return {
           login: login,
           logout: logout
       };

       function login(username, password) {
           return $http.post(API_URL + '/login', { 
               username: username,
               password: password
           }).then(function(success) {
               AuthTokenFactory.setToken(success.data.token);
               return success.data;
           }); 
       }

       function logout() {
           AuthTokenFactory.setToken();
       }

   });

   app.factory('AuthTokenFactory', function($window) {
       var store = $window.localStorage; 
       var key = "auth-token"; 

       return { 
           getToken: getToken,
           setToken: setToken
       };

       function getToken() {
           return store.getItem(key); 
       }

       function setToken(token) {
           if(token) { 
               store.setItem(key, token); 
           } else { 
               store.removeItem(key); 
           }
       }
   }); 

    app.factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory) {
        return {
            request: addToken
        };

        function addToken(config) {
            var token = AuthTokenFactory.getToken();
            if(token) {
                config.headers = config.headers || {}; 
                config.headers.Authoriziation = 'Bearer ' + token;
               }
            return config;
        }
    });
    
})();
