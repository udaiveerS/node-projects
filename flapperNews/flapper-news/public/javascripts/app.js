angular.module('flapperNews', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
       
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '../partials/home.html',
                controller: 'MainCtrl'
            });

        $stateProvider
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '../partials/comments.html',
                controller: 'PostCtrl'
            });

        $urlRouterProvider.otherwise('home');
    }])
    .factory('posts', [function() {
        var obj = {
            posts: [{
                title: "hello title", 
                link:"google.com", 
                upvotes: 0,
                comments: [
                {author: 'JoeShmo', body: 'Cool post!', upvotes: 0},
                {author: 'Bobi Gindal', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            }]
        };
        return obj;
    }])
    .controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
        $scope.test = 'Hello world!';
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
    .controller('PostCtrl', ['$scope', '$stateParams', 'posts',
                function($scope, $stateParams, posts) {
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
