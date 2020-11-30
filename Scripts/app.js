
var app = angular.module("myApp", ['ngRoute']);

app.filter('dateRange', function () {
    return function (records, from, to) {
        return records.filter(function (record) {
            if (from == 0 && to == 0 || from == undefined && to == undefined) {
                return record;
            } else if (from != 0 && to == 0 || from != 0 && to == undefined) {
                return record.createdat >= from
            } else if (from == 0 && to != 0 || from == undefined && to != 0) {
                return record.createdat <= to
            } else {
                return record.createdat >= from && record.createdat <= to;
            }

        });
    }
})
