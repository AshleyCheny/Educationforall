(function() {

  angular
    .module('educatinforall-angular-app')
    .controller('submissionCtrl', submissionCtrl);

    submissionCtrl.$inject = ['$location', 'meanData', 'utilities', '$routeParams', '$anchorScroll'];
    function submissionCtrl ($location, meanData, utilities, $routeParams, $anchorScroll) {
      var vm = this;
      var yearCount = 5;
      var currentYear = (new Date()).getFullYear();

      console.log($routeParams);
      vm.formType = utilities.checkFormType($routeParams);

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

      vm.submissionFor = [];
      console.log(currentYear);
      for (var i = 0; i < yearCount; i++) {
        vm.submissionFor.push(currentYear + i + '03');
        vm.submissionFor.push(currentYear + i + '07');
        vm.submissionFor.push(currentYear + i + '11');
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

      // actions based on the type of the form
      if (vm.formType == 1) {
        vm.submission.submissionFor = $routeParams.param2;
        if ($routeParams.param1 == 'jme') {
          vm.submission.submissionCategory = "Journal of Mathematics Education";
        } else {
          vm.submission.submissionCategory = "Others";
        }
      }
      if (vm.formType == 2) {
        // prefill the form
        vm.submission._id = $routeParams.param1;
        meanData.getSubmissionById($routeParams.param1)
          .then(function(data){
            var doc = data.data;
            vm.submission.title = doc.title;
            vm.submission.submissionType = doc.submissionType;
            vm.submission.submissionFor = doc.submissionFor;
            vm.submission.submissionCategory = doc.submissionCategory;
            vm.submission.abstract = doc.abstract;
            vm.submission.keywords = doc.keywords;
            vm.submission.author = doc.author;
            vm.existingFiles = doc.files;
            if (vm.existingFiles.length == 0) {
              vm.noFile = true;
            }
          })
          .catch(function(err){
            console.log(err);
          });
      }

      // submit the form data
      vm.onSubmit = function(){

        if (vm.formType == 2) {
          // update the existing submission
          // files is optional
          if (vm.noFile && vm.files.length == 0) {
            $($location.hash('resubmit-label'));
            $anchorScroll();
          }
          else {
            meanData.updateSubmission($routeParams.param1, vm.submission, vm.files)
            .then(function(data){
              console.log(data);
              vm.updateSuccess = true;
            })
            .catch(function(err){
              console.log(err);
            });
          }
        } else {
          // post the new submission
          meanData.submitManuscript(vm.submission, vm.files)
          .then(function(data) {
            console.log("Thank you for submitting the ", data);

          })
          .catch(function (e) {
            console.log("Oops, there was an error submitting the data ", e);
          });
        }
      };

      // click on the file link
      vm.onClick = meanData.openAndDownloadFile;

      // click a file by id
      vm.deleteFile = function(submissionId, fileId){
        deleteSubmission = window.confirm('Are you sure you want to delete this file?');
        if (deleteSubmission) {
          meanData.deleteFile(submissionId, fileId)
            .then(function(data){
              window.location.reload();
            })
            .catch(function(err){
              console.log(err);
            });
        }
      }

      console.log('Submission controller is running');
    }

})();
