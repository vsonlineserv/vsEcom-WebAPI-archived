 ////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
 app_retailer.controller('LoginController', ['$scope', '$cookieStore', '$location', '$rootScope', 'authService',
    function ($scope, $cookieStore, $location, $rootScope, authService) {

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

 
    $scope.Login = function () {
        authService.login($scope.loginData).then(function (response) {
            $rootScope.flagLoggedIn = true;
            $rootScope.userName = $scope.loginData.userName;
            $cookieStore.put('userName', $rootScope.userName);
            $cookieStore.put('flagLoggedIn', $rootScope.flagLoggedIn);

            $rootScope.curUserDisplayName = $scope.loginData.userName; 
            $cookieStore.put('curUserDisplayName', $rootScope.curUserDisplayName);

            $location.path('/Dashboard');
        },
         function (err) {
             $scope.message = err.error_description;
             $rootScope.flagLoggedIn = false;
             ClearCookieStore();
         });
    };

    function ClearCookieStore() {
        $cookieStore.remove('userName');
        $cookieStore.remove('flagLoggedIn');
        $cookieStore.remove('curUserDisplayName');
    }

    $scope.ChangePassword = function () {
        $scope.message = '';
        $scope.user = {};
        $scope.user.userName = $rootScope.userName;

        if ($scope.user.NewPassword === $scope.user.ConfirmPassword) {
            passwordService.changePassword($scope, $http, $scope.user.userName, $scope.user.CurrentPassword, $scope.user.NewPassword)
                .then(function (response) {

                    if (response.data == true) {
                        $scope.savedSuccessfully = true;
                        $scope.message = "Password has been changed Successfully."
                    }
                    else {
                        $scope.savedSuccessfully = false;
                        $scope.message = "Error in updating Password"
                    }

                },
            function (err) {
                $scope.message = err.error_description;
            });
        }
        else {
            $scope.savedSuccessfully = false;
            $scope.message = "Password mismatch"
        }
    };
}]);

