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
    var fiLetUrl;

    var suiteLetUrl = function (otions) { //rootId, scptId, deplId
        var scptPrfx = 'customscript_',
            deplPrfx = 'customdeploy_';
        if (otions.rootId) {
            if (!otions.scptId) {
                otions.scptId = scptPrfx + otions.rootId;
            };
            if (!otions.deplId) {
                otions.deplId = deplPrfx + otions.rootId;
            };
        };
        return nlapiResolveURL('SUITELET', otions.scptId, otions.deplId);
    };

    if (nsPresent) {
        fiLetUrl = suiteLetUrl('file_utils');
    } else {
        fiLetUrl = '/app/site/hosting/scriptlet.nl?script=48&deploy=1'; 
    };
    fiLetUrl = fiLetUrl + '&type=file';

    window.jPw = window.jPw || {};

    window.jPw.nsPresent = nsPresent;

    window.jPw.getFileUrl = function (path) {
        return fiLetUrl + '&path=' + path;
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