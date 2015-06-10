
angular.module('windupgui').controller('NewPlatformController', function ($scope, $location, locationParser, PlatformResource , VendorResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.platform = $scope.platform || {};
    
    $scope.vendorList = VendorResource.queryAll(function(items){
        $scope.vendorSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("vendorSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.platform.vendor = {};
            $scope.platform.vendor.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Platforms/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        PlatformResource.save($scope.platform, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Platforms");
    };
});