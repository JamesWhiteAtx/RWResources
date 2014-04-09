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

//paths.bootstrap = '/scripts/bootstrap';
shims.bootstrap = { deps: ['jquery'] }; //, exports: '$.fn.dropdown' 

require.config({
    paths: paths,
    shim: shims
});

require([
    'jquery',
	'angular',
    'domReady',
	'app',
    'css!bootstrap.css',
    'css!ebay.css',
	'routes',
    'controllers',
    'bootstrap'
], function ($, angular, domReady, app) {
    'use strict';

    domReady(function () {
        angular.bootstrap($('#eBaySpaBody'), [app.name]);
    });

    //$(document).ready(function () {
    //    angular.bootstrap($('#eBaySpaBody'), [app.name]);
    //});
});