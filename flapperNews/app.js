angular.module('flapperNews', [])
    .factory('posts', [function() {
        var obj = {
            posts: [{title: "hello title", link:"some/link/path"}]
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
                link: $scope.link
            });
            $scope.title = '';
            $scope.link = '';
        };
        $scope.incrementUpvotes = function(post) {
            post.upvotes += 1; 
        };
    }]);
