

angular.module('windupgui').controller('EditTechnologyGroupController', function($scope, $routeParams, $location, TechnologyGroupResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.technologyGroup = new TechnologyGroupResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/TechnologyGroups");
        };
        TechnologyGroupResource.get({TechnologyGroupId:$routeParams.TechnologyGroupId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.technologyGroup);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.technologyGroup.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/TechnologyGroups");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/TechnologyGroups");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.technologyGroup.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});