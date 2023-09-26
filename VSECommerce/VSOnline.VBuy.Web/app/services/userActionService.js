////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.service('userActionService', function () {

    var endPoint = 'http://localhost:49475/api/UserAction';
    var endPointUserRegister = 'http://localhost:49475/api/Login';

    this.getUserWishlist = function ($scope, $http, userName) {
        var config = {
            params: { userName: userName }
        };
        return $http.get(endPoint + '/GetUserWishlist/', config);
    }

    this.getUserWishlistCount = function ($scope, $http, userName) {
        var config = {
            params: { userName: userName }
        };
        return $http.get(endPoint + '/GetUserWishlistCount/', config);
    }

    this.addUserWishlist = function ($scope, $http, userName, productId) {
        var config = {
            params: { userName: userName, productId: productId }
        };
        return $http.get(endPoint + '/AddUserWishList/', config);
    }

    this.removeUserWishlist = function ($scope, $http, userName, productId) {
        var config = {
            params: { userName: userName, productId: productId }
        };
        return $http.get(endPoint + '/RemoveUserWishList/', config);
    }

    this.RegisterUser = function ($scope, $http, userDTO) {

        var config = {
            headers: { "CommandType": "RegisterUser" }
        };
        return $http.post(endPointUserRegister + '/RegisterUser', userDTO, config)
            .then(function (response) {
                return response;
            });
    }

    this.getMyDetails = function ($scope, $http, userName) {

        var config = {
            params: { username: userName }
        };
        return $http.get(endPointUserRegister + '/GetMyDetails', config);
    }
});