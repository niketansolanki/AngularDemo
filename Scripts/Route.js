
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "ViewList.html",
            controller: ViewController
        })
        .when("/add", {
            templateUrl: "addList.html",
            controller: AddController
        })
        .when("/Edit/:id", {
            templateUrl: "addList.html",
            controller: AddController
        })
        .otherwise({
            redirectTo: "/"
        })
});
