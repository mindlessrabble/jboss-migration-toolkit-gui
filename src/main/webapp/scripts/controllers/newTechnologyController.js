
angular.module('windupgui').controller('NewTechnologyController', function ($scope, $location, locationParser, TechnologyResource , TechnologyGroupResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.technology = $scope.technology || {};
    
    $scope.technologyGroupList = TechnologyGroupResource.queryAll(function(items){
        $scope.technologyGroupSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("technologyGroupSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.technology.technologyGroup = {};
            $scope.technology.technologyGroup.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Technologies/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        TechnologyResource.save($scope.technology, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Technologies");
    };
});