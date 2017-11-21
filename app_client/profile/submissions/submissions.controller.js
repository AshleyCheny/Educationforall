(function(){
  angular
    .module('educatinforall-angular-app')
    .controller('submissionDetailsCtrl', submissionDetailsCtrl);

    submissionDetailsCtrl.$inject = ['$location', 'meanData', '$routeParams'];
    function submissionDetailsCtrl ($location, meanData, $routeParams) {
      // declare controller vm
      var vm = this;

      // declare vm's object routeParams
      vm.routeParams = $routeParams;

      
    }

})();
