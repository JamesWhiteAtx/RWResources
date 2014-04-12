define(['angular', 'ngResource', 'nsutils'], function (angular, ngResource, jpw) {
    'use strict';

    var srvc = angular.module('ebay.services', ['ngResource']);

    srvc.factory('TrdApi', ['$resource', '$q', '$http', function ($resource, $q, $http) {
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
                var obj = angular.fromJson(data);
                delay.resolve(obj);
            }).error(function (data, status, headers, config) {
                delay.reject(data);
            });

            
            //$resource(url, xml, { update: { method: 'POST' } });

            

            return delay.promise;
        };
    }]);

    return srvc;
});