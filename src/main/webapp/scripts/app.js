'use strict';

angular.module('windupgui',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Applications',{templateUrl:'views/Application/search.html',controller:'SearchApplicationController'})
      .when('/Applications/new',{templateUrl:'views/Application/detail.html',controller:'NewApplicationController'})
      .when('/Applications/edit/:ApplicationId',{templateUrl:'views/Application/detail.html',controller:'EditApplicationController'})
      .when('/Categories',{templateUrl:'views/Category/search.html',controller:'SearchCategoryController'})
      .when('/Categories/new',{templateUrl:'views/Category/detail.html',controller:'NewCategoryController'})
      .when('/Categories/edit/:CategoryId',{templateUrl:'views/Category/detail.html',controller:'EditCategoryController'})
      .when('/Countries',{templateUrl:'views/Country/search.html',controller:'SearchCountryController'})
      .when('/Countries/new',{templateUrl:'views/Country/detail.html',controller:'NewCountryController'})
      .when('/Countries/edit/:CountryId',{templateUrl:'views/Country/detail.html',controller:'EditCountryController'})
      .when('/Customers',{templateUrl:'views/Customer/search.html',controller:'SearchCustomerController'})
      .when('/Customers/new',{templateUrl:'views/Customer/detail.html',controller:'NewCustomerController'})
      .when('/Customers/edit/:CustomerId',{templateUrl:'views/Customer/detail.html',controller:'EditCustomerController'})
      .when('/Platforms',{templateUrl:'views/Platform/search.html',controller:'SearchPlatformController'})
      .when('/Platforms/new',{templateUrl:'views/Platform/detail.html',controller:'NewPlatformController'})
      .when('/Platforms/edit/:PlatformId',{templateUrl:'views/Platform/detail.html',controller:'EditPlatformController'})
      .when('/PlatformVersions',{templateUrl:'views/PlatformVersion/search.html',controller:'SearchPlatformVersionController'})
      .when('/PlatformVersions/new',{templateUrl:'views/PlatformVersion/detail.html',controller:'NewPlatformVersionController'})
      .when('/PlatformVersions/edit/:PlatformVersionId',{templateUrl:'views/PlatformVersion/detail.html',controller:'EditPlatformVersionController'})
      .when('/Projects',{templateUrl:'views/Project/search.html',controller:'SearchProjectController'})
      .when('/Projects/new',{templateUrl:'views/Project/detail.html',controller:'NewProjectController'})
      .when('/Projects/edit/:ProjectId',{templateUrl:'views/Project/detail.html',controller:'EditProjectController'})
      .when('/Technologies',{templateUrl:'views/Technology/search.html',controller:'SearchTechnologyController'})
      .when('/Technologies/new',{templateUrl:'views/Technology/detail.html',controller:'NewTechnologyController'})
      .when('/Technologies/edit/:TechnologyId',{templateUrl:'views/Technology/detail.html',controller:'EditTechnologyController'})
      .when('/TechnologyGroups',{templateUrl:'views/TechnologyGroup/search.html',controller:'SearchTechnologyGroupController'})
      .when('/TechnologyGroups/new',{templateUrl:'views/TechnologyGroup/detail.html',controller:'NewTechnologyGroupController'})
      .when('/TechnologyGroups/edit/:TechnologyGroupId',{templateUrl:'views/TechnologyGroup/detail.html',controller:'EditTechnologyGroupController'})
      .when('/Vendors',{templateUrl:'views/Vendor/search.html',controller:'SearchVendorController'})
      .when('/Vendors/new',{templateUrl:'views/Vendor/detail.html',controller:'NewVendorController'})
      .when('/Vendors/edit/:VendorId',{templateUrl:'views/Vendor/detail.html',controller:'EditVendorController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
