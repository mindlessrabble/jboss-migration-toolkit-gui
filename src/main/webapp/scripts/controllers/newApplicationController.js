
angular.module('windupgui').controller('NewApplicationController', function ($scope, $location, locationParser, ApplicationResource , CustomerResource, ProjectResource, PlatformResource, PlatformResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.application = $scope.application || {};
    
    $scope.customerList = CustomerResource.queryAll(function(items){
        $scope.customerSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("customerSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.application.customer = {};
            $scope.application.customer.id = selection.value;
        }
    });
    
    $scope.projectList = ProjectResource.queryAll(function(items){
        $scope.projectSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("projectSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.application.project = {};
            $scope.application.project.id = selection.value;
        }
    });
    
    $scope.currentPlatformList = PlatformResource.queryAll(function(items){
        $scope.currentPlatformSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("currentPlatformSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.application.currentPlatform = {};
            $scope.application.currentPlatform.id = selection.value;
        }
    });
    
    $scope.targetPlatformList = PlatformResource.queryAll(function(items){
        $scope.targetPlatformSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("targetPlatformSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.application.targetPlatform = {};
            $scope.application.targetPlatform.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Applications/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        ApplicationResource.save($scope.application, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Applications");
    };
});