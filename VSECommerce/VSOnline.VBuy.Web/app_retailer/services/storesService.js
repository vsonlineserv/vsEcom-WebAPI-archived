////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app_retailer.service('storesService', function () {

    var endPoint = 'http://localhost:49475/api/Retailer';


    this.getFilter = function ($http) {

        var config = {
            headers: { "CommandType": "GetRetailerProductFilter" },

        };
        return $http.get(endPoint + '/GetRetailerProductFilter', config);
    }

    this.getProducts = function ($scope, $http) {

        var config = {
            headers: { "CommandType": "GetProducts" },
            params: $scope.filters
        };
        return $http.get(endPoint + '/GetProducts', config);
    }

    this.productPagination = function ($scope, $http, PageNo, pageSize) {

        //int selectedCategory, int selectedSubCategory, int? selectedBrand, int?pages
        var config = {
            headers: { "CommandType": "GetPagingProducts" },
            params: {
                selectedCategory: $scope.filters.selectedCategory,
                selectedSubCategory: $scope.filters.selectedSubCategory,
                selectedBrand: $scope.filters.selectedBrand,
                pageNo: PageNo,
                PageSize: pageSize
            }
        };
        return $http.get(endPoint + '/GetPagingProducts', config);
    }
    this.getMyFilteredProducts = function ($scope, $http, branchId) {
        $scope.filters.storeId = $scope.RetailerInfo.StoreId;
        $scope.filters.selectedBranchId = branchId;
        var config = {
            headers: { "CommandType": "GetMyProducts" },
            params: $scope.filters
        };
        return $http.get(endPoint + '/GetMyProducts', config);
    }
    this.getMyFilteredProductsPaging = function ($scope, $http, pageno, pageSize) {

        var config = {
            headers: { "CommandType": "GetMyFilteredProductsPaging" },
            params: {
                selectedCategory: $scope.filters.selectedCategory,
                selectedSubCategory: $scope.filters.selectedSubCategory,
                selectedBranchId: $scope.filters.selectedBranchId,
                storeId: $scope.RetailerInfo.StoreId,
                pageNo: pageno,
                selectedBrand: $scope.filters.selectedBrand,
                PageSize: pageSize
            }
        };
        return $http.get(endPoint + '/GetMyFilteredProductsPaging', config);
    }

    this.getRetailerInfo = function ($http) {
        var config = {
            headers: { "CommandType": "GetRetailerInfo" },
        };
        return $http.get(endPoint + '/GetRetailerInfo', config);
    }

    this.includeProduct = function ($scope, $http, includeproductPricing) {

        var config = {
            headers: { "CommandType": "IncludeProducts" }
        };
        return $http.post(endPoint + '/IncludeProducts', includeproductPricing, config);
    }

    this.createProduct = function ($scope, $http, newProduct) {
        var config = {
            headers: { "CommandType": "IncludeProducts" }
        };
        return $http.post(endPoint + '/CreateProduct', newProduct, config);
    }

    this.updatePrice = function ($scope, $http, productPricing) {

        productPricing.StoreId = $scope.RetailerInfo.StoreId
        productPricing.BranchIdList = [];
        productPricing.BranchIdList.push($scope.filters.selectedBranchId);
        var config = {
            headers: { "CommandType": "UpdateProductPrice" }
        };
        return $http.post(endPoint + '/UpdateProductPrice', productPricing, config);
    }
    this.removeProduct = function ($scope, $http, product) {
        product.StoreId = $scope.RetailerInfo.StoreId
        product.BranchIdList = [];
        product.BranchIdList.push($scope.filters.selectedBranchId);
        var config = {
            headers: { "CommandType": "RemoveProduct" }
        };
        return $http.post(endPoint + '/RemoveProduct', product, config);
    }

    this.resumeProduct = function ($scope, $http, product) {
        product.StoreId = $scope.RetailerInfo.StoreId
        product.BranchIdList = [];
        product.BranchIdList.push($scope.filters.selectedBranchId);
        var config = {
            headers: { "CommandType": "ResumeProduct" }
        };
        return $http.post(endPoint + '/ResumeProduct', product, config);
    }
    this.getMyDetails = function ($scope, $http, userName) {

        var config = {
            params: { username: userName }
        };
        return $http.get(endPoint + '/GetMyDetails', config);
    }

    this.getInbox = function ($scope, $http, branchId) {

        var config = {
            params: { storeId: branchId }
        };
        return $http.get(endPoint + '/GetSellerInbox', config);
    }

    this.InboxReply = function ($scope, $http, mailId, reply) {
        var config = {
            params: { mailId: mailId, reply: reply }
        };
        return $http.get(endPoint + '/InboxReply', config);
    }

    this.getStoreDetails = function ($scope, $http, userName, branchId) {
        var config = {
            params: { username: userName, branchId: branchId },
            headers: { "CommandType": "UpdateFilterParameters" }
        };
        return $http.get(endPoint + '/GetStoreDetails', config);
    }

    this.updateBranchDetails = function ($scope, $http, userName, branch) {
        var branchModel = { branch: branch, userName: userName }
        var config = {
            headers: { "CommandType": "UpdateBranchDetails" }
        };

        return $http.post(endPoint + '/UpdateBranchDetails/', branchModel, config);
    }

    this.createNewBranch = function ($scope, $http, userName, branch) {
        branch.BranchId = 0;
        var branchModel = { branch: branch, userName: userName }
        var config = {
            headers: { "CommandType": "CreateNewBranch" }
        };

        return $http.post(endPoint + '/CreateNewBranch/', branchModel, config);
    }
});