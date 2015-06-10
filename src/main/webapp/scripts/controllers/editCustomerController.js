

angular.module('windupgui').controller('EditCustomerController', function($scope, $routeParams, $location, CustomerResource , CountryResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.customer = new CustomerResource(self.original);
            CountryResource.queryAll(function(items) {
                $scope.countrySelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.customer.country && item.id == $scope.customer.country.id) {
                        $scope.countrySelection = labelObject;
                        $scope.customer.country = wrappedObject;
                        self.original.country = $scope.customer.country;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Customers");
        };
        CustomerResource.get({CustomerId:$routeParams.CustomerId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.customer);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.customer.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Customers");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Customers");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.customer.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("countrySelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.customer.country = {};
            $scope.customer.country.id = selection.value;
        }
    });
    
    $scope.get();
});