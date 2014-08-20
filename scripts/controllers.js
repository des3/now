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

  $scope.sortLeads = function (predicate, reverse) {
    if (predicate === undefined) predicate = $rootScope.predicate;
    if (reverse === undefined) reverse = $rootScope.reverse;

    $rootScope.predicate = predicate;
    $rootScope.reverse = reverse;

    $rootScope.leads = $rootScope.leads.sort(compareLeads);
  };

  // sorting algo
  function compareLeads(a,b) {
    var pa = 0, pb = 0;
    if (!a.status) pa = 4
    if (!b.status) pb = 4
    if (a.status == 'later') pa = 3
    if (b.status == 'later') pb = 3
    if (a.status == 'success') pa = 2
    if (b.status == 'success') pb = 2
    if (a.status == 'remove') pa = 1
    if (b.status == 'remove') pb = 1
    if (pa < pb) return 1;
    if (pa > pb) return -1;

    var predicate = $rootScope.predicate;
    var ret = $rootScope.reverse ? -1 : 1;
    if (a[predicate] > b[predicate]) return ret;
    if (a[predicate] < b[predicate]) return -ret;
    
    return 0;
  }

  $scope.action = function(lead, status) {
    lead.status = status;

    // resort leads w our sorting algo
    $scope.sortLeads();
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
    
    $scope.sortLeads();
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