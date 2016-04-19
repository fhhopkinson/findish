angular
.module('selflessApp')
.factory('Challenge', Challenge);

Challenge.$inject = ['$resource', 'API_URL'];
function Challenge($resource, API_URL) {
  var challenge = $resource(API_URL + '/challenges/:id', { id: '@_id' }, {
    update: { method: "PUT" },
    remove: { method: 'DELETE' }
  });

  Object.defineProperty(challenge.prototype, 'imageSRC', {get: function(){
    if(this.image) {
      return S3 + this.image;
    }
  }})
  return challenge;
}