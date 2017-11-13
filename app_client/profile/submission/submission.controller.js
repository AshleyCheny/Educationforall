(function() {

  angular
    .module('educatinforall-angular-app')
    .controller('submissionCtrl', submissionCtrl);

    submissionCtrl.$inject = ['$location', 'meanData'];
    function submissionCtrl ($location, meanData) {
      var vm = this;
      var yearCount = 10;
      var currentYear = (new Date()).getFullYear();

      vm.files = [];

      vm.submission = {
        userId: '',
        userEmail: '',
        submissionType: '',
        submissionCategory: '',
        submissionFor: '',
        title: '',
        abstract: '',
        keywords: '',
        authors: ''
      };

      // set the data for the view dropdowns

      // submission type dropdown
      vm.submissionTypes = ["Proposal", "Full Paper", "Revision 1", "Revision 2", "Revision 3", "Revision 4", "Review 1", "Review 2", "Review 3"];

      // submission for dropdown
      vm.submissionFor = [];

      for (var i = 0; i < yearCount; i++) {
        vm.submissionFor.push(currentYear + i + '07');
        vm.submissionFor.push(currentYear + i + '11');
        vm.submissionFor.push((currentYear + 1) + i + '03');
      }

      // submission category dropdown
      vm.submissionCategory = ["Journal of Mathematics Education", "Others"];

      // get the userEmail
      meanData.getProfile()
        .then(function(data){
          console.log("data", data);
          vm.submission.userEmail = data.data.email;
        })
        .catch(function (e) {
          console.log(e);
        });

      // submit the form data
      vm.onSubmit = function(){
        console.log("submit");
        console.log(vm.submission);
        console.log(vm.files);

        meanData.submitManuscript(vm.submission, vm.files)
        .then(function(data) {
          console.log("Thank you for submitting the ", data);

        })
        .catch(function (e) {
          console.log("Oops, there was an error submitting the data ", e);
        });
      };

      console.log('Submission controller is running');
    }

})();
