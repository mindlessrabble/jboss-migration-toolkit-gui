

angular.module('windupgui').controller('EditTechnologyController', function($scope, $routeParams, $location, TechnologyResource , TechnologyGroupResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.technology = new TechnologyResource(self.original);
            TechnologyGroupResource.queryAll(function(items) {
                $scope.technologyGroupSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.technology.technologyGroup && item.id == $scope.technology.technologyGroup.id) {
                        $scope.technologyGroupSelection = labelObject;
                        $scope.technology.technologyGroup = wrappedObject;
                        self.original.technologyGroup = $scope.technology.technologyGroup;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Technologies");
        };
        TechnologyResource.get({TechnologyId:$routeParams.TechnologyId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.technology);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.technology.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Technologies");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Technologies");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.technology.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("technologyGroupSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.technology.technologyGroup = {};
            $scope.technology.technologyGroup.id = selection.value;
        }
    });
    
    $scope.get();
});