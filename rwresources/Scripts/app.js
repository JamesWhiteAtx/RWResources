define(['angular', 'ngRoute', 'services'], function (angular, ngRoute, services) {
    return angular.module('ebay', ['ngRoute', 'ebay.services']);
});