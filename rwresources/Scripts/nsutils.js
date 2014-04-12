define(['require'], function (require) {
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
    };

    var nsPresent = (typeof window.nlapiResolveURL !== 'undefined');
    var letUrl;

    if (nsPresent) {
        letUrl = nlapiResolveURL('SUITELET', 'customscript_file_utils', 'customdeploy_file_utils');
    } else {
        letUrl = '/app/site/hosting/scriptlet.nl?script=48&deploy=1'; 
    };
    letUrl = letUrl + '&type=file';

    window.jPw = window.jPw || {};

    window.jPw.nsPresent = nsPresent;

    window.jPw.getFileUrl = function (path) {
        return letUrl + '&path=' + path;
    };

    window.jPw.host = host;

    window.jPw.getHostUrl = function (path) {
        var url = "/" + path;
        if (host) {
            url = 'https://' + host + url;
        }
        return url;
    }
    return window.jPw;
});