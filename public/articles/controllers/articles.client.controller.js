angular.module('articles').controller('ArticlesController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'Articles',
    function($scope, $routeParams, $location, Authentication, Articles) {
        $scope.authentication = Authentication;

        $scope.create = function() {
            // Use the form fields to create a new article $resource object
            var article = new Articles({
                title: this.title,
                content: this.content
            });

            // Use the article '$save' method to send an appropriate POST request
            article.$save(function(response) {
                // If an article was created successfully, redirect the user to the article's page
                $location.path('articles/' + response._id);
            }, function(errorResponse) {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function(){
            $scope.articles = Articles.query();
            $scope.itemsPerPage = 1;
            $scope.currentPage = 1;
            $scope.pageCount = function () {
                return Math.ceil($scope.articles.length / $scope.itemsPerPage);
            };

            $scope.articles.$promise.then(function () {
                $scope.totalItems = $scope.articles.length;
                $scope.$watch('currentPage + itemsPerPage', function() {
                    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;

                    $scope.filteredArticles = $scope.articles.slice(begin, end);
                });
            });
        };

        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.findOne = function(){
            $scope.article = Articles.get({
                articleId: $routeParams.articleId
            });
        };

        $scope.update = function() {
            $scope.article.$update(function(){
                $location.path('articles/' + $scope.article._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(article) {
            if (article) {
                article.$remove(function() {
                    for (var i in $scope.articles) {
                        if ($scope.articles[i] === article) {
                            $scope.articles.splice(i,1);
                        }
                    }
                });
            } else {
                $scope.article.$remove(function() {
                    $location.path('articles');
                })
            }
        }
    }
]);