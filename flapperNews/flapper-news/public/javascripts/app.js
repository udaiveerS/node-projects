angular.module('flapperNews', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
       
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'partials/home',
                controller: 'MainCtrl',
                resolve: { 
                    postPromise: ['posts', '$location', function(posts, $location) {
                        console.log("resolving http " + $location.path());
                        return posts.getAll();
                    }]
                }

            });

        $stateProvider
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: 'partials/comments',
                controller: 'PostCtrl'
            });

        $urlRouterProvider.otherwise('home');
    }])
    .factory('posts', ['$http', function($http) {

        var obj = {
            posts: []
        };

        obj.getAll = function() { 
            return $http.get('/posts').success(function(data) {
                angular.copy(data, obj.posts);
            });
        };

        return obj;
    }])
    .controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
        $scope.posts = posts.posts; 

        $scope.addPost = function(){
            if(!$scope.title || $scope.title === '') return;
            $scope.posts.push({
                title: $scope.title, 
                upvotes: 0,
                link: $scope.link,
                comments: [
                {author: 'Joe', body: 'Cool post!', upvotes: 0},
                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            });
            $scope.title = '';
            $scope.link = '';
        };
        $scope.incrementUpvotes = function(post) {
            post.upvotes += 1; 
        };
    }])
    .controller('PostCtrl', ['$scope', '$stateParams', 'posts', '$state',
                function($scope, $stateParams, posts, $state) {
            //redirect if user ever tries to get acces to undefined / comment
            //$state.go('home');
            $scope.post = posts.posts[$stateParams.id];     
            $scope.incrementUpvotes = function(comment) {
                comment.upvotes += 1;     
            };
            $scope.addComment = function() {
                if($scope.author === '' || $scope.body === '') return;
                $scope.post.comments.push({ 
                    author: $scope.author,
                    body: $scope.body,
                    upvotes: 0
                });     
                $scope.author = '';
                $scope.body = '';
            };
        }]);
