require.config({
    paths: {
        'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.min',
        'ngRoute': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-route.min',
        'ngResource': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-resource.min'
    },
    shim: {
        ngResource: {
            deps: ['angular'],
            exports: 'angular'
        },
        angular: {
            exports: 'angular'
        }
    }
});

require([
	'angular',
	'app',
	'routes'
], function (angular, app, routes) {
    'use strict';

    //var $html = angular.element(document.getElementsByTagName('body')[0]);
    angular.element().ready(function () {
        //angular.resumeBootstrap([app['name']]);
        angular.bootstrap(document, [app['name']]);
    });
});