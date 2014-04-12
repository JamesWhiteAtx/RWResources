define(['require', 'angular', 'ngRoute', 'app', 'nsutils'], function (require, angular, route, app, jpw) {
    'use strict';

    return app.config(['$routeProvider', '$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider) {

        if (jpw.host) {
            $sceDelegateProvider.resourceUrlWhitelist(['self', jpw.getHostUrl('**')]);
        }

        $routeProvider
        .when('/CandList', {
            templateUrl: jpw.getHostUrl('Ebay/Partial/CandList'),
            controller: 'CandListCtrl'
        })
        .when('/view1', {
            templateUrl: jpw.getHostUrl('Ebay/Partial/View1'),
            controller: 'MyCtrl1'
        })
        .when('/view2', {
            templateUrl: jpw.getHostUrl('Ebay/Partial/View2'),
            controller: 'MyCtrl2' 
        })
        .otherwise({ redirectTo: '/view1' });
        
    }]);

});