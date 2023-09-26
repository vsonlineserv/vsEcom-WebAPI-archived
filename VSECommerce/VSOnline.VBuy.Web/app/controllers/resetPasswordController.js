////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.controller('ResetPasswordController', ['$scope', '$location', '$http', '$rootScope', '$routeParams', 'passwordService',
    function ($scope, $location, $http, $rootScope, $routeParams, passwordService) {


        $scope.message = '';

        InitializeResetPassword();

        function InitializeResetPassword()
        {
            $scope.uid = $routeParams.uid;
            $scope.username = $routeParams.username;
        }


        $scope.ResetPassword = function () {
            $scope.message = '';
            if ($scope.user.Password === $scope.user.ConfirmPassword) {
                passwordService.resetPassword($scope, $http, $scope.username, $scope.user.Password)
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
        }
    }]);

