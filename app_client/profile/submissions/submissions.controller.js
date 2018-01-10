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

              // check if there are no submissions
              vm.hasSubmission = true;

              if (vm.data.length <= 0) {
                vm.hasSubmission = false;
              }
              // angular.forEach(vm.data, function(doc, index){
              //   if (doc.files.length > 0) {
              //     vm.hasFile = true;
              //   }
              // });

              // onclick event handler
              vm.onClick = function(fileName){
                window.open('/api/files/' + fileName);
              }

              // delete event handler
              vm.deleteSubmission = function(submissionId){
                deleteSubmission = window.confirm('Are you sure you want to delete this submission?');
                if (deleteSubmission) {
                  meanData.deleteSubmission(submissionId)
                    .then(function(data){
                      window.location.reload();
                    })
                    .catch(function(err){
                      console.log(err);
                    });
                }
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
