
angular.module('windupgui').controller('NewTechnologyGroupController', function ($scope, $location, locationParser, TechnologyGroupResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.technologyGroup = $scope.technologyGroup || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/TechnologyGroups/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        TechnologyGroupResource.save($scope.technologyGroup, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/TechnologyGroups");
    };
});