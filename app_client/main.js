(function () {

  // create the angular app
  angular.module('educatinforall-angular-app', ['ngRoute']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: '/profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .when('/profile/submission/:type/:param1?/:param2?', {
        templateUrl: '/profile/submission/submission.view.html',
        controller: 'submissionCtrl',
        controllerAs: 'vm'
      })
      .when('/profile/submissions/:submissionCategory/:submissionFor', {
        templateUrl: '/profile/submissions/submissions.view.html',
        controller: 'submissionDetailsCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
      if ($location.path() === '/profile/submission' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
  }

  angular
    .module('educatinforall-angular-app')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();
