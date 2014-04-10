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

/*var path = 'SuiteScripts/JPW/Lib/jPwJsUtils.js';
var url = nlapiResolveURL('SUITELET', 'customscript_file_utils', 'customdeploy_file_utils');
url = url + '&path=' + path;

paths.jPwJsUtils = url;
shims.jPwJsUtils = {
    exports: 'jPw'
};
*/

paths.jPwFiles = '/app/site/hosting/scriptlet.nl?script=48&deploy=1&type=file&path=SuiteScripts/JPW/jPwFiles.js';//'/core/media/media.nl?id=88581&c=801095&h=8d86fbe7ea57bbc5607e&_xt=.js';
shims.jPwFiles = {
    exports: 'jPw'
};


//paths.bootstrap = '/scripts/bootstrap';
shims.bootstrap = { deps: ['jquery'] }; //, exports: '$.fn.dropdown' 

require.config({
    paths: paths,
    shim: shims
});

require([
    'jPwFiles',
    'jquery',
	'angular',
    'domReady',
	'app',
    'css!bootstrap.css',
    'css!ebay.css',
	'routes',
    'controllers',
    'bootstrap'
], function (jPwFiles, $, angular, domReady, app) {
    'use strict';

    domReady(function () {
        angular.bootstrap($('#eBaySpaBody'), [app.name]);
    });

    //$(document).ready(function () {
    //    angular.bootstrap($('#eBaySpaBody'), [app.name]);
    //});
});