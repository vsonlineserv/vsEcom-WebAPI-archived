 ////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
 app_admin.service('adminProductService', function () {

     var endPointCategory = 'http://localhost:49475/api/AdminCategory';

    this.getParentCategory = function ($http) {

        var config = {
            headers: { "CommandType": "GetParentCategory" },

        };
        return $http.get(endPointCategory + '/GetParentCategory', config);
    }

    this.insertCategory = function ($scope, $http, newCategory) {
        var config = {
            headers: { "CommandType": "AddNewCategory" }
        };
        return $http.post(endPointCategory + '/AddNewCategory', newCategory, config);
    }

    this.getCategory = function ($scope, $http) {

        var config = {
            params: { categoryId: $scope.categoryId }
        };
        return $http.get(endPointCategory + '/GetCategoryDetails', config);
    }

    this.getCategoryFilters = function ($scope, $http) {

        var config = {
            params: { categoryId: $scope.categoryId }
        };
        return $http.get(endPointCategory + '/getCategoryFilters', config);
    }

    this.updateFilterParameters = function ($scope, $http, categoryId, filterRows) {
        var config = {
            headers: { "CommandType": "UpdateFilterParameters" }
        };
        return $http.post(endPointCategory + '/UpdateFilterParameters/', filterRows, config);
    }

});