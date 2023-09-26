 ////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.service('mapService', function () {

    var endPoint = 'http://localhost:49475/api/LocationMap';

    this.getStoreLocationsForCategory = function ($scope, $http, catId, lat, lng, mapRadius, priceRangeFrom, priceRangeTo) {
        var config = {     
            params: { id: catId, lat: lat, lng: lng, mapRadius: mapRadius }
        };
        if (priceRangeTo>0) {
            config.params["priceRangeFrom"] = priceRangeFrom;
            config.params["priceRangeTo"] = priceRangeTo;
        }
        return $http.get(endPoint + '/GetCategoryStoreLocations/', config);
    }

    this.getStoreLocationsForProduct = function ($scope, $http, productId, lat, lng,mapRadius) {
        var config = {
            headers: { "CommandType": "GetProductStoreLocations" },
            params: { id: productId, lat: lat, lng: lng, mapRadius: mapRadius }
        };
        return $http.get(endPoint + '/GetProductStoreLocations/', config);
    }

    this.getStoreLocationsForSearch = function ($scope, $http, productFilter, lat, lng, mapRadius, priceRangeFrom, priceRangeTo) {
        var config = {
            params: { productFilter: productFilter, lat: lat, lng: lng, mapRadius: mapRadius }
        };
        if (priceRangeTo > 0) {
            config.params["priceRangeFrom"] = priceRangeFrom;
            config.params["priceRangeTo"] = priceRangeTo;
        }
        return $http.get(endPoint + '/GetSearchStoreLocations/', config);
    }

    this.getStoreLocationsForWishlist = function ($scope, $http, lat, lng, mapRadius) {
        var config = {
            params: { lat: lat, lng: lng, mapRadius: mapRadius }
        };
       
        return $http.get(endPoint + '/GetWishlistStoreLocations/', config);
    }

     
});