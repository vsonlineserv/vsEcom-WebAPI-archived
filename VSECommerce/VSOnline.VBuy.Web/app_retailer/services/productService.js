 ////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app_retailer.service('productService', function () {

    var endPoint = '/VSECommerce/api/Products';
    var updateProductEndPoint = '/VSECommerce/api/UpdateProducts';
    var endPointRetailer = 'http://localhost:49475/api/Retailer';

    this.getProductSpecification = function ($scope, $http, productId) {
        var config = {
            params: { productId: productId }
        };
        return $http.get(endPointRetailer + '/GetProductSpecification/', config);
    }

    this.getProductKeyFeatures = function ($scope, $http, productId) {
        var config = {
            params: { productId: productId }
        };
        return $http.get(endPointRetailer + '/GetProductKeyFeatures/', config);
    }

    this.getProductFilterValues = function ($scope, $http, productId) {
        var config = {
            params: { productId: productId }
        };
        return $http.get(endPointRetailer + '/GetProductFilterValues/', config);
    }

    this.getFiltersForProductCategory = function ($scope, $http, productId) {
        var config = {
            params: { productId: productId }
        };
        return $http.get(endPointRetailer + '/GetFiltersForProductCategory/', config);
    }

    this.updateProductSpecifications = function ($scope, $http, productId, productFilters, productKeyFeatures, productSpecifications ) {
        var productSpecifications = {
            productFilters: productFilters,
            productKeyFeatures: productKeyFeatures,
            productSpecifications: productSpecifications        
        };
        var config = {
            headers: { "CommandType": "UpdateProductSpecifications" }
        };
        return $http.post(endPointRetailer + '/UpdateProductSpecifications/', productSpecifications, config);
    }

    this.getProductById = function ($scope, $http, productId) {
        var config = {
            params: { id: productId}
        };
        return $http.get(endPointRetailer + '/GetProductById/', config);
    }

    this.updateProduct = function ($scope, $http, product) {         
        var config = {
            headers: { "CommandType": "UpdateProduct" }
        };
        return $http.post(endPointRetailer + '/UpdateProduct', product, config);
    }

    this.updateProductSeo = function ($scope, $http, product) {
        var config = {
            headers: { "CommandType": "UpdateProductSEO" }
        };
        return $http.post(endPointRetailer + '/UpdateProductSEO', product, config);
    }
    
});