app.controller('Bank', function ($scope, getService, $routeParams, localStorageService) {
    var ifsc = $routeParams.id;
    var keepgoing = true;
    $scope.Data = localStorageService.get('bankData');
    if (keepgoing) {
        angular.forEach($scope.Data, function (value, key) {
            if (value.ifsc == ifsc) {
                keepgoing = false;
                $scope.BankData = value;
            }
    });
    }
});