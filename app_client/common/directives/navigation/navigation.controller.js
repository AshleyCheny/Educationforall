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
      var logout = authentication.logout();
      if (logout) {
        if ($location.$$path == "/") {
          vm.isLoggedIn = false;
        } else {
          $location.path('/');
        }
      }
    };

    vm.hasEnterUserIcon = false;
    vm.hasEnterJME = false;
    vm.hasEnterRSS = false;
  }

})();
