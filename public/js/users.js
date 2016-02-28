var todo = angular.module("todo", []);

todo.controller("UsersController", ["$scope", "$http", function($scope, $http) {
    $scope.users = [];
    /**
     * get all users
     * @return {[type]} [description]
     */
    $scope.init = function() {
        $http.get("/users").then(function(response) {
            $scope.users = response.data.users;
            //console.log(response.data);
            console.log($scope.users);
        });
    }
}]);
