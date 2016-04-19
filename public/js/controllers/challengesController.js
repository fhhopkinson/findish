angular
.module("selflessApp")
.controller("ChallengesController", ChallengesController);

ChallengesController.$inject = ['$resource', 'Challenge', '$window', '$scope']
function ChallengesController($resource, Challenge, $window, $scope) {
	var self = this;	

	self.started = false;
	self.gotoChallenge = false; 
	this.mapCenter = { lat: 51.5002, lng: -0.12 };
	self.imageUpload = false;
	self.challengesMet = 0;
	self.onchallenge = false;
	self.challenge;

	$window.meetChallenge = function(lat, lng, markerIdx) {

		$window.navigator.geolocation.getCurrentPosition(function(position) {
			var currentPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var challengePos = new google.maps.LatLng(lat, lng);

			var distanceFromGoal = google.maps.geometry.spherical.computeDistanceBetween(challengePos, currentPos);

		  // if(distanceFromGoal <= 20) {
		  	$scope.$applyAsync(function() {
		  		self.mapMarkers[markerIdx].challengeMet = true;
		  		self.challengesMet += 1;

		  		if(self.challengesMet === self.mapMarkers.length) {
		  			self.goBack();
		  			self.endChallenge();
		  			self.challengesMet = 0;
		  		}
		  	});
		  });
	}

self.goBack = function(){
self.gotoChallenge = true;
}

	self.challenges = Challenge.query();
	self.currentChallenge = self.challenges.pop();

	self.startChallenge = function(challenge) {
		self.started     = true;
		self.imageUpload = true;
		self.challenge   = challenge;
		self.mapMarkers  = challenge.position;
	}

	self.endChallenge = function(){
		self.started     = false;
	}

	self.getChallenges = function() {
		self.challenges = Challenge.query();
	}

	self.showChallenge = function() {
		self.gotoChallenge = true;
	}

	self.deleteChallenge = function(challenge) {
		Challenge.delete({id: challenge._id});
		var index = self.challenges.indexOf(challenge);
		self.challenges.splice(index, 1);
	}

	self.updateChallenge = function(challenge) {
		console.log(challenge);
		Challenge.update(challenge, function() {
			console.log("finished updating");
			self.getChallenges();
		});
	}	
}


