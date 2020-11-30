
app.service('angularServices', function ($http) {

    this.getData = function (url) {
        return $http.get(url);
    }

    this.postData = function (url, data) {
        return $http.post(url, data);
    }

    this.deleteData = function (url) {
        return $http.delete(url);
    }
});
