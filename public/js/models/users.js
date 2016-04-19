angular
	.module("selflessApp")
	.factory("User", User);

User.$inject = ['$resource']
function User($resource){
  return $resource(
    '/users/:id', 
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