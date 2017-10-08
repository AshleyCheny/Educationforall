(function () {

  angular
    .module('educatinforall-angular-app')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication'];
  function navigationCtrl($location, authentication) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.onClick = function () {
      console.log('Logout');
      authentication.logout();
    };

  }

})();
