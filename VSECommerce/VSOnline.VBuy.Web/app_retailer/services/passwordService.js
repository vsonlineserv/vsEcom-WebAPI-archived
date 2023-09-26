////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app_retailer.service('passwordService', function () {
    var endPoint = 'http://localhost:49475/api/Login';


    this.forgotPassword = function ($scope, $http, userEmail) {
        var config = {
            params: { username: userEmail }
        };

        return $http.get(endPoint + '/ForgotPassword', config);

    }
    this.resetPassword = function ($scope, $http, username, password) {
        var resetPasswordDTO = { UserName: username, UniqueId: $scope.uid, Password: password }
        var config = {
            headers: { "CommandType": "ResetPassword" }
        };

        return $http.post(endPoint + '/ResetPassword', resetPasswordDTO, config);
    }

    this.changePassword = function ($scope, $http, username, currentPassword, newPassword) {
        var changePasswordDTO = { CurrentPassword: currentPassword, UserName: username, NewPassword: newPassword }
        var config = {
            headers: { "CommandType": "ChangePassword" }
        };

        return $http.post(endPoint + '/ChangePassword', changePasswordDTO, config);
    }

});