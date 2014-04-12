define(['jquery', 'angular', 'app', 'services'], function ($, angular, app, services) {
    'use strict';

    app
        .controller('EbayCtrl', ['$scope', '$location', function ($scope, $location) {
            $scope.notloaded = 'Loaded!';
            $scope.routeCandList = function (crumb) {
                $location.path('/CandList');
            };
            $scope.routev1 = function (crumb) {
                $location.path('/view1');
            };
            $scope.routev2 = function (crumb) {
                $location.path('/view2');
            };
        }])
        .controller('CandListCtrl', ['$scope', 'TrdApi', function ($scope, TrdApi) {

            require(['eBayTradingApi'], function (apiet) {
                var xmlStr;
                if (apiet.makeActiveListingsReques) {
                    var api = apiet.makeActiveListingsRequest();
                    api.addOutputSelector('PageNumber')
                        .addOutputSelector('PaginationResult.TotalNumberOfEntries')
                        .addOutputSelector('PaginationResult.TotalNumberOfPages')
                        .addOutputSelector('ReturnedItemCountActual');

                    api.setRequestProp("Pagination", { "EntriesPerPage": 100, "PageNumber": 1 });

                    xmlStr = api.getXmlEncode();
                } else {
                    xmlStr = '<?xml version="1.0" encoding="utf-8"?><GetSellerListRequest xmlns="urn:ebay:apis:eBLBaseComponents"><RequesterCredentials><eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**34OnUg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AFmYOlDJOGoAqdj6x9nY+seQ**RvwBAA**AAMAAA**uJrlEq/jW5TA7bd7pudUzSkEduO9/DDHyzvmjj8ODZRJx1UOa5eD9sX9vr+eLgtJNfiSOlhTGUIvttnchd+Zr7eYNc/F6X8HVPEkoMWDA3QKFI6TRi4Ried0sZYs9riP3VZ8KiNe6FIt2G1DVbtc6G4IwDADb1JE8D5xJ92AQYmiJCSDVPEKfuBSMkmr2z+OxCjzVep4QxowLdGl6DoxV2CloPsaYYOxF4oMlKZUSnvsLO7AlHIsPO+NyjB644obwNsImitwKqAEceyOIhRZFaCih598BrRSnnIxk8q+kiSD1Hn+RlYLiAlO2tP3C9+Aw9ja1rl5DGaDvaxkHl2gak+Z05boZoTxMYRlkX8n3qjv1DSRaQccM1eFykTpLKLR2P9JxcSDLwkHb1u1PYQSa6xw2gL7smJKymxOGpMRm3KjGkZhhiC27CnzSQP3oxnOPSdKJYoMaBp05olAx8IHUWXpv6SgqSckrWQ+9iqexPrJ6Wr5gRSEgSFOgv+/R0VK8JN6xxAxebZrPH9NOVP9w3RS/6ecG+9jEKry/3mcb6mIVBdUQadQ+4kiGLv88Pyag8pW9eBcqDFVkbEJBbJdAS98Tlu44gSaEQCwm/wTSSRwY3Fbn/KPiSIvRFA0h3UKFdLNftGbqhiGLbX9t7KgsK7PFx+/cejpPhhVCUfg42qRrUHycU56TvBfRDygodz7ydnXnq/HjDEiVB3EbR8mrLgTb7piLGgKgbV/vmGnyq3hsUCCpqzDCsQvuPksTo1N</eBayAuthToken></RequesterCredentials><EndTimeFrom>2014-04-12T20:19:47.648Z</EndTimeFrom><EndTimeTo>2014-07-14T20:19:47.648Z</EndTimeTo><Pagination><EntriesPerPage>200</EntriesPerPage><PageNumber>1</PageNumber></Pagination><DetailLevel>ReturnAll</DetailLevel><OutputSelector>ItemArray.Item.SKU</OutputSelector><OutputSelector>ItemArray.Item.ApplicationData</OutputSelector><OutputSelector>ItemArray.Item.Title</OutputSelector><OutputSelector>ItemArray.Item.ItemID</OutputSelector><OutputSelector>ItemArray.Item.ListingDetails.ViewItemURL</OutputSelector><OutputSelector>ItemArray.Item.Quantity</OutputSelector><OutputSelector>ItemArray.Item.SellingStatus.QuantitySold</OutputSelector><OutputSelector>ItemArray.Item.SellingStatus.CurrentPrice</OutputSelector><OutputSelector>PageNumber</OutputSelector><OutputSelector>PaginationResult.TotalNumberOfEntries</OutputSelector><OutputSelector>PaginationResult.TotalNumberOfPages</OutputSelector><OutputSelector>ReturnedItemCountActual</OutputSelector></GetSellerListRequest>';
                };

                TrdApi('GetSellerList', xmlStr)
                .then(
                    function (result) {
                        j = result;
                    },
                    function (err) {
                        j = err;
                    }
                );

                $scope.candidates = []


                /*var search = nlapiCreateSearch('item',
                    [['custitem_ebay_candidate', 'is', 'T']],
                    [new nlobjSearchColumn('name').setSort()]);
                var resultSet = search.runSearch();
                var results = resultSet.getResults(0, 100);

                //angular.forEach(results, function (item, idx) {
                //    $scope.candidates.push({ id: item.getId(), name: item.getValue('name') });
                //});
                $.each(results, function (idx, item) {
                    $scope.candidates.push({ id: item.getId(), name: item.getValue('name') });
                });

                var context = nlapiGetContext();
                $scope.usage = context.getRemainingUsage();
                */
            });

        }])
        .controller('MyCtrl1', ['$scope', function ($scope) {
            $scope.var1 = "var one";

            var xmlStr = '<?xml version="1.0" encoding="utf-8"?>' +
                '<GeteBayOfficialTimeRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
                '<RequesterCredentials>' +
                '<eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**34OnUg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AFmYOlDJOGoAqdj6x9nY+seQ**RvwBAA**AAMAAA**uJrlEq/jW5TA7bd7pudUzSkEduO9/DDHyzvmjj8ODZRJx1UOa5eD9sX9vr+eLgtJNfiSOlhTGUIvttnchd+Zr7eYNc/F6X8HVPEkoMWDA3QKFI6TRi4Ried0sZYs9riP3VZ8KiNe6FIt2G1DVbtc6G4IwDADb1JE8D5xJ92AQYmiJCSDVPEKfuBSMkmr2z+OxCjzVep4QxowLdGl6DoxV2CloPsaYYOxF4oMlKZUSnvsLO7AlHIsPO+NyjB644obwNsImitwKqAEceyOIhRZFaCih598BrRSnnIxk8q+kiSD1Hn+RlYLiAlO2tP3C9+Aw9ja1rl5DGaDvaxkHl2gak+Z05boZoTxMYRlkX8n3qjv1DSRaQccM1eFykTpLKLR2P9JxcSDLwkHb1u1PYQSa6xw2gL7smJKymxOGpMRm3KjGkZhhiC27CnzSQP3oxnOPSdKJYoMaBp05olAx8IHUWXpv6SgqSckrWQ+9iqexPrJ6Wr5gRSEgSFOgv+/R0VK8JN6xxAxebZrPH9NOVP9w3RS/6ecG+9jEKry/3mcb6mIVBdUQadQ+4kiGLv88Pyag8pW9eBcqDFVkbEJBbJdAS98Tlu44gSaEQCwm/wTSSRwY3Fbn/KPiSIvRFA0h3UKFdLNftGbqhiGLbX9t7KgsK7PFx+/cejpPhhVCUfg42qRrUHycU56TvBfRDygodz7ydnXnq/HjDEiVB3EbR8mrLgTb7piLGgKgbV/vmGnyq3hsUCCpqzDCsQvuPksTo1N</eBayAuthToken>' +
                '</RequesterCredentials>' +
                '</GeteBayOfficialTimeRequest>';

            //$.ajax({
            //    url: 'https://api.ebay.com/ws/api.dll',
            //    type: "POST",
            //    processData: false,
            //    headers: {
            //        'X-EBAY-API-SITEID': '100',
            //        'X-EBAY-API-COMPATIBILITY-LEVEL': '865',
            //        'X-EBAY-API-DEV-NAME': '481891e7-46d4-4a19-8992-bbfef42842b7',
            //        'X-EBAY-API-APP-NAME': 'Roadwire-36ca-46dd-ac36-2e3a7ba40080',
            //        'X-EBAY-API-CERT-NAME': 'a562fc05-3f60-4d85-a9ce-249b4ec4cbc1',
            //        'X-EBAY-API-CALL-NAME': 'GeteBayOfficialTime'
            //    },
            //    contentType: 'text/xml; charset=UTF-8',
            //    data: xmlStr,
            //    dataType: "xml",
            //    success: function (response) {
            //        alert(response);
            //    },
            //    error: function (response) {
            //        alert(response);
            //    }
            //});

            //$.ajax({
            //    type: "POST",
            //    url: 'http://open.api.ebay.com/shopping?callname=FindItemsAdvanced',
            //    dataType: "jsonp",
            //    jsonp: "callbackname",
            //    crossDomain: true,
            //    data: {
            //        'appid': 'Your AppID',
            //        'version': '771',
            //        'siteid': '0',
            //        'requestencoding': 'JSON',
            //        'responseencoding': 'JSON',
            //        'QueryKeywords': 'boot head',
            //        'MaxEntries': '3',
            //        'PriceMin': { 'Value': '250.0', 'CurrencyID': 'USD' },
            //        'PriceMax': { 'Value': '300.0', 'CurrencyID': 'USD' },
            //        'callback': true
            //    },
            //    success: function (object) {
            //        $("#ajaxLoad").html('');
            //        alert('success');
            //        $("#eBayXMLResponse").val(JSON.stringify(object, null, 4));
            //    },
            //    error: function (object, x, errorThrown) {
            //        $("#ajaxLoad").html('');
            //        alert("call failure");
            //        $("#eBayXMLResponse").val(JSON.stringify(errorThrown, null, 4));

            //    }
            //});

        }])
        .controller('MyCtrl2', ['$scope', function ($scope) {
            $scope.var2 = "var two";

            var headers = [];
            headers['X-EBAY-API-SITEID'] = '100';
            headers['X-EBAY-API-COMPATIBILITY-LEVEL'] = '865';
            headers['X-EBAY-API-DEV-NAME'] = '481891e7-46d4-4a19-8992-bbfef42842b7';
            headers['X-EBAY-API-APP-NAME'] = 'Roadwire-36ca-46dd-ac36-2e3a7ba40080';
            headers['X-EBAY-API-CERT-NAME'] = 'a562fc05-3f60-4d85-a9ce-249b4ec4cbc1';
            headers['X-EBAY-API-CALL-NAME'] = 'GeteBayOfficialTime';

            var url = 'https://api.ebay.com/ws/api.dll';
            var xmlStr = '<?xml version="1.0" encoding="utf-8"?>' +
                '<GeteBayOfficialTimeRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
                '<RequesterCredentials>' +
                '<eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**34OnUg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AFmYOlDJOGoAqdj6x9nY+seQ**RvwBAA**AAMAAA**uJrlEq/jW5TA7bd7pudUzSkEduO9/DDHyzvmjj8ODZRJx1UOa5eD9sX9vr+eLgtJNfiSOlhTGUIvttnchd+Zr7eYNc/F6X8HVPEkoMWDA3QKFI6TRi4Ried0sZYs9riP3VZ8KiNe6FIt2G1DVbtc6G4IwDADb1JE8D5xJ92AQYmiJCSDVPEKfuBSMkmr2z+OxCjzVep4QxowLdGl6DoxV2CloPsaYYOxF4oMlKZUSnvsLO7AlHIsPO+NyjB644obwNsImitwKqAEceyOIhRZFaCih598BrRSnnIxk8q+kiSD1Hn+RlYLiAlO2tP3C9+Aw9ja1rl5DGaDvaxkHl2gak+Z05boZoTxMYRlkX8n3qjv1DSRaQccM1eFykTpLKLR2P9JxcSDLwkHb1u1PYQSa6xw2gL7smJKymxOGpMRm3KjGkZhhiC27CnzSQP3oxnOPSdKJYoMaBp05olAx8IHUWXpv6SgqSckrWQ+9iqexPrJ6Wr5gRSEgSFOgv+/R0VK8JN6xxAxebZrPH9NOVP9w3RS/6ecG+9jEKry/3mcb6mIVBdUQadQ+4kiGLv88Pyag8pW9eBcqDFVkbEJBbJdAS98Tlu44gSaEQCwm/wTSSRwY3Fbn/KPiSIvRFA0h3UKFdLNftGbqhiGLbX9t7KgsK7PFx+/cejpPhhVCUfg42qRrUHycU56TvBfRDygodz7ydnXnq/HjDEiVB3EbR8mrLgTb7piLGgKgbV/vmGnyq3hsUCCpqzDCsQvuPksTo1N</eBayAuthToken>' +
                '</RequesterCredentials>' +
                '</GeteBayOfficialTimeRequest>';

            function handleResponse(response) {
                var headers = response.getAllHeaders();
                var output = 'Code: ' + response.getCode() + '\n';
                output += 'Headers:\n';
                for (var i in headers)
                    output += i + ': ' + headers[i] + '\n';
                output += '\n\nBody:\n\n';
                output += response.getBody();
                alert(output);
            };

            nlapiRequestURL(url, xmlStr, headers, handleResponse);
            var context = nlapiGetContext();
            $scope.usage = context.getRemainingUsage();
        }]);
});