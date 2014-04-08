define(['require', 'angular', 'ngRoute', 'app'], function (require, angular, route, app) {
    'use strict';
    
    var r, el, host,
        baseUrl = requirejs.s.contexts._.config.baseUrl;
    r = new RegExp('^(?:[a-z]+:)?//', 'i');
    if (r.test(baseUrl)) {
        el = document.createElement('a');
        el.href = baseUrl;
        host = el.host;
    } else {
        host = '';
    }

    var getHostUrl = function (path) {
        var url = "/" + path;
        if (host) {
            url = 'https://' + host + url;
        }
        return url;
    }

    return app.config(['$routeProvider', '$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider) {

        if (host) {
            $sceDelegateProvider.resourceUrlWhitelist(['self', getHostUrl('**')]);
        }

        $routeProvider.when('/view1', {
            templateUrl: getHostUrl('Ebay/Partial/View1'),
            controller: 'MyCtrl1'
        });
        $routeProvider.when('/view2', {
            templateUrl: getHostUrl('/Ebay/Partial/View2'),
            controller: 'MyCtrl2'
        });
        $routeProvider.otherwise({ redirectTo: '/view1' });
        
    }]);

});