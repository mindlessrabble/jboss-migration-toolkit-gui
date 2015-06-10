angular.module('windupgui').factory('TechnologyResource', function($resource){
    var resource = $resource('rest/technologies/:TechnologyId',{TechnologyId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});