
angular.module('windupgui').controller('NewCustomerController', function ($scope, $location, locationParser, CustomerResource , CountryResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.customer = $scope.customer || {};
    
    $scope.countryList = CountryResource.queryAll(function(items){
        $scope.countrySelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("countrySelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.customer.country = {};
            $scope.customer.country.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Customers/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        CustomerResource.save($scope.customer, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Customers");
    };
});