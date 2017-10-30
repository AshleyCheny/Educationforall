
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
      console.log(formData);
      console.log(files);

      angular.forEach(files,function(file){
      fd.append('file',file);
      });
      // fd.append('file', files);
      fd.append('data', formData);

      return $http.post('/api/profile/submission', fd, {
        transformRequest: angular.identity,
        headers: {
              'Content-Type': undefined
        }
      });
    }

    return {
      getProfile : getProfile,
      submitManuscript: submitManuscript
    };
  }

})();
