////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app_admin.service('adminService', function () {

    var endPointLanding = 'http://localhost:49475/api/Landing';
    var endPoint = 'http://localhost:49475/api/Admin';

    //var endPointLanding = 'http://localhost:49475/api/Landing';
    //var endPoint = 'http://localhost:49475/api/Admin';

    this.getAppData = function ($http) {
        var config = {
            headers: { "CommandType": "GetApplicationData" }
        };
        return $http.get(endPointLanding + '/GetApplicationData', config)
            .then(function (response) {
                return response;
            });

    }

    this.getTopCategory = function ($http) {
        var config = {
            headers: { "CommandType": "GetTopCategory" }
        };
        return $http.get(endPoint + '/GetTopCategory', config)
            .then(function (response) {
                return response;
            });
    }

    this.getShowHomePageCategory = function ($http) {
        var config = {
            headers: { "CommandType": "GetShowHomePageCategory" }
        };
        return $http.get(endPoint + '/GetShowHomePageCategory', config)
            .then(function (response) {
                return response;
            });
    }

    this.showCategoryInHomePage = function ($http, categoryId, flagShow) {
        var config = {
            params: { categoryId: categoryId, flagShow: flagShow },
            headers: { "CommandType": "ShowCategoryInHomePage" }
        };
        return $http.get(endPoint + '/ShowCategoryInHomePage', config)
            .then(function (response) {
                return response;
            });
    }

    this.removeCache = function ($http) {
        var config = {
            headers: { "CommandType": "RemoveCache" }
        };
        return $http.get(endPoint + '/RemoveCache', config)
           .then(function (response) {
               return response;
           });
    }

    this.loadProductIndex = function ($http) {
        var config = {
            headers: { "CommandType": "LoadProductIndex" }
        };
        return $http.get(endPoint + '/LoadProductIndex', config)
           .then(function (response) {
               return response;
           });
    }

    this.getSiteSettings = function ($http) {
        var config = {
            headers: { "CommandType": "GetSiteSettings" }
        };
        return $http.get(endPoint + '/GetSiteSettings', config)
           .then(function (response) {
               return response;
           });
    }

    this.updateSettings = function ($http, SiteKey, Value) {
        var config = {
            params: { siteKey: SiteKey, value: Value },
            headers: { "CommandType": "UpdateSiteSettings" }
        };
        return $http.get(endPoint + '/UpdateSiteSettings', config)
           .then(function (response) {
               return response;
           });
    }
});