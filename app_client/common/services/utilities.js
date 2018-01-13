
(function() {

  angular
    .module('educatinforall-angular-app')
    .service('utilities', utilities);

  utilities.$inject = ['$http', 'authentication'];
  function utilities ($http, authentication) {

    // new submission: 0
    // new submission, but for existing target issue: 1
    // update a submission: 2
    var checkFormType = function(routeParams){
      var formType;
      if (routeParams.type == 'new') {
        if (_.has(routeParams, "param1")) {
          formType = 1;
        } else {
          formType = 0;
        }
      } else {
        formType = 2;
      }

      return formType;
    }

    return {
      checkFormType
    };
  }

})();
