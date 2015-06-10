

angular.module('windupgui').controller('EditPlatformVersionController', function($scope, $routeParams, $location, PlatformVersionResource , PlatformResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.platformVersion = new PlatformVersionResource(self.original);
            PlatformResource.queryAll(function(items) {
                $scope.platformSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.platformVersion.platform && item.id == $scope.platformVersion.platform.id) {
                        $scope.platformSelection = labelObject;
                        $scope.platformVersion.platform = wrappedObject;
                        self.original.platform = $scope.platformVersion.platform;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/PlatformVersions");
        };
        PlatformVersionResource.get({PlatformVersionId:$routeParams.PlatformVersionId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.platformVersion);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.platformVersion.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/PlatformVersions");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/PlatformVersions");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.platformVersion.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("platformSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.platformVersion.platform = {};
            $scope.platformVersion.platform.id = selection.value;
        }
    });
    
    $scope.get();
});