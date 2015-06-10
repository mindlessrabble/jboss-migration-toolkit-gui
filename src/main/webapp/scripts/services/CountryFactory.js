angular.module('windupgui').factory('CountryResource', function($resource){
    var resource = $resource('rest/countries/:CountryId',{CountryId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});