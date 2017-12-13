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

      console.log($routeParams);
      // get the userEmail
      meanData.getProfile()
        .then(function(data){
          vm.userEmail = data.data.email;

          // call the data service to pass the query to the api
          meanData.getSubmissions(vm.userEmail, vm.routeParams)
            .then(function(data){
              console.log('fired', data);
              // get the response data from the api and append it to the controller
              vm.data = data.data;

              // onclick event handler
              vm.onClick = function(fileName){
                window.open('/api/files/' + fileName);
              }
            })
            .catch(function(err){
              console.log(err);
            });
        })
        .catch(function (e) {
          console.log(e);
        });




    }

})();
