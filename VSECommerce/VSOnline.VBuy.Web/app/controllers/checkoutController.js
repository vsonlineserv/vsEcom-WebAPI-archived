////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.controller('CheckoutController', ['$scope', '$location', '$http', '$rootScope', '$routeParams', '$cookieStore', 'localStorageService', '$window', 'userActionService', 'cartService',
function ($scope, $location, $http, $rootScope, $routeParams, $cookieStore, localStorageService, $window, userActionService, cartService) {


    $scope.message = '';
    $scope.passwordCheckbox = false;
    $scope.checkoutAddress = false;
    $scope.buyerAddress = {};
    $scope.couponCode = '';
    $scope.orderDiscount = 0;
    $scope.netPayable = 0;
    $scope.totalShipping = 0;


    $scope.availableReward = 0;
    $scope.rewardDiscount = 0;
    $scope.useRewardPoint = 0;
    $scope.rewardError = '';
    $scope.rewardErrorFlag = false;

    var forceSSL = function () {
        if ($location.protocol() !== 'https') {
            //  $window.location.href = $location.absUrl().replace('http', 'https');
        }
    };
    forceSSL();
    InitializeCheckout();
    function InitializeCheckout() {
        CalculateCartTotal();
        GetBuyerAddress();
        GetReward();
    }

    function GetBuyerAddress() {
        cartService.getBuyerAddress($http, $scope.userName).then(function (response) {
            $scope.buyerAddress = response.data;
        });
    }

    function GetReward() {
        cartService.getReward($http, $scope.userName).then(function (response) {
            $scope.availableReward = response.data;
        });
    }

    $rootScope.$watch('flagLoggedIn', function () {
        GetBuyerAddress();
    });

    $scope.onAddressTabClick = function () {
        GetBuyerAddress();
    }

    $scope.applyCoupon = function () {
        var orderDiscount = 0;

        cartService.getCartDiscount($http, $rootScope.cartlist, $rootScope.userName, $scope.couponCode)
         .then(function (response) {
             $scope.orderDiscount = response.data;
         });
    }
    $scope.applyReward = function () {
        var rewardDiscount = 0;
        if ($scope.useRewardPoint <= $scope.availableReward) {
            $scope.rewardError = '';
            $scope.rewardErrorFlag = false;
            cartService.getRewardDiscount($http, $scope.useRewardPoint).then(function (response) {
                $scope.rewardDiscount = response.data;
            });
        }
        else {
            $scope.rewardError = 'Invalid Reward';
            $scope.rewardErrorFlag = true;
            $scope.rewardDiscount = 0;
        }
    }


    $scope.postCartitemChangesInCheckout = function () {
        $scope.applyCoupon();
        CalculateCartTotal();
    }

    function CalculateCartTotal() {
        $rootScope.cartTotal = 0;
        $scope.totalShipping = 0;

        for (var i = 0; i < $rootScope.cartlist.length; i++) {
            $rootScope.cartTotal = $rootScope.cartTotal + $rootScope.cartlist[i].SubTotal;
            $scope.totalShipping = $scope.totalShipping + $rootScope.cartlist[i].TotalAdditionalShippingCharge;
        }
        if ($rootScope.cartTotal > 0 && $scope.orderDiscount > 0 && (($rootScope.cartTotal - $scope.orderDiscount) > 0)) {
            $scope.netPayable = (($rootScope.cartTotal - $scope.orderDiscount) + $scope.totalShipping);
        }
        localStorageService.set('cartlist', $rootScope.cartlist);
    }

    $scope.incrementProductQuantity = function (product) {
        for (var i = 0; i < $rootScope.cartlist.length; i++) {
            if ($rootScope.cartlist[i].ProductId == product.ProductId) {
                $rootScope.cartlist[i].Quantity = ($rootScope.cartlist[i].Quantity * 1) + 1;
                $rootScope.cartlist[i].TotalAdditionalShippingCharge = $rootScope.cartlist[i].AdditionalShippingCharge * $rootScope.cartlist[i].Quantity;
                $rootScope.cartlist[i].SubTotal = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity);
                $rootScope.cartlist[i].SubTotalWithShipping = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity) + $rootScope.cartlist[i].TotalAdditionalShippingCharge;

                if ($rootScope.flagLoggedIn) {
                    cartService.updateCartItemQuantity($http, $rootScope.cartlist[i], $rootScope.userName)
                    .then(function (response) {
                        $scope.postCartitemChangesInCheckout();
                        return;
                    });
                }
            }
        }
        CalculateCartTotal();
    }

    $scope.decrementProductQuantity = function (product) {

        for (var i = 0; i < $rootScope.cartlist.length; i++) {
            if ($rootScope.cartlist[i].ProductId == product.ProductId) {
                if ($rootScope.cartlist[i].Quantity > 1) {
                    $rootScope.cartlist[i].Quantity = ($rootScope.cartlist[i].Quantity * 1) - 1;
                    $rootScope.cartlist[i].TotalAdditionalShippingCharge = $rootScope.cartlist[i].AdditionalShippingCharge * $rootScope.cartlist[i].Quantity;
                    $rootScope.cartlist[i].SubTotal = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity);
                    $rootScope.cartlist[i].SubTotalWithShipping = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity) + $rootScope.cartlist[i].TotalAdditionalShippingCharge;

                    if ($rootScope.flagLoggedIn) {
                        cartService.updateCartItemQuantity($http, $rootScope.cartlist[i], $rootScope.userName)
                         .then(function (response) {
                             $scope.postCartitemChangesInCheckout();
                             return;
                         });
                    }
                }
            }
            CalculateCartTotal();
        }
    }

    $scope.qtyChanged = function (product) {
        setTimeout(function () {
            for (var i = 0; i < $rootScope.cartlist.length; i++) {
                if ($rootScope.cartlist[i].ProductId == product.ProductId) {
                    $rootScope.cartlist[i].Quantity = parseInt(product.Quantity);


                    $rootScope.cartlist[i].TotalAdditionalShippingCharge = $rootScope.cartlist[i].AdditionalShippingCharge * $rootScope.cartlist[i].Quantity;
                    $rootScope.cartlist[i].SubTotal = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity);
                    $rootScope.cartlist[i].SubTotalWithShipping = (($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity) + $rootScope.cartlist[i].TotalAdditionalShippingCharge)
                    if ($rootScope.flagLoggedIn) {
                        cartService.updateCartItemQuantity($http, $rootScope.cartlist[i], $rootScope.userName)
                          .then(function (response) {
                              $scope.postCartitemChangesInCheckout();
                              return;
                          });
                    }
                }
            }
            CalculateCartTotal();
        }, 0);
    }

    $scope.addBuyerAddress = function () {
        cartService.addBuyerAddress($http, $scope.buyerAddress, $scope.userName).then(function (response) {
            $scope.buyerAddress = response.data;
            $scope.tab = 'paymentTab';
        });
    }

    $scope.removeProductFromCart = function (product) {
        var removeElement = -1;
        for (var i = 0; i < $rootScope.cartlist.length; i++) {
            if ($rootScope.cartlist[i].ProductId == product.ProductId) {
                removeElement = i;
            }
        }
        if (removeElement > -1) {
            var removedcartItem = $rootScope.cartlist.splice(removeElement, 1);
            if (removedcartItem.length > 0 && $rootScope.flagLoggedIn) {
                cartService.removeShoppingCartItem($http, removedcartItem[0], $rootScope.userName)
                .then(function (response) {
                    $scope.postCartitemChangesInCheckout();
                    return;
                });
            }
        }
        CalculateCartTotal();
        event.stopPropagation();
    }

    $scope.confirmOrder = function () {
        cartService.generateOrder($http, $rootScope.cartlist, $scope.userName, $scope.paymentOption, $scope.deliveryOption, $scope.couponCode)
            .then(function (response) {
                $rootScope.cartlist = {};
                $rootScope.cartTotal = 0;
                if (response.data > 0 || response.data.length > 25) {
                    localStorageService.remove('cartlist');

                    //Added vignesh
                    cartService.getUseMyReward($http, $scope.userName, $scope.availableReward, $scope.useRewardPoint).then(function (response) {
                        //Result after reward used
                    });

                }
                if (response.data.length > 25) {
                    //if payment gateway
                    document.write(response.data);
                    $("#payuForm").submit();
                }
                else {
                    $location.path('/confirmOrder/' + response.data);
                }

            });
    }

}]);


app.controller('OrderConfirmationController', ['$scope', '$location', '$http', '$rootScope', '$routeParams', 'cartService',
function ($scope, $location, $http, $rootScope, $routeParams, cartService) {

    $scope.message = '';
    $scope.orderConfirmation = {};
    $scope.orderConfirmationDate = '';

    InitializeOrderConfirmation();
    function InitializeOrderConfirmation() {

        cartService.getOrderConfirmationDetails($http, $routeParams.orderId, $rootScope.userName)
                   .then(function (response) {
                       if (response.data) {
                           $scope.orderConfirmation = response.data;
                           // $scope.orderConfirmationDate = new Date(($scope.orderConfirmation.OrderDetails.OrderDateUtc) + (3600000 * 5.5));

                           var IST = new Date($scope.orderConfirmation.OrderDetails.OrderDateUtc + 'Z'); // Clone UTC Timestamp
                           //IST.setHours(IST.getHours() + 5); // set Hours to 5 hours later
                           //IST.setMinutes(IST.getMinutes() + 30);
                           $scope.orderConfirmationDate = IST;
                       }
                   });
    }

}]);


app.controller('OrderConfirmationFailureController', ['$scope', '$location', '$http', '$rootScope', '$routeParams', 'cartService',
function ($scope, $location, $http, $rootScope, $routeParams, cartService) {

    $scope.message = '';
    $scope.orderConfirmation = {};

    InitializeOrderConfirmation();
    function InitializeOrderConfirmation() {
        cartService.getOrderConfirmationDetails($http, $routeParams.orderId, $rootScope.userName)
                   .then(function (response) {
                       if (response.data) {
                           $scope.orderConfirmation = response.data;
                       }
                   });
    }

    $scope.onReinitiatePayment = function () {
        cartService.initiatePaymentForOrder($http, $rootScope.userName, scope.orderConfirmation.OrderDetails.Id)
               .then(function (response) {
                   if (response.data.length > 25) {
                       //if payment gateway
                       document.write(response.data);
                       $("#payuForm").submit();
                   }
               });
    }

}]);

app.controller('OrderConfirmationPayController', ['$scope', '$location', '$http', '$rootScope', '$routeParams', 'cartService',
function ($scope, $location, $http, $rootScope, $routeParams, cartService) {


    var x = document.forms.length;
    if (x > 1) {
        var y = document.forms[0].id
        var form = document.getElementById(y).serialize();
    }



}]);
