'use strict';

// angular.module('nowApp', ['ui.bootstrap']);

angular.module('nowApp').controller('HomeCtrl', function ($scope, $location, $window, $http) {

  $scope.go = function (path) {
    $location.path(path);
  };

  // TODO: Move to a service
  $http.get('data/leads.json').success(function (data) {
    // process data here
    $scope.leads = data;
  });

  /*
  $scope.open = function (lead) {

    var modalInstance = $modal.open ({
      templateUrl: 'leadDetailsModal.html',
      resolve: {
        lead: function () {
          return $scope.lead;
        }
      }
    });

  };
  */

});

angular.module('nowApp').controller('SettingsCtrl', function ($scope, $location) {


});