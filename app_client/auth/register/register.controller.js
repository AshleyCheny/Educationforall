(function () {

  angular
    .module('educatinforall-angular-app')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register(vm.credentials)
        .then(function(){
          $location.path('profile');
        })
        .catch(function(e){
          alert(e);
        });
    };

  }

})();
