
(function() {

  angular
    .module('educatinforall-angular-app')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var submitManuscript = function(formData, files){
      var fd = new FormData();
      console.log("submitManuscript function: ", formData);
      console.log("submitManuscript function: ", files);

      angular.forEach(files,function(file){
        fd.append('file', file);
      });
      // fd.append('file', files);
      fd.append('userId', formData.userId);
      fd.append('userEmail', formData.userEmail);
      fd.append('submissionType', formData.submissionType);
      fd.append('submissionCategory', formData.submissionCategory);
      fd.append('submissionFor', formData.submissionFor);
      fd.append('title', formData.title);
      fd.append('abstract', formData.abstract);
      fd.append('keywords', formData.keywords.split(','));
      fd.append('authors', formData.authors.split(','));

      return $http.post('/api/create', fd, {
        transformRequest: angular.identity,
        headers: {
              'Content-Type': undefined
        }
      });
    }

    var getSubmissions = function(userEmail, routeParams){
      if (routeParams) {
        return $http.get('/api/submissions/' + userEmail + '/?category=' + routeParams.submissionCategory + '&target=' + routeParams.submissionFor);
      } else {
        return $http.get('/api/submissions/' + userEmail);
      }
    }

    var getSubmissionById = function(submissionId){
      return $http.get('/api/submission/' + submissionId);
    }

    var getSumissionFile = function(fileName){
      return $http.get('/api/files/'+ fileName);
    }

    var deleteSubmission = function(submissionId){
      return $http.delete('/api/delete/submissions/' + submissionId);
    }

    var updateSubmission = function(submissionId, formDate, files){

    }

    var signUpAsReviewer = function(userEmail){
      return $http.put('/api/reviewer_sign_up/' + userEmail);
    }

    return {
      getProfile : getProfile,
      submitManuscript: submitManuscript,
      getSubmissions: getSubmissions,
      getSumissionFile: getSumissionFile,
      deleteSubmission: deleteSubmission,
      signUpAsReviewer: signUpAsReviewer,
      getSubmissionById: getSubmissionById,
      updateSubmission: updateSubmission
    };
  }

})();
