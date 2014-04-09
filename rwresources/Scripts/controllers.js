define(['angular', 'app'], function (angular, app) {
    'use strict';

    app
        .controller('EbayCtrl', ['$scope', '$location', function ($scope, $location) {
            $scope.routeCandList = function (crumb) {
                $location.path('/CandList');
            };
            $scope.routev1 = function (crumb) {
                $location.path('/view1');
            };
            $scope.routev2 = function (crumb) {
                $location.path('/view2');
            };
        }])
        .controller('CandListCtrl', ['$scope', function ($scope) {
            $scope.cands = [{ id: 1, name: 'one' }, { id: 2, name: 'two' }]
        }])
        .controller('MyCtrl1', ['$scope', function ($scope) {
            $scope.var1 = "var one";
        }])
        .controller('MyCtrl2', ['$scope', function ($scope) {
            $scope.var2 = "var two";
        }]);
});