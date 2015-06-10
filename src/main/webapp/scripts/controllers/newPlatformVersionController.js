
angular.module('windupgui').controller('NewPlatformVersionController', function ($scope, $location, locationParser, PlatformVersionResource , PlatformResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.platformVersion = $scope.platformVersion || {};
    
    $scope.platformList = PlatformResource.queryAll(function(items){
        $scope.platformSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("platformSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.platformVersion.platform = {};
            $scope.platformVersion.platform.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/PlatformVersions/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        PlatformVersionResource.save($scope.platformVersion, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/PlatformVersions");
    };
});