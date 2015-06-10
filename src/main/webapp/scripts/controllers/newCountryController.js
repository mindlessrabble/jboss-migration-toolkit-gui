
angular.module('windupgui').controller('NewCountryController', function ($scope, $location, locationParser, CountryResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.country = $scope.country || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Countries/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        CountryResource.save($scope.country, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Countries");
    };
});