angular.module('windupgui').factory('PlatformResource', function($resource){
    var resource = $resource('rest/platforms/:PlatformId',{PlatformId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});