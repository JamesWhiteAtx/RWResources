define(['require', 'angular', 'ngResource', 'nsutils'], function (require, angular, ngResource, jpw) {
    'use strict';

    var srvc = angular.module('ebay.services', ['ngResource']);

    srvc.factory('CallEbayApi', ['$resource', '$q', '$http', function ($resource, $q, $http) {
        return function (call, xml) {
            var delay = $q.defer();
            var url = jpw.getHostUrl('EbayApi/' + call);
            $http({
                url: url,
                method: "POST",
                data: '=' + encodeURIComponent(xml),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                //headers: { 'Content-Type': 'application/xml; charset="utf-8"' }
            }).success(function (data, status, headers, config) {
                var obj = angular.fromJson( angular.fromJson(data) );
                delay.resolve(obj);
            }).error(function (data, status, headers, config) {
                delay.reject(data, status, headers, config);
            });
            return delay.promise;
        };
    }]);

    srvc.factory('PromiseApi', ['CallEbayApi', '$q', function (CallEbayApi, $q) {
        return function (api, callName, xmlStr) {
            var call = api ? api.call : callName;
            var xmlStr = api ? api.getXmlEncode() : xmlStr;

            var delay = $q.defer();
            CallEbayApi(call, xmlStr).then(
                function (result) {
                    var respName = call + 'Response';
                    var resp = result[respName];
                    if (resp) {
                        if ((resp.Ack == 'Success') || (resp.Ack == 'Warning')) {
                            delay.resolve(resp);
                        } else {
                            delay.reject(result, 'Failure', headers, config);
                        };
                    } else {
                        delay.reject(result, 'Missing', headers, config);
                    };
                },
                function (data, status, headers, config) {
                    delay.reject(data, status, headers, config);
                }
            );
            return delay.promise;
        };
    }]);

    return srvc;
});