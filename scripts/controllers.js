'use strict';

  // Set up some globals and persist them
angular.module('nowApp').run(function($rootScope) {
  $rootScope.leads = [];
  $rootScope.predicate = "leadscore";
  $rootScope.reverse = true;
});

angular.module('nowApp').controller('HeaderCtrl', function ($scope, $rootScope, $location) {

  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };

  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.isCollapsed = true;

});

angular.module('nowApp').controller('HomeCtrl', function ($scope, $rootScope, $location, $window, $http, $modal) {

  $scope.date = new Date();

  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.sort = function (predicate) {
    if ($rootScope.predicate == predicate) {
      $rootScope.reverse = !$rootScope.reverse;
    } else {
      $rootScope.predicate = predicate;
      $rootScope.reverse = false;
    }
  };

  $scope.action = function(lead, status) {
    lead.status = status;

    // move the lead to the bottom of the array
    var i = $rootScope.leads.indexOf(lead);
    $rootScope.leads.splice(i, 1);
    $rootScope.leads.push(lead);

    $scope.status = countStatus();
  };
  
  $scope.open = function (lead) {
    var modalInstance = $modal.open ({
      templateUrl: 'leadDetailsModal.html',
      controller: ModalInstanceCtrl,
      size: 'lg',
      resolve: {
        lead: function () {
          return lead;
        }
      }
    });
  };

  // TODO: Move to a service
  $http.get('data/leads.json').success(function (data) {
    // process data here
    $rootScope.leads = data;
    $scope.status = countStatus();
  });

  var countStatus = function () {
    var successful = [], later = [], removed = [];

    successful = $rootScope.leads.filter(function(lead){
      return lead.status == 'success';
    });

    later = $rootScope.leads.filter(function(lead){
      return lead.status == 'later';
    });

    removed = $rootScope.leads.filter(function(lead){
      return lead.status == 'remove';
    });
    return {
      successful: successful.length,
      later: later.length,
      removed: removed.length
    } 
  };

  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.
  var ModalInstanceCtrl = function ($scope, $modalInstance, lead) {
    $scope.lead = lead;
    $scope.dismiss = function () {
      $modalInstance.close('dismiss');
    };
  };
  

});

angular.module('nowApp').controller('SettingsCtrl', function () {


});

angular.module('nowApp').controller('ManagerCtrl', function () {


});