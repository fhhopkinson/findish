angular
.module('selflessApp')
.factory('Challenge', Challenge);

Challenge.$inject = ['$resource'];
function Challenge($resource) {
  var challenge = $resource('/challenges/:id', { id: '@_id' }, {
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