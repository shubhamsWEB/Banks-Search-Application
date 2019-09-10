app.factory('getService', function ($http) {
    var homefactory = {};
    var URL = "https://vast-shore-74260.herokuapp.com/banks";

    homefactory.getbanks = function (city) {
        return $http.get(URL + "?city=" + city);
    }
  
    return homefactory;
});