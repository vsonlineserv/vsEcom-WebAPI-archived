////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.controller('LoginController', ['$rootScope', '$scope', '$http', '$cookieStore', '$location',
    'authService', 'userActionService', 'passwordService', 'localStorageService', 'Facebook', 'cartService',
function ($rootScope, $scope, $http, $cookieStore, $location, authService, userActionService, passwordService,localStorageService, Facebook, cartService) {

    $scope.savedSuccessfully = false;
    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";
    $scope.curUser = {};
    $scope.googleAuthToken = "";
    $scope.googleUser = {};

 
    $scope.Login = function () {
        authService.login($scope.loginData).then(function (response) {
            $rootScope.flagLoggedIn = true;
            $rootScope.userName = $scope.loginData.userName;
            $rootScope.curUserDisplayName = '';          
          
            loadUserDefaults();
            if ($location.path() == "/Login" || $location.path() == "/Register") {
                $location.path('/Home');
            }
            $('#modal-container-Register').modal('hide');            
        },
         function (err) {
             $scope.message = err.error_description;
             $rootScope.flagLoggedIn = false;
             ClearCookieStore();
         });
    };

    function loadUserDefaults() {

        if ($rootScope.userName && $rootScope.userName.length > 0) {
            userActionService.getUserWishlist($scope, $http, $rootScope.userName)
            .then(function (response) {
                $rootScope.wishlistCount = response.data.length;
                $rootScope.wishlist = response.data;
            });

            userActionService.getMyDetails($scope, $http, $rootScope.userName)
            .then(function (response) {
                $scope.curUser.Email = response.data.Email;
                $scope.curUser.PhoneNumber1 = response.data.PhoneNumber1;
                $scope.curUser.FirstName = response.data.FirstName;
                $scope.curUser.LastName = response.data.LastName;
                $rootScope.curUserDisplayName = response.data.FirstName;

                if (response.data.Email) {
                    localStorageService.set('flagLoggedIn', $rootScope.flagLoggedIn);
                    localStorageService.set('userName', $scope.userName);
                    localStorageService.set('curUserDisplayName', $rootScope.curUserDisplayName);
                }
            });

            if ($rootScope.cartlist.length > 0)
            {
                cartService.addShoppingCartItemList($http, $rootScope.cartlist, $rootScope.userName)
                .then(function (response) {
                    GetShoppingCartItems();
                });
            }
            else
            {
                GetShoppingCartItems();
            }

            function GetShoppingCartItems() {
                cartService.getShoppingCartItems($http, $rootScope.userName)
                  .then(function (response) {
                      if (response.data.length > 0) {
                          $rootScope.cartlist = [];

                          for (var i = 0; i < response.data.length; i++) {
                              var addtoCartProduct = CreateCartListProductObjectFromList(response.data[i]);

                              $rootScope.cartlist.push(addtoCartProduct);
                          }
                          if ($rootScope.cartlist.length > 0) {
                              localStorageService.set('cartlist', $rootScope.cartlist);
                          }
                          else {
                              $rootScope.cartlist = localStorageService.get('cartlist') || [];
                          }
                      }
                      CalculateCartTotal()
                  });
            }
            
        function CalculateCartTotal() {
            $rootScope.cartTotal = 0;
            $scope.totalShipping = 0;
            for (var i = 0; i < $rootScope.cartlist.length; i++) {
                $rootScope.cartTotal = $rootScope.cartTotal + $rootScope.cartlist[i].SubTotal;
                $scope.totalShipping = $scope.totalShipping + $rootScope.cartlist[i].TotalAdditionalShippingCharge;
            }
            localStorageService.set('cartlist', $rootScope.cartlist);
        }
            var CreateCartListProductObjectFromList = function (product) {
                if(product.ProductId>0)
                    
                    var cart = {};
                cart.ProductId = product.ProductId;
                cart.Name = product.Name;
                cart.PictureName = product.PictureName;
                cart.SpecialPrice = product.SpecialPrice;
                cart.Price = product.Price;
                cart.Branch = product.Branch;
                cart.BranchId = product.BranchId;
                cart.StoresCount = product.StoresCount;
                cart.FlagWishlist = product.FlagWishlist;
                cart.Quantity = product.Quantity;
                cart.SelectedSize = product.selectedSize;

                cart.AdditionalShippingCharge = product.AdditionalShippingCharge;
                cart.TotalAdditionalShippingCharge = product.AdditionalShippingCharge * cart.Quantity;

                cart.SubTotal = (cart.SpecialPrice * cart.Quantity);
                cart.SubTotalWithShipping = (cart.SpecialPrice * cart.Quantity) + cart.TotalAdditionalShippingCharge;
                return cart;
            }
            
        }
    }

    function ClearCookieStore()
    {
        localStorageService.remove('userName');
        localStorageService.remove('flagLoggedIn');
        localStorageService.remove('curUserDisplayName');
    }


    $scope.RegisterUser = function () {
        var userDTO =
          {
              FirstName: $scope.user.FirstName,
              Email: $scope.user.Email,
              Password: $scope.user.Password,
              ConfirmPassword: $scope.user.ConfirmPassword,
              PhoneNumber1: $scope.user.PhoneNumber1

          }
        if (!userDTO.FirstName)
        {
            userDTO.FirstName = $scope.user.Email;

        }
        RegiterNewUser(userDTO);
    }

    function RegiterNewUser(userDTO) {
        userActionService.RegisterUser($scope, $http, userDTO)
                    .then(function (response) {

                        $scope.savedSuccessfully = true;
                        $scope.message = "User has been registered successfully.";
                        //Please click the verification link in the email to activate your account

                        //Temporary for checkout
                        $scope.loginData.userName = userDTO.Email;
                        $scope.loginData.password = userDTO.Password;
                        $scope.Login();

                    },
                     function (response) {
                         var errors = [];
                         for (var key in response.data.ModelState) {
                             for (var i = 0; i < response.data.ModelState[key].length; i++) {
                                 errors.push(response.data.ModelState[key][i]);
                             }
                         }
                         $scope.message = "Failed to register user due to:" + errors.join(' ');
                     });

    }

    $scope.facebookLoginStatus = 'disconnected';
    $scope.facebookIsReady = false;

    $scope.connectUsingFacebook = function () {

        Facebook.login(function (response) {           
            if (response.authResponse.accessToken) {
                var userDetails = getFacebookUserDetails(response.authResponse.accessToken);
                $scope.facebookLoginStatus = response.status;
            }

        }, { scope: 'email,public_profile' });


    };

    function getFacebookUserDetails(accessToken) {
        Facebook.api('/me', function (response) {
            $scope.facebookUser = response;
            loginWithFacebook(accessToken)
        });
    }

    function getGooglePlusUserDetails(accessToken) {
        if (gapi.client) {
            gapi.client.request(
            {
                'path': '/plus/v1/people/me',
                'method': 'GET',
                'callback': $scope.userInfoCallback
            });
        }
    };

    $scope.processGoogleUserInfo = function (userInfo) {
        if (userInfo && !userInfo.error) {
            $scope.googleUser.email = userInfo.emails[0].value
            $rootScope.curUserDisplayName = userInfo.displayName;          
        }
        loginWithGoogle();
    }

    // When callback is received, process user info.
    $scope.userInfoCallback = function (userInfo) {
        $scope.$apply(function () {
            $scope.processGoogleUserInfo(userInfo);            
        });
    };

    function loginWithFacebook(accessToken) {
        if ($scope.facebookUser.email) {
            authService.loginWithFacebook(accessToken, $scope.facebookUser.email).then(function (response) {
                $rootScope.flagLoggedIn = true;
                $rootScope.userName = $scope.facebookUser.email;
                $rootScope.curUserDisplayName = $scope.facebookUser.name;
                loadUserDefaults();
                if ($location.path()) {
                    $location.path('/Home');
                }
                $('#modal-container-Register').modal('hide');
            },
         function (err) {
             $scope.message = err.error_description;
             $rootScope.flagLoggedIn = false;
             ClearCookieStore();
         });
        }
    }
    
    function loginWithGoogle() {
        if ($scope.googleUser.email) {
            authService.loginWithGoogle($scope.googleAuthToken, $scope.googleUser.email, $scope.expires_in, $scope.expires_at, $scope.token_type, $scope.issued_at).then(function (response) {
                $rootScope.flagLoggedIn = true;
                $rootScope.userName = $scope.googleUser.email;
                $rootScope.curUserDisplayName = $scope.googleUser.name;
              
                loadUserDefaults();
                if ($location.path()) {
                    $location.path('/Home');
                }
                $('#modal-container-Register').modal('hide');
            },
         function (err) {
             $scope.message = err.error_description;
             $rootScope.flagLoggedIn = false;
             ClearCookieStore();
         });
        }
    }

    $scope.connectUsingGoogle = function () {

        if (gapi.client) {
            gapi.client.request(
            {
                'path': '/plus/v1/people/me',
                'method': 'GET',
                'callback': $scope.userInfoCallback
            });
        }
            // Some default values, based on prior versions of this directive
            var defaults = {
                callback: 'signinCallback',
                cookiepolicy: 'single_host_origin',
                requestvisibleactions: 'http://schemas.google.com/AddActivity',
                scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                width: 'wide',
            };

        //  defaults.clientid = "226533752513-7nuvqh2afhl1ku8krc61pn0eanrlk0tg.apps.googleusercontent.com";
            defaults.clientid = "226533752513-k9omq9rlq9abj7dp363rmctoe736j4o8.apps.googleusercontent.com";

            //// Asynchronously load the G+ SDK.

            var element = document.getElementById("scriptNewGoogle");
            if (element) {
                element.parentNode.removeChild(element);
            }

            var po = document.createElement('script'); po.id = 'scriptNewGoogle'; po.type = 'text/javascript'; po.async = true;
            po.src = 'https://apis.google.com/js/client:plusone.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);

    
            gapi.signin.render('registerusingGoogle', defaults);
        
    }


    $scope.removeFacebookAuth = function () {
        Facebook.api({
            method: 'Auth.revokeAuthorization'
        }, function (response) {
            Facebook.getLoginStatus(function (response) {
                $scope.facebookLoginStatus = response.status;
            });
        });
    };

    $scope.$on('event:google-plus-signin-success', function (event, authResult) {
         
        if (authResult['access_token']) {
            getGooglePlusUserDetails(authResult['access_token']);
            $scope.googleAuthToken = authResult['access_token'];
            $scope.expires_in = authResult['expires_in'];
            $scope.expires_at = authResult['expires_at'];
            $scope.token_type = authResult['token_type'];
            $scope.issued_at = authResult['issued_at'];            
            
        }


    });
    $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
        // Auth failure or signout detected
    });

    $scope.$watch(function () {
        return Facebook.isReady();
    }, function (newVal) {
        if (newVal) {
            $scope.facebookIsReady = true;
        }
    }
    );


    $scope.SendForgetPassword = function () {
        passwordService.forgotPassword($scope, $http, $scope.Email)
         .then(function (response) {
             if (response.data == false) {
                 $scope.message = 'Sorry. Unable to identify user. Please verify provided email id'
                 $scope.successfullySent = false
             }
             else {
                 $scope.message = 'A link has been sent to your mail to reset the password'
                 $scope.successfullySent = true;
             }
         });
    };


}]);

app.controller('ChangePasswordController', ['$rootScope', '$scope', '$http', '$routeParams', 'passwordService',
function ($rootScope, $scope, $http, $routeParams, passwordService) {
    {
        $scope.message = '';
        $scope.user = {};
        $scope.user.userName = $rootScope.userName;
        $scope.ChangePassword = function () {
            $scope.message = '';
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
        }
    }
}]);

app.controller('MyAccountController', ['$rootScope', '$scope', '$http', '$routeParams', 'authService', 'userActionService',
function ($rootScope, $scope, $http, $routeParams, authService, userActionService) {
    {
        $scope.user = {};
        $scope.user.userName = $rootScope.userName;

        InitializeMyDetails();

        function InitializeMyDetails() {
            userActionService.getMyDetails($scope, $http, $scope.user.userName)
                .then(function (response) {
                    $scope.user.Email = response.data.Email;
                    $scope.user.PhoneNumber1 = response.data.PhoneNumber1;
                    $scope.user.FirstName = response.data.FirstName;
                    $scope.user.LastName = response.data.LastName;

                });
        }
    }
}]);