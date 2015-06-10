

angular.module('windupgui').controller('EditPlatformController', function($scope, $routeParams, $location, PlatformResource , VendorResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.platform = new PlatformResource(self.original);
            VendorResource.queryAll(function(items) {
                $scope.vendorSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.platform.vendor && item.id == $scope.platform.vendor.id) {
                        $scope.vendorSelection = labelObject;
                        $scope.platform.vendor = wrappedObject;
                        self.original.vendor = $scope.platform.vendor;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Platforms");
        };
        PlatformResource.get({PlatformId:$routeParams.PlatformId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.platform);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.platform.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Platforms");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Platforms");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.platform.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("vendorSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.platform.vendor = {};
            $scope.platform.vendor.id = selection.value;
        }
    });
    
    $scope.get();
});