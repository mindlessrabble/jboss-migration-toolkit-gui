
angular.module('windupgui').controller('NewProjectController', function ($scope, $location, locationParser, ProjectResource , CategoryResource, CustomerResource, PlatformResource, PlatformResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.project = $scope.project || {};
    
    $scope.categoryList = CategoryResource.queryAll(function(items){
        $scope.categorySelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("categorySelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.project.category = {};
            $scope.project.category.id = selection.value;
        }
    });
    
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
            $scope.project.customer = {};
            $scope.project.customer.id = selection.value;
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
            $scope.project.currentPlatform = {};
            $scope.project.currentPlatform.id = selection.value;
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
            $scope.project.targetPlatform = {};
            $scope.project.targetPlatform.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Projects/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        ProjectResource.save($scope.project, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Projects");
    };
});