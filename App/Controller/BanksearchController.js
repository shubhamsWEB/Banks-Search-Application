app.controller('BankSerach', function ($scope, getService, localStorageService) {
    $scope.Banks = localStorageService.get('bankData');
    $scope.city = 'RAIPUR';
    var keepgoing = true;
    $scope.getData = function () {
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

            $scope.viewby = 20;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.totalItems = $scope.Banks.length;
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
        });
    }
    $scope.getData();
    $scope.currentAddFav =  function (id) {
        if (localStorageService.get('favourites')) {//If there are favourites
            var storage = localStorageService.get('favourites');
            
            if (storage.indexOf(id) == -1) {
                // # not found
                storage.push({ id });
                localStorageService.set('favourites', storage);
               
            } else {
                //  # found
                console.log('item already in favorites')
            }
        
        } else {//No favourites in local storage, so add new
            var favArray = []; 
            favArray.push({ id });
            localStorageService.set('favourites', favArray);
            console.log('New favourites list');
        }

    }
});