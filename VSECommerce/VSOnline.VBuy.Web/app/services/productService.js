////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.service('productService', function () {

    var endPoint = 'http://localhost:49475/api/Products';


    this.getRatings = function ($scope, $http, productId) {
        var config = {
            params: { productId: productId }
        };
        return $http.get(endPoint + '/GetProductRating/', config);
    }

    this.updateRatings = function ($scope, $http, userName, productId, rating) {
        var config = {
            params: { productId: productId, rating: rating, userName: userName }
        };
        return $http.get(endPoint + '/UpdateProductRating/', config);
    }

    //this.getProducts = function ($scope, $http, categoryId, selectedFilter, lat, lng, mapRadius, priceRangeFrom, priceRangeTo, pageStart, pageSize) {

    //    var productParameterFilterSet = { id: categoryId, filter: selectedFilter, lat: lat, lng: lng, mapRadius: mapRadius, pageStart: pageStart, pageSize: pageSize }

    //    var config = {
    //        headers: { "CommandType": "GetProducts_N" }
    //    };

    //    if (selectedFilter) {
    //        selectedFilter.SelectedBrandIdList = [];
    //        for (i = 0; i < selectedFilter.SelectedBrandList.length; i++) {
    //            selectedFilter.SelectedBrandIdList.push(selectedFilter.SelectedBrandList[i].Id);
    //        }

    //        if (selectedFilter.SortBy && selectedFilter.SortBy.id) {
    //            selectedFilter.SortById = selectedFilter.SortBy.id;
    //        }
    //        else {
    //            selectedFilter.SortById = 0;
    //        }
    //            productParameterFilterSet["filter"] = selectedFilter;
    //    }
    //    if (priceRangeTo > 0) {
    //        productParameterFilterSet["priceRangeFrom"] = priceRangeFrom;
    //        productParameterFilterSet["priceRangeTo"] = priceRangeTo;
    //    }
    //    return $http.post(endPoint + '/GetProducts_N/', productParameterFilterSet, config);
    //}

    this.getProducts = function ($scope, $http, categoryId, selectedFilter, lat, lng, mapRadius, priceRangeFrom, priceRangeTo, pageStart, pageSize
        , productFilterListSelected) {

        var productParameterFilterSet = {
            id: categoryId, filter: selectedFilter, lat: lat, lng: lng, mapRadius: mapRadius, pageStart: pageStart, pageSize: pageSize
        , selectedProductFilter: productFilterListSelected
        }

        var config = {
            headers: { "CommandType": "GetProducts_J" }
        };

        if (selectedFilter) {
            selectedFilter.SelectedBrandIdList = [];
            for (i = 0; i < selectedFilter.SelectedBrandList.length; i++) {
                selectedFilter.SelectedBrandIdList.push(selectedFilter.SelectedBrandList[i].Id);
            }

            if (selectedFilter.SortBy && selectedFilter.SortBy.id) {
                selectedFilter.SortById = selectedFilter.SortBy.id;
            }
            else {
                selectedFilter.SortById = 0;
            }
            productParameterFilterSet["filter"] = selectedFilter;
        }
        if (priceRangeTo > 0) {
            productParameterFilterSet["priceRangeFrom"] = priceRangeFrom;
            productParameterFilterSet["priceRangeTo"] = priceRangeTo;
        }
        return $http.post(endPoint + '/GetProducts_J/', productParameterFilterSet, config);
    }

    this.getWishlistProducts = function ($scope, $http, lat, lng, mapRadius, pageStart, pageSize) {
        var config = {
            params: { lat: lat, lng: lng, mapRadius: mapRadius, pageStart: pageStart, pageSize: pageSize }
        };

        return $http.get(endPoint + '/GetUserWishlistProducts/', config);
    }

    this.getMinMaxForProductCategory = function ($scope, $http, categoryId) {
        var config = {
            params: { id: categoryId }
        };
        return $http.get(endPoint + '/GetMinMaxForProductCategory/', config);
    }

    this.getFiltersForProductCategory = function ($scope, $http, categoryId) {
        var config = {
            params: { id: categoryId }
        };
        return $http.get(endPoint + '/GetFiltersForProductCategory/', config);
    }

    this.getMinMaxForProductSearch = function ($scope, $http, productFilter) {
        var config = {
            params: { search: productFilter }
        };
        return $http.get(endPoint + '/GetMinMaxForProductSearch/', config);
    }

    this.getProductSpecification = function ($scope, $http, productId) {
        var config = {
            params: { id: productId }
        };
        return $http.get(endPoint + '/GetProductSpecification/', config);
    }

    this.getProductKeyFeatures = function ($scope, $http, productId) {
        var config = {
            params: { id: productId }
        };
        return $http.get(endPoint + '/GetProductKeyFeatures/', config);
    }

    this.searchCatalogue = function ($scope, $http, $q, productFilter, selectedFilter, lat, lng, mapRadius, priceRangeFrom, priceRangeTo, pageStart, pageSize) {
        //var config = {
        //    params: { productFilter: productFilter, lat: lat, lng: lng, mapRadius: mapRadius, pageStart: pageStart, pageSize: pageSize }
        //};
        //if (priceRangeTo > 0) {
        //    config.params["priceRangeFrom"] = priceRangeFrom;
        //    config.params["priceRangeTo"] = priceRangeTo;
        //}
        //return $http.get(endPoint + '/SearchCatalogue', config);

        var productSearchFilterSet = {
            productFilter: productFilter, filter: selectedFilter,
            lat: lat, lng: lng, mapRadius: mapRadius, pageStart: pageStart, pageSize: pageSize
        }

        var config = {
            headers: { "CommandType": "SearchCatalogue_N" }
        };

        if (selectedFilter) {
            selectedFilter.SelectedBrandIdList = [];
            for (i = 0; i < selectedFilter.SelectedBrandList.length; i++) {
                selectedFilter.SelectedBrandIdList.push(selectedFilter.SelectedBrandList[i].Id);
            }

            if (selectedFilter.SortBy && selectedFilter.SortBy.id) {
                selectedFilter.SortById = selectedFilter.SortBy.id;
            }
            else {
                selectedFilter.SortById = 0;
            }

            if (selectedFilter.SelectedBrandIdList.length > 0) {
                productSearchFilterSet["filter"] = selectedFilter;
            }
        }
        if (priceRangeTo > 0) {
            productSearchFilterSet["priceRangeFrom"] = priceRangeFrom;
            productSearchFilterSet["priceRangeTo"] = priceRangeTo;
        }

        var canceller = $q.defer();

        var cancel = function (reason) {
            canceller.resolve(reason);
        };
        var promise = $http.post(endPoint + '/SearchCatalogue_N/', productSearchFilterSet, config);

        return {
            promise: promise,
            cancel: cancel
        };
    }

    this.getProductDetails = function ($scope, $http, productId, flagLocationBased, lat, lng, mapRadius) {
        var config = {
            params: { id: productId, flaglocation: flagLocationBased, lat: lat, lng: lng, mapRadius: mapRadius }
        };
        return $http.get(endPoint + '/GetProductDetails/', config);
    }

    this.getAllOffers = function ($scope, $http, lat, lng) {
        var config = {
            params: { lat: lat, lng: lng, radius: 20 }
        };
        return $http.get(endPoint + '/GetAllOffers', config);
    }

    this.getTopOffers = function ($scope, $http, lat, lng) {
        var config = {
            params: { lat: lat, lng: lng, radius: 20, limit: 12 }
        };
        return $http.get(endPoint + '/GetTopOffers', config);
    }

    this.contactSeller = function ($scope, $http, name, email, mobile, subject, branchid, productId) {
        var productContactResultSet = { Name: name, Email: email, Mobile: mobile, Subject: subject, Branchid: branchid, ProductId: productId };
        var config = {
            headers: { "CommandType": "ContactSeller" }
        };

        return $http.post(endPoint + '/ContactSeller/', productContactResultSet, config);
    }


    this.compareProduct = function ($scope, $http, productIds) {
        var prdIds = new Array(productIds);

        var config = {
            params: { ids: prdIds.toString() }
        };

        return $http.get(endPoint + '/GetProductComparison/', config);
    }

    this.compareProductDetailedSpecification = function ($scope, $http, productIds) {
        var prdIds = new Array(productIds);

        var config = {
            params: { ids: prdIds.toString() }
        };

        return $http.get(endPoint + '/GetProductDetailedComparison/', config);
    }
});