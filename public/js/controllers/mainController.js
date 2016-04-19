angular.module('selflessApp')
.controller('MainController', MainController);

MainController.$inject = [ '$auth', 'tokenService'];
function MainController($auth, tokenService) {
  
  var self = this;
  this.user = {};
  this.currentUser = tokenService.getUser();

  this.hoverClass = false;
  this.flashClass = false;

  this.isLoggedIn = function() {
    return !!tokenService.getToken();
    this.loggedIn = true; 
  }

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function() {
      self.currentUser = tokenService.getUser();
    });
  }

  this.logout = function() {
    tokenService.removeToken();
    this.currentUser = null;
  }

  // image uploader functions
  
  self.file  = null;
  self.upload = false;
  self.image = false;

  this.uploadSingle = function() {
   Upload.upload({
     url: API_URL + '/upload/single',
     data: { file: self.file }
   })
   .then(function(res) {
    console.log("Success!" + res);

    self.file.filestore = "https://s3-eu-west-1.amazonaws.com/frederick-hops/" + res.data.filename;

    self.processImage()
  })
   .catch(function(err) {
     console.error(err);
   });
 }

 this.processImage = function(){
   $http({
     method: 'PUT',
     url: 'http://localhost:8000/',
     data: {image: self.file.filestore}
   }).then(function successCallback(response) {
     self.file.processed = response.data[0];
     responseFromServer = response.data[0]
   }, function errorCallback(response) {
     console.log(response);
   });
 }
 showUpload = function() {
  self.upload = true;
  console.log("showUpload is firing")
 }

 hideUpload = function() {
  self.upload = false;
 }

 showImage = function() {
  self.image = true;
 }

 hideImage = function() {
  self.image = false;
 }

}