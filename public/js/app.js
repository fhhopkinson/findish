angular.module('selflessApp', ['satellizer', 'angular-jwt', 'ui.router', 'ngResource', 'ngAnimate'])
	.config(OauthConfig)
	.config(MainRouter);

OauthConfig.$inject = ['$authProvider', 'FACEBOOK_API_KEY', 'GITHUB_API_KEY'];
function OauthConfig($authProvider, FACEBOOK_API_KEY, GITHUB_API_KEY) {

	$authProvider.facebook({
		url: '/auth/facebook',
		clientId: FACEBOOK_API_KEY
	});

	$authProvider.github({
		url: '/auth/github',
		clientId: GITHUB_API_KEY
	});

	$authProvider.tokenPrefix = null;
}

function MainRouter($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: "views/home.html"
		})
		.state('challengeIndex', {
			url: '/challenge/index',
			templateUrl: "views/challengeIndex.html"
		})
		.state('imageShow', {
			url: '/image',
			templateUrl: "views/imageShow.html"
		})
		.state('challengeNew', {
			url: '/challenge/new',
			templateUrl: "views/challengeNew.html"
		});

		$urlRouterProvider.otherwise('/');
}


