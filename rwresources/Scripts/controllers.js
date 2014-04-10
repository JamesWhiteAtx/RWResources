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

            $scope.candidates = []

            var search = nlapiCreateSearch('item',
                [['custitem_ebay_candidate', 'is', 'T']],
                [new nlobjSearchColumn('name').setSort()] );
            var resultSet = search.runSearch();
            var results = resultSet.getResults(0, 100);

            angular.forEach(results, function (item, idx) {
                $scope.candidates.push({ id: item.getId(), name: item.getValue('name') });
            });
        }])
        .controller('MyCtrl1', ['$scope', function ($scope) {
            $scope.var1 = "var one";
        }])
        .controller('MyCtrl2', ['$scope', function ($scope) {
            $scope.var2 = "var two";
        }]);
});