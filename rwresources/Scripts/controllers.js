define(['angular', 'app'], function (angular, app) {
    'use strict';

    app
        .controller('MyCtrl1', ['$scope', function ($scope) {
            $scope.var1 = "var one";
        }])
        .controller('MyCtrl2', ['$scope', function ($scope) {
            $scope.var2 = "var two";
        }]);
});