angular.module('windupgui').factory('CustomerResource', function($resource){
    var resource = $resource('rest/customers/:CustomerId',{CustomerId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});