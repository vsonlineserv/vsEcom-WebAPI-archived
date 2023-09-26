////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
 

app.controller('CartController', ['$scope', '$location', '$http', '$rootScope', '$routeParams', 'localStorageService', '$timeout', 'cartService', 
    function ($scope, $location, $http, $rootScope, $routeParams, localStorageService, $timeout, cartService) {


        $scope.message = '';
        $scope.totalShipping = 0;

        InitializeCart();

        function InitializeCart()
        {
            CalculateCartTotal();
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

        $scope.incrementProductQuantity = function (product) {
         //   if (parseInt(product.Quantity) < 12) {
                for (var i = 0; i < $rootScope.cartlist.length; i++) {
                    if ($rootScope.cartlist[i].ProductId == product.ProductId) {
                        $rootScope.cartlist[i].Quantity = ($rootScope.cartlist[i].Quantity * 1) + 1;

                        $rootScope.cartlist[i].TotalAdditionalShippingCharge = $rootScope.cartlist[i].AdditionalShippingCharge * $rootScope.cartlist[i].Quantity;

                        $rootScope.cartlist[i].SubTotal = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity);
                        $rootScope.cartlist[i].SubTotalWithShipping = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity) + $rootScope.cartlist[i].TotalAdditionalShippingCharge;
                        
                        cartService.updateCartItemQuantity($http, $rootScope.cartlist[i], $rootScope.userName);
                    }
           //     }
            }
            CalculateCartTotal();
        }

        $scope.decrementProductQuantity = function (product) {
            //if (parseInt(product.Quantity) < 13) {
                for (var i = 0; i < $rootScope.cartlist.length; i++) {
                    if ($rootScope.cartlist[i].ProductId == product.ProductId) {
                        if ($rootScope.cartlist[i].Quantity > 1) {
                            $rootScope.cartlist[i].Quantity = ($rootScope.cartlist[i].Quantity * 1) - 1;
                            
                            $rootScope.cartlist[i].TotalAdditionalShippingCharge = $rootScope.cartlist[i].AdditionalShippingCharge * $rootScope.cartlist[i].Quantity;
                            $rootScope.cartlist[i].SubTotal = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity);
                            $rootScope.cartlist[i].SubTotalWithShipping = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity) + $rootScope.cartlist[i].TotalAdditionalShippingCharge;

                            cartService.updateCartItemQuantity($http, $rootScope.cartlist[i], $rootScope.userName)
                        }
                    }
               // }
                CalculateCartTotal();
            }
        }

        $scope.qtyChanged = function(product) 
        {
            if (product.Quantity < 1 || product.Quantity >100 || !product.Quantity)
            {
                product.Quantity = 1;
            }
            setTimeout(function () {
                for (var i = 0; i < $rootScope.cartlist.length; i++) {
                    if ($rootScope.cartlist[i].ProductId == product.ProductId) {
                        $rootScope.cartlist[i].Quantity = parseInt(product.Quantity);
                        $rootScope.cartlist[i].TotalAdditionalShippingCharge = $rootScope.cartlist[i].AdditionalShippingCharge * $rootScope.cartlist[i].Quantity;
                        $rootScope.cartlist[i].SubTotal = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity)
                        $rootScope.cartlist[i].SubTotalWithShipping = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity) + $rootScope.cartlist[i].TotalAdditionalShippingCharge;

                        cartService.updateCartItemQuantity($http, $rootScope.cartlist[i], $rootScope.userName);
                    }
                }
                CalculateCartTotal();
            }, 0);           
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
                }
                localStorageService.set('cartlist', $rootScope.cartlist);
            }
            CalculateCartTotal();
            event.stopPropagation();
        }
         
    }]);

