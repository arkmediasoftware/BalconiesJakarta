angular.module('starter.service',[])

.service('authService',function($cookies,$http,$rootScope,$q){
	var LOCAL_TOKEN_KEY = 'yourTokenKey';
	var username = '';
	var isAuthenticated = false;
	var role = '';
	var authToken;

	var login = function(name){
		console.log(name);
		return $q(function(resolve,reject){
			if(name == 'admin') {
				storeUserCredentials(name);
				console.log('success');
				resolve('Login success.');
			} else {
				console.log('failed');
				reject('Login Failed.');
			}
		})
	}

	return {
		login:login
	}

	function storeUserCredentials(token) {
		window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
		useCredentials(token);
	}
	function useCredentials(token) {
		username = token.split('.')[0];
		isAuthenticated = true;
		authToken = token;

		// Set the token as header for your requests!
		//$http.defaults.headers.common['X-Auth-Token'] = token;
	}
	function destroyUserCredentials() {
		authToken = undefined;
		username = '';
		isAuthenticated = false;
		//$http.defaults.headers.common['X-Auth-Token'] = undefined;
		window.localStorage.removeItem(LOCAL_TOKEN_KEY);
	}
})

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
