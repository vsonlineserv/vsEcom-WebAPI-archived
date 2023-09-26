////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app_retailer.service('ordersService', function () {

    var endPoint = 'http://localhost:49475/api/RetailerOrder';
    this.getPendingOrders = function ($scope, $http, branch, pageSize, pageNo) {

        var config = {
            headers: { "CommandType": "GetPendingOrderHistory" },
            params: { branchId: branch, PageSize: pageSize, PageNo: pageNo }
        };
        return $http.get(endPoint + '/GetPendingOrderHistory', config);
    }
    this.GetTotalOrders = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetTotalOrders" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetTotalOrders', config);
    }
    this.getorders = function ($scope, $http, branch, order) {

        var config = {
            headers: { "CommandType": "GetOrders" },
            params: { branchId: branch, orderId: order }
        };
        return $http.get(endPoint + '/GetOrders', config);
    }
    this.getOrderSearch = function ($scope, $http, branch, orderStatus, orderid, paymentStatus) {

        var config = {
            headers: { "CommandType": "GetOrdersSearch" },
            params: { branchId: branch, order: orderid, Status: orderStatus }
        };
        return $http.get(endPoint + '/GetOrdersSearch', config);
    }
    this.getOrdersSummary = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetOrdersSummary" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetOrdersSummary', config);
    }

    this.getOrderSummaryByCategory = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetOrderSummaryByCategory" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetOrderSummaryByCategory', config);
    }

    this.getOrderSummaryByProduct = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetOrderSummaryByProduct" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetOrderSummaryByProduct', config);
    }

    this.getOrderCountByStatus = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetOrderCountSplitByStatus" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetOrderCountSplitByStatus', config);
    }

    this.getLast7DaysSalesChart = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetLast7DaysSalesChart" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetLast7DaysSalesChart', config);
    }

    this.getLast6MonthsSalesChart = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetLast6MonthsSalesChart" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetLast6MonthsSalesChart', config);
    }

    this.getBranchProductSummary = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetBranchProductSummary" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetBranchProductSummary', config);
    }

    this.getBranchEnquirySummary = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetBranchEnquirySummary" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetBranchEnquirySummary', config);
    }



    this.getOrderStatus = function ($scope, $http) {

        var config = {
            headers: { "CommandType": "GetOrderStatus" }

        };
        return $http.get(endPoint + '/GetOrderStatus', config);
    }

    this.printOrderDetails = function ($http, orderId) {

        var config = {
            headers: { "CommandType": "PrintOrderDetails" },
            params: { orderId: orderId }

        };
        return $http.get(endPoint + '/PrintOrderDetails', config);
    }

    this.GetPaymentOption = function ($scope, $http) {

        var config = {
            headers: { "CommandType": "GetPaymentOption" }

        };
        return $http.get(endPoint + '/GetPaymentOption', config);
    }

    this.UpdateOrderStatus = function ($scope, $http, subOrderId, OrderId, statusId) {
        var config = {
            headers: { "CommandType": "UpdateOrderStatus" }

        };
        var orderStatusUpdate = { subOrderId: subOrderId, orderId: OrderId, statusId: statusId };
        return $http.post(endPoint + '/UpdateOrderStatus/', orderStatusUpdate, config);

    }

    this.UpdatePaymentStatus = function ($scope, $http, subOrderId, OrderId, statusId) {
        var config = {
            headers: { "CommandType": "UpdateOrderStatus" }

        };
        var orderStatus = { subOrderId: subOrderId, orderId: OrderId, statusId: statusId };
        return $http.post(endPoint + '/UpdateOrderStatus/', orderStatus, config);
    }

});