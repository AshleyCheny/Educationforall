(function() {

  angular
    .module('educatinforall-angular-app')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData'];
  function profileCtrl($location, meanData) {
    var vm = this;

    vm.user = {};

    meanData.getProfile()
      .then(function(data) {
        vm.user = data;
      })
      .catch(function (e) {
        console.log(e);
      });
  }

})();
