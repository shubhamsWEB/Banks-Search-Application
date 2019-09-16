(function () {
    app.controller('BankSerach', function ($scope, getService, localStorageService,$filter,$location) {
        $scope.Banks = localStorageService.get('bankData');
        $scope.city = 'RAIPUR';
        $scope.viewby = '10';
        $scope.getData = function () {
            $scope.loaded = true;
            getService.getbanks($scope.city).then(function (data) {
                $scope.Banks = data.data;
                $scope.favouritesList = localStorageService.get('favourites');
                angular.forEach($scope.favouritesList, function (fav, index) {
                    angular.forEach($scope.Banks, function (bank, key) {


                        if (bank.ifsc == fav.id) {
                            bank.isFav = 1;
                            return false
                        }

                    });
                });
                localStorageService.set('bankData', data.data);

                $scope.currentPage = 1;
                $scope.itemsPerPage = $scope.viewby;
                $scope.$watch("search", function (query) {
                    $scope.filteredData = $filter("filter")($scope.Banks, query);
                });
                $scope.maxSize = 5; //Number of pager buttons to show

                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };

                $scope.pageChanged = function () {
                    console.log('Page changed to: ' + $scope.currentPage);
                };

                $scope.setItemsPerPage = function (num) {
                    $scope.itemsPerPage = num;
                    $scope.currentPage = 1; //reset to first page
                }
                $scope.loaded = false;
            });
        }
        $scope.getData();
        
        $scope.currentAddFav = function (id, $event) {
         

            if (localStorageService.get('favourites')) {//If there are favourites
                var storage = localStorageService.get('favourites');

                if (storage.indexOf(id) == -1) {
                    // # not found
                    storage.push({ id });
                    localStorageService.set('favourites', storage);

                } 

            } else {//No favourites in local storage, so add new
                var favArray = [];
                favArray.push({ id });
                localStorageService.set('favourites', favArray);
                console.log('New favourites list');
            }
        }
        
    })
})();