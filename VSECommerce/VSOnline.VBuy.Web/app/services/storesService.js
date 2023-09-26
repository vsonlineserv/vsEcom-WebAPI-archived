 ////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
 app.service('storesService', function () {

     //var endPoint = '/VSECommerce/api/Stores';
     var endPoint = 'http://localhost:49475/api/Stores';

    this.getStoreInfo = function ($http, storeId)
    {

        return $http.get(endPoint + '/GetStoreInfo/' + storeId);
    }   

    this.getFilter = function ($http, storeId, productId) {
        var config = {
            params: { storeId: storeId, productId: productId }
        };
        return $http.get(endPoint + '/GetStoresProductFilter', config);
    }

    this.getStoreProducts = function ($scope, $http) {
        $scope.filters.storeId = $scope.StoreInfo.StoreId;
        $scope.filters.selectedBranchId = $scope.selectedBranchId
        var config = {
            params: $scope.filters
        };
        return $http.get(endPoint + '/GetStoreProducts', config);
    }

    this.getRatings = function ($scope, $http, branchId) {
        var config = {
            params: { branchId: branchId }
        };
        return $http.get(endPoint + '/GetBranchRating/', config);
    }

    this.updateRatings = function ($scope, $http, userName, branchId, rating) {
        var config = {
            params: { branchId: branchId, rating: rating, userName: userName }
        };
        return $http.get(endPoint + '/UpdateBranchRating/', config);
    }
});