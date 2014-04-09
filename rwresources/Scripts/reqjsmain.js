var paths = {};
var shims = {};

var jQuery = window.jQuery;
if (jQuery) {
    // register the current jQuery
    define('jquery', [], function () { return jQuery; });
} else {
    // load if it's not available 
    paths.jquery = '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min';
    //shims.jquery = { exports: 'jQuery' };
}

paths.angular = '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.min';
shims.angular = {
    exports: 'angular'
};

paths.ngRoute = '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-route.min';
shims.ngRoute = {
    deps: ['angular'],
    exports: 'angular'
};

paths.ngResource = '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-resource.min';
shims.ngResource = {
    deps: ['angular'],
    exports: 'angular'
};

require.config({
    paths: paths,
    shim: shims
});

require([
    'css!bootstrap.css',
    'jquery',
	'angular',
	'app',
	'routes',
    'controllers'
], function (bootstrap, $, angular, app, routes) {
    'use strict';

    //var $html = angular.element(document.getElementsByTagName('body')[0]);
    angular.element().ready(function () {
        //angular.resumeBootstrap([app['name']]);
        angular.bootstrap(document, [app['name']]);
    });
});