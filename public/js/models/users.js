angular
	.module("selflessApp")
	.factory("User", User);

User.$inject = ['$resource', 'API_URL']
function User($resource, API_URL){
  return $resource(
    API_URL + '/users/:id', 
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      "update":    { method: "PATCH" },
      'register': {
        url: API_URL +'/register',
        method: "POST"
      },
      'login':      {
        url: API_URL + '/login',
        method: "POST"
      }
    }
  );
}