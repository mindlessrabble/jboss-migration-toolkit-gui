

angular.module('windupgui').controller('EditProjectController', function($scope, $routeParams, $location, ProjectResource , CategoryResource, CustomerResource, PlatformResource, PlatformResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.project = new ProjectResource(self.original);
            CategoryResource.queryAll(function(items) {
                $scope.categorySelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.project.category && item.id == $scope.project.category.id) {
                        $scope.categorySelection = labelObject;
                        $scope.project.category = wrappedObject;
                        self.original.category = $scope.project.category;
                    }
                    return labelObject;
                });
            });
            CustomerResource.queryAll(function(items) {
                $scope.customerSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.project.customer && item.id == $scope.project.customer.id) {
                        $scope.customerSelection = labelObject;
                        $scope.project.customer = wrappedObject;
                        self.original.customer = $scope.project.customer;
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
                    if($scope.project.currentPlatform && item.id == $scope.project.currentPlatform.id) {
                        $scope.currentPlatformSelection = labelObject;
                        $scope.project.currentPlatform = wrappedObject;
                        self.original.currentPlatform = $scope.project.currentPlatform;
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
                    if($scope.project.targetPlatform && item.id == $scope.project.targetPlatform.id) {
                        $scope.targetPlatformSelection = labelObject;
                        $scope.project.targetPlatform = wrappedObject;
                        self.original.targetPlatform = $scope.project.targetPlatform;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Projects");
        };
        ProjectResource.get({ProjectId:$routeParams.ProjectId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.project);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.project.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Projects");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Projects");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.project.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("categorySelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.project.category = {};
            $scope.project.category.id = selection.value;
        }
    });
    $scope.$watch("customerSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.project.customer = {};
            $scope.project.customer.id = selection.value;
        }
    });
    $scope.$watch("currentPlatformSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.project.currentPlatform = {};
            $scope.project.currentPlatform.id = selection.value;
        }
    });
    $scope.$watch("targetPlatformSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.project.targetPlatform = {};
            $scope.project.targetPlatform.id = selection.value;
        }
    });
    
    $scope.get();
});