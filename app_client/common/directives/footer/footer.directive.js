(function () {

  angular
    .module('educatinforall-angular-app')
    .directive('footer', footer);

  function footer () {
    return {
      restrict: 'EA',
      templateUrl: 'common/directives/footer/footer.template.html',
    };
  }

})();
