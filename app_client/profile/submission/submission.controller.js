(function() {

  angular
    .module('educatinforall-angular-app')
    .controller('submissionCtrl', submissionCtrl);

    submissionCtrl.$inject = ['$location', 'meanData'];
    function submissionCtrl ($location, meanData) {
      var vm = this;
      var yearCount = 10;
      var currentYear = (new Date()).getFullYear();
      vm.submission = {};
      vm.files = [];

      // set the data for the view

      vm.submissionTypes = ["Proposal", "Full Paper", "Revision 1", "Revision 2", "Revision 3", "Revision 4", "Review 1", "Review 2", "Review 3"];

      vm.submissionFor = [];

      for (var i = 0; i < yearCount; i++) {
        vm.submissionFor.push(currentYear + i + '07');
        vm.submissionFor.push(currentYear + i + '11');
        vm.submissionFor.push((currentYear + 1) + i + '03');
      }

      vm.submissionCategory = ["Journal of Mathematics Education", "Others"];

      // submit the form data
      vm.onSubmit = function(){
        console.log("submit");
        console.log(vm.submission);
        meanData.submitManuscript(vm.submission, vm.files)
        .then(function(data) {
          console.log(data);

        })
        .catch(function (e) {
          console.log(e);
        });
      };

      console.log('Submission controller is running');
    }

})();
