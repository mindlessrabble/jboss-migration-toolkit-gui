angular.module('windupgui').factory('PlatformVersionResource', function($resource){
    var resource = $resource('rest/platformversions/:PlatformVersionId',{PlatformVersionId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});