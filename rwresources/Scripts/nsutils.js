define(function () {
    window.jPw = window.jPw || {};

    var nsPresent = (typeof window.nlapiResolveURL !== 'undefined');
    var letUrl;

    if (nsPresent) {
        letUrl = nlapiResolveURL('SUITELET', 'customscript_file_utils', 'customdeploy_file_utils');
    } else {
        letUrl = '/app/site/hosting/scriptlet.nl?script=48&deploy=1'; 
    };
    letUrl = letUrl + '&type=file';

    window.jPw.nsPresent = nsPresent;
    window.jPw.getFileUrl = function (path) {
        return letUrl + '&path=' + path;
    };

    return window.jPw;
});