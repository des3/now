'use strict';

angular.module('nowApp').controller('HeaderCtrl', function ($scope, $location) {

  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };

  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.date = new Date();

});

angular.module('nowApp').controller('HomeCtrl', function ($scope, $location, $window, $http, $modal) {

  $scope.go = function (path) {
    $location.path(path);
  };

  // TODO: Move to a service
  $http.get('data/leads.json').success(function (data) {
    // process data here
    $scope.leads = data;
  });

  
  $scope.open = function (index) {

    var modalInstance = $modal.open ({
      templateUrl: 'leadDetailsModal.html',
      controller: ModalInstanceCtrl,
      size: 'lg',
      resolve: {
        lead: function () {
          return $scope.leads[index];
        }
      }
    });

  };
  

});

angular.module('nowApp').controller('SettingsCtrl', function () {


});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, lead) {

  $scope.lead = lead;

  $scope.ok = function () {
    $modalInstance.close('ok');
  };
};