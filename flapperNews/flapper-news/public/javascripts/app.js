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
                controller: 'PostCtrl',
                resolve: { 
                    post: ['$stateParams', 'posts', '$location', '$state', '$timeout', 
                        function($stateParams, posts, $locaton, $state, $timeout) {
                        if($stateParams.id) {
                            return posts.get($stateParams.id);
                        } else {
                            return $timeout(function() {
                                $state.go('home'); 
                            }, 0);
                        }
                    }]
                }
            });

        $urlRouterProvider.otherwise('/home');
    }])
    .factory('posts', ['$http', '$state' , function($http, $state) {

        var obj = {
            posts: []
        };

        obj.getAll = function() { 
            return $http.get('/posts').success(function(data) {
                console.log(data);
                angular.copy(data, obj.posts);
            });
        };

        obj.create = function(post) { 
            return $http.post('/posts', post).success(function(data) {
                obj.posts.push(data);
            });
        };

       obj.upvote = function(post) { 
           return $http.put('/posts/' + post._id + '/upvote')
            .success(function(data) { 
                post.upvotes += 1; 
            }).error(function(err) {
                console.log(err) 
            });
       };

       obj.get = function(id) {
           return $http.get('/posts/' + id).then(function(data) {
               console.log(data);
               return data.data;
           }, function(errStat) {
                console.log(errStat); 
                var t =4;
                $state.go('home');
                var t3 = 4; 
           });
       };

       obj.addComment = function(id, comment) { 
           return $http.post('/posts/' + id + '/comments', comment);
       };

       obj.upvoteComment = function(post, comment) { 
           return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvotes')
            .success(function(data) {
                comment.upvotes += 1;
            });
       };

        return obj;
    }])
    .controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
        $scope.posts = posts.posts; 

        $scope.addPost = function() {
            if(!$scope.title || $scope.title === '') return;
            posts.create({
                title: $scope.title, 
                link: $scope.link,
            });
            $scope.title = '';
            $scope.link = '';
        };
        $scope.incrementUpvotes = function(post) {
           posts.upvote(post); 
        };
    }])
    .controller('PostCtrl', ['$scope', 'post', 'posts', '$state', '$q', 
                function($scope, post, posts, $state, $q) {
            //redirect if user ever tries to get acces to undefined / comment
            //$state.go('home');
            $scope.post = post;       
            $scope.incrementUpvotes = function(comment) {
                posts.upvoteComment(post, comment);
            };
            $scope.addComment = function() {
                if($scope.author === '' || $scope.body === '') return;
                posts.addComment(post._id, {
                    author: $scope.author,
                    body: $scope.body,
                })
                .success(function(comment) {
                    $scope.post.comments.push(comment);     
                });
                $scope.author = '';
                $scope.body = '';
            };
        }]);
