
var ViewController = function (angularServices, $scope, $rootScope, $http, $log, $location, $window) {
    console.log("ViewController");
    $rootScope.studentList = [];
    $rootScope.newstudentdata = {};

    $scope.from = 0;
    $scope.to = 0;
    

    $scope.setDate = function (time) {
        if (time == 0 || time == null || time == undefined) {
            return time = ""
        }
        var CreateDate = new Date(time);
        console.log("create Date :-",CreateDate);
        return CreateDate.getDate() + "/" + (CreateDate.getMonth() + 1) + "/" + CreateDate.getFullYear();
    }

    $scope.dateFilter = function () {
        $scope.from = $scope.from2;
        $scope.to = $scope.to2;
    }

    $scope.datefiltercancel = function () {
        $scope.from2 = $scope.from;
        $scope.to2 = $scope.to;
    }
    $scope.myOrderBy = "-createdat";

    $scope.OrderByGrid = function (x) {
        if ($scope.gridOrderBy === x) {
            x = '-' + x;
        }
        $scope.myOrderBy = x;
        $scope.gridOrderBy = $scope.myOrderBy;
        console.log($scope.gridOrderBy);
    }

    $scope.getDate = function (time) {
        var CreateDate = new Date(time);
        return CreateDate.getDate() + "/" + (CreateDate.getMonth() + 1) + "/" + CreateDate.getFullYear() + " " + CreateDate.getHours() + ":" + CreateDate.getMinutes() + ":" + CreateDate.getSeconds();
    }

    $scope.changeHobbies = function (search) {
        console.log("search", search);
        if (search == "reading") {
            $scope.searchText.hobbies.reading = true;
            console.log("$scope.searchHobbies",$scope.searchHobbies);
        }
    }
    $scope.showdata = function (data) {
        console.log("data", data);
        $scope.searchQuery = data;
    }
    $rootScope.url = "http://localhost:8082/Users";

    // GET Data From API
    angularServices.getData($rootScope.url).then(function (response) {
        console.log("response", response);
        var data = response.data;
        $rootScope.studentList = [];
        for (var key in data) {
            $rootScope.studentList.push(data[key]);
        }
    }, function (reason) {
        console.log("reason ", reason);
    });

    $scope.fetchData = function (data) {
        console.log(data);
        if (data == "" || data == null || data == undefined) {
            console.log("simple call")
            angularServices.getData($rootScope.url).then(function (response) {
                console.log("response", response);
                var data = response.data;
                $scope.user = [];
                $rootScope.studentList = [];
                for (var key in data) {
                    $rootScope.studentList.push(data[key]);
                }
            }, function (reason) {
                console.log("reason ", reason);
            });
        } else {
            console.log("search call")
            angularServices.getData($rootScope.url + "/search/" + data).then(function (response) {
                console.log("response", response);
                var data = response.data;
                 $scope.user = [];
                $rootScope.studentList = [];
                for (var key in data) {
                    $rootScope.studentList.push(data[key]);
                    $scope.user.push(data[key]);
                }
            }, function (reason) {
                console.log("reason ", reason);
            });
        }
    }
    //Edit
    $scope.edit = function (id) {
        $window.location.href = "#/Edit/" + id;
        for (var i in $rootScope.studentList) {
            if ($rootScope.studentList[i].id == id) {
                console.log($scope.id);
                console.log("student", $rootScope.studentList[i]);
                $rootScope.newstudentdata = angular.copy($rootScope.studentList[i]);
                console.log("View student", $rootScope.newstudentdata);
            }
        }
    }

    $scope.add = function () {
        $location.path('/add');
    }

    $scope.resetFilter = function () {
        console.log("reset Filter");
        $scope.searchText = {};
        $scope.from = 0;
        $scope.to = 0;
    }

    //DELETE Data From API
    $scope.deleteId = null;
    $scope.delete = function (id) {
        $scope.deleteId = id;
        console.log(id);
    }

    $scope.confirmDelete = function () {
        console.log($scope.deleteId);
        angularServices.deleteData($rootScope.url + "/" + $scope.deleteId).then(function (response) {
            console.log("delete data", response);
            angularServices.getData($rootScope.url).then(function (response) {
                console.log("response", response);
                var data = response.data;
                $rootScope.studentList = [];
                for (var key in data) {
                    $rootScope.studentList.push(data[key]);
                }
            }, function (reason) {
                console.log("reason ", reason);
            });
        }, function (reason) {
            console.log("reason ", reason);
        });
        $scope.newstudent = {};
    }

    $scope.autocompletefunction = function () {

    }
};

ViewController.$inject = ['angularServices', '$scope', '$rootScope', '$http', '$log', '$location', '$window'];
