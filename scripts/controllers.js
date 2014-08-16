'use strict';

angular.module('nowApp').controller('HeaderCtrl', function ($scope, $location) {

  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };

  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.isCollapsed = true;  

});

angular.module('nowApp').controller('HomeCtrl', function ($scope, $location, $window, $http, $modal) {

  $scope.date = new Date();

  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.action = function(lead, status) {
    lead.status = status;

    // move the lead to the bottom of the array
    var i = $scope.leads.indexOf(lead);
    $scope.leads.splice(i, 1);
    $scope.leads.push(lead);

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
    $scope.leads = data;
    $scope.status = countStatus();
  });

  var countStatus = function () {
    var successful = [], later = [], removed = [];

    successful = $scope.leads.filter(function(lead){
      return lead.status == 'success';
    });

    later = $scope.leads.filter(function(lead){
      return lead.status == 'later';
    });

    removed = $scope.leads.filter(function(lead){
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
    $scope.ok = function () {
      $modalInstance.close('ok');
    };
  };
  

});

angular.module('nowApp').controller('SettingsCtrl', function () {


});

angular.module('nowApp').controller('ManagerCtrl', function () {


});