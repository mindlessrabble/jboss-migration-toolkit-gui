angular.module('windupgui').factory('TechnologyGroupResource', function($resource){
    var resource = $resource('rest/technologygroups/:TechnologyGroupId',{TechnologyGroupId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});