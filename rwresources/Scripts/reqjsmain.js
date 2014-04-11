var jQuery = window.jQuery;
if (jQuery) {
    // register the current jQuery
    define('jquery', [], function () { return jQuery; });
} else {
    // load if it's not available 
    //paths.jquery = '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min';

    require.config({
        paths: { jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min' }
    });

    //shims.jquery = { exports: 'jQuery' };
};

require.config({
    shim: {bootstrap: { deps: ['jquery'] } } //, exports: '$.fn.dropdown' 
});

var paths = {};
var shims = {};

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
    'css!bootstrap.css',
    'css!ebay.css',
    'bootstrap',
    'nsutils'
], function (css1, css2, boot, jpw) {
    'use strict';

    if (jpw.nsPresent) {
        require.config({
            paths: {
                jPwJsUtils: jpw.getFileUrl('SuiteScripts/JPW/Lib/jPwJsUtils.js'),
                jPwNsScriptUtils: jpw.getFileUrl('SuiteScripts/JPW/Lib/jPwNsScriptUtils.js'),
                eBayTradingApi: jpw.getFileUrl('SuiteScripts/JPW/eBayTradingApi.js')
            },
            shim: {
                jPwJsUtils: { exports: 'jPw' },
                jPwNsScriptUtils: { deps: ['jPwJsUtils'], exports: 'jPw' },
                eBayTradingApi: { deps: ['jPwJsUtils', 'jPwNsScriptUtils'], exports: 'jPw.apiet' }
            }
        });
    } else {
        define('jPwJsUtils', [], function () { return jpw; });
        define('jPwNsScriptUtils', ['jPwJsUtils'], function () { return jpw; });
        define('eBayTradingApi', ['jPwJsUtils', 'jPwNsScriptUtils'], function () {
            return jpw;
        });
    };

    require([
        'jquery',
        'angular',
        'domReady',
        'app',
        'routes',
        'controllers'
    ], function ($, angular, domReady, app) {
        'use strict';

        domReady(function () {
            var elm = $('#eBaySpaBody');
            var nm = app.name;
            angular.bootstrap(elm, [nm]);
        });
    });

});

