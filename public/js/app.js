angular.module('selflessApp', ['satellizer', 'angular-jwt', 'ui.router', 'ngResource', 'ngAnimate'])
	.constant('API_URL', 'http://localhost:8000')
	.config(OauthConfig)
	.config(MainRouter);

OauthConfig.$inject = ['API_URL', '$authProvider', 'FACEBOOK_API_KEY', 'GITHUB_API_KEY'];
function OauthConfig(API_URL, $authProvider, FACEBOOK_API_KEY, GITHUB_API_KEY) {

	$authProvider.facebook({
		url: API_URL + '/auth/facebook',
		clientId: FACEBOOK_API_KEY
	});

	$authProvider.github({
		url: API_URL + '/auth/github',
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


