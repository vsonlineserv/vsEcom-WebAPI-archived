////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app_retailer.service('retailerServiceNew', function () {

    var endPointLanding = 'http://localhost:49475/api/Landing';
    var endPoint = 'http://localhost:49475/api/Login';

    this.RegisterRetailer = function ($scope, $http, retailerDTO) {

        var config = {
            headers: { "CommandType": "RegisterRetailer" }
        };
        return $http.post(endPoint + '/RegisterRetailer', retailerDTO, config)
            .then(function (response) {
                return response;
            });
    }

    this.getAppData = function ($http) {
        var config = {
            headers: { "CommandType": "GetApplicationData" }
        };
        return $http.get(endPointLanding + '/GetApplicationData', config)
            .then(function (response) {
                return response;
            });

    }
});