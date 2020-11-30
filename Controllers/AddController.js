
var AddController = function (angularServices, $scope, $rootScope, $http, $log, $location, $window) {
    console.log("AddController");
    $scope.id = null;
    if (!$rootScope.newstudentdata) {
        $scope.newstudent = {};
        $scope.newstudent.hobbies = {
            "reading": false,
            "playing_games": false,
            "travelling": false
        };
        console.log("newstudent", $scope.newstudent);
    } else {
        $scope.newstudent = $rootScope.newstudentdata;
        $scope.id = $scope.newstudent.id;
        console.log("newstudent", $scope.newstudent);
    }

    $scope.toggleSelection = function (item) {
        item = !item;
    }

    // POST Data From API
    $scope.saveList = function () {
        if ($scope.newstudent.id == undefined) {
            $scope.newstudent.createdat = new Date().getTime();
            $scope.newstudent.modifiedat = $scope.newstudent.createdat;

            angularServices.postData($rootScope.url, JSON.stringify($scope.newstudent)).then(function (response) {
                console.log("Post data", response);
                $window.location.href = '/';
            }, function (reason) {
                console.log("reason ", reason);
            });
        }
        else {
            // Update Data 
            $scope.newstudent.modifiedat = new Date().getTime();
            angularServices.postData($rootScope.url + '/' + $scope.newstudent.id, JSON.stringify($scope.newstudent)).then(function (response) {
                console.log("Update data", response);
                $window.location.href = '/';
            }, function (reason) {
                console.log("reason ", reason);
            });
        }
    }
}

AddController.$inject = ['angularServices', '$scope', '$rootScope', '$http', '$log', '$location', '$window'];