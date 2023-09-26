////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.service('orderTrackingService', function () {
    var endPoint = 'http://localhost:49475/api/OrderTracking';
    this.getTrackingOrders = function ($scope, $http) {

        var config = {
            headers: { "CommandType": "GetTrackingOrders" },

        };
        return $http.get(endPoint + '/GetTrackingOrders', config);
    }
    this.GetOrdersList = function ($scope, $http) {

        var config = {
            headers: { "CommandType": "GetOrdersList" },

        };
        return $http.get(endPoint + '/GetOrdersList', config);
    }

    this.GetProductList = function ($scope, $http, orderId) {

        var config = {
            headers: { "CommandType": "GetProductList" },
            params: { OrderId: orderId }
        };
        return $http.get(endPoint + '/GetProductList', config);
    }
    this.CancelOrders = function ($scope, $http, orderId) {

        var config = {
            headers: { "CommandType": "CancelOrders" },
            params: { OrderId: orderId }
        };
        return $http.get(endPoint + '/CancelOrders', config);
    }
    this.SearchOrders = function ($scope, $http, orderId) {

        var config = {
            headers: { "CommandType": "SearchOrders" },
            params: { OrderId: orderId }
        };
        return $http.get(endPoint + '/SearchOrders', config);
    }
    this.PagingOrders = function ($scope, $http, page) {

        var config = {
            headers: { "CommandType": "GetPagingOrders" },
            params: { PageId: page }
        };
        return $http.get(endPoint + '/GetPagingOrders', config);
    }

});