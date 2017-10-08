// save, read and delete a JWT using localStorage

(function () {

  angular
    .module('educatinforall-angular-app')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];

  // create the authentication function that returns functions
  function authentication ($http, $window) {

    // save the token sent by the server to the browser
    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
    };

    // get the token saved in the localStorage
    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    register = function(user) {
      return $http.post('/api/register', user).then(function(data){
        saveToken(data.data.token);
      });
    };

    login = function(user) {
      return $http.post('/api/login', user).then(function(data) {
        // console.log(data);
        // console.log(data.data);
        // console.log(data.data.token);
        // console.log(data.token);
        saveToken(data.data.token);
      });
    };

    // remove the token in browser localStorage when users logout
    logout = function() {
      $window.localStorage.removeItem('mean-token');
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    };
  }


})();
