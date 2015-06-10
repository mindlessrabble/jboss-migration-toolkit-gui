

angular.module('windupgui').controller('EditCountryController', function($scope, $routeParams, $location, CountryResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.country = new CountryResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Countries");
        };
        CountryResource.get({CountryId:$routeParams.CountryId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.country);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.country.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Countries");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Countries");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.country.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});