(function() {

  angular
    .module('educatinforall-angular-app')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData'];
  function profileCtrl($location, meanData) {
    var vm = this;

    vm.user = {};
    vm.jme = [];
    vm.others = [];

    meanData.getProfile()
      .then(function(data) {
        // console.log(data);
        vm.user = data.data;
        meanData.getSubmissions(vm.user.email)
        .then(function(data){
          // deal with the returned array and display them to the profile page accordingly
          angular.forEach(data.data, function(val, key){
            if (val.submissionCategory == 'Journal of Mathematics Education') {
              vm.jme.push(val);
            } else {
              vm.others.push(val);
            }
          });

          vm.jme = _.uniqBy(vm.jme, 'submissionFor');
          vm.others = _.uniqBy(vm.others, 'submissionFor');

          vm.onClick = function(){
            meanData.signUpAsReviewer(vm.user.email)
              .then(function(data){
                vm.reviewer = true;
              })
              .catch(function(err){
                console.log(err);
              });
          }
        })
        .catch(function(e){
          console.log("Oops, getSubmissions error");
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  }

})();
