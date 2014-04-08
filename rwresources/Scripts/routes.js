define(['require', 'angular', 'ngRoute', 'app'], function (require, angular, route, app) {
    'use strict';
    
    var u = requirejs.s.contexts._.config.baseUrl;

    return app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: '/Ebay/Partial/View1',
            controller: 'MyCtrl1'
        });
        $routeProvider.when('/view2', {
            templateUrl: '/Ebay/Partial/View2',
            controller: 'MyCtrl2'
        });
        $routeProvider.otherwise({ redirectTo: '/view1' });
        
    }]);

});