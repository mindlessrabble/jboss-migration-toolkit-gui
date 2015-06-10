

angular.module('windupgui').controller('EditApplicationController', function($scope, $routeParams, $location, ApplicationResource , CustomerResource, ProjectResource, PlatformResource, PlatformResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.application = new ApplicationResource(self.original);
            CustomerResource.queryAll(function(items) {
                $scope.customerSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.application.customer && item.id == $scope.application.customer.id) {
                        $scope.customerSelection = labelObject;
                        $scope.application.customer = wrappedObject;
                        self.original.customer = $scope.application.customer;
                    }
                    return labelObject;
                });
            });
            ProjectResource.queryAll(function(items) {
                $scope.projectSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.application.project && item.id == $scope.application.project.id) {
                        $scope.projectSelection = labelObject;
                        $scope.application.project = wrappedObject;
                        self.original.project = $scope.application.project;
                    }
                    return labelObject;
                });
            });
            PlatformResource.queryAll(function(items) {
                $scope.currentPlatformSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.application.currentPlatform && item.id == $scope.application.currentPlatform.id) {
                        $scope.currentPlatformSelection = labelObject;
                        $scope.application.currentPlatform = wrappedObject;
                        self.original.currentPlatform = $scope.application.currentPlatform;
                    }
                    return labelObject;
                });
            });
            PlatformResource.queryAll(function(items) {
                $scope.targetPlatformSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.application.targetPlatform && item.id == $scope.application.targetPlatform.id) {
                        $scope.targetPlatformSelection = labelObject;
                        $scope.application.targetPlatform = wrappedObject;
                        self.original.targetPlatform = $scope.application.targetPlatform;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Applications");
        };
        ApplicationResource.get({ApplicationId:$routeParams.ApplicationId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.application);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.application.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Applications");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Applications");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.application.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("customerSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.application.customer = {};
            $scope.application.customer.id = selection.value;
        }
    });
    $scope.$watch("projectSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.application.project = {};
            $scope.application.project.id = selection.value;
        }
    });
    $scope.$watch("currentPlatformSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.application.currentPlatform = {};
            $scope.application.currentPlatform.id = selection.value;
        }
    });
    $scope.$watch("targetPlatformSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.application.targetPlatform = {};
            $scope.application.targetPlatform.id = selection.value;
        }
    });
    
    $scope.get();
});