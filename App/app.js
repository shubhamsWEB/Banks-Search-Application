var app = angular.module('BankApp', ['ngRoute', 'ui.bootstrap', 'LocalStorageModule']);

app.config(function ($routeProvider) {
    $routeProvider.when('/BankSearch', {
        templateUrl: 'App/Views/Banksearch.html',
        controller: 'BankSerach'
    });
    $routeProvider.when('/Bank/:id', {
        templateUrl: 'App/Views/Bank.html',
        controller: 'Bank'
    });
    $routeProvider.otherwise({
        redirectTo: '/BankSearch'
    });
});