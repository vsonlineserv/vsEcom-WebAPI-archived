app.controller('StoresController', ['$scope', '$http', '$routeParams', '$rootScope', 'localStorageService', 'storesService', 'productService','breadcrumbs',
function ($scope, $http, $routeParams, $rootScope, localStorageService, storesService, productService, breadcrumbs) {
    {
        $scope.message = "";
        $scope.filterList = {};
        $scope.products = {};
        $scope.StoreInfo = {};
        $scope.filters = {};
        $scope.branchAddress = {};
        $scope.branchRating = 0;
        $scope.contactData = {};
        $scope.contactData.message = '';
        $scope.EnableBuy = false;

        breadcrumbs.options = { 'Stores': $routeParams.friendlyUrl };

        $scope.GetProducts = function () {
            storesService.getStoreProducts($scope, $http)
             .then(function (response) {
                 $scope.products = response.data;
             },
          function (err) {
              $scope.message = err.error_description;
          });
        }

        function InitializeStores() {
            var storeId = ($routeParams.storeId) ? parseInt($routeParams.storeId) : 0;
            var branchId = ($routeParams.branchId) ? parseInt($routeParams.branchId) : 0;
            var productId = ($routeParams.productId) ? parseInt($routeParams.productId) : 0;
            $scope.EnableBuy = false;

            storesService.getStoreInfo($http, storeId)
            .then(function (response) {
                $scope.StoreInfo = response.data;
                if (branchId > 0) {
                    $scope.selectedBranchId = branchId
                    // RefreshBranchAddress();
                    $scope.EnableBuy = response.data.Branches[0].EnableBuy;
          
                    loadSellerRating();
                }
                else
                {
                    $scope.selectedBranchId = response.data.Branches[0].BranchId;
                    //  RefreshBranchAddress();
                    $scope.EnableBuy = response.data.Branches[0].EnableBuy;
                 
                    loadSellerRating();
                }
            },
         function (err) {
             $scope.message = err.error_description;
         });

            $scope.RefreshBranchAddress = function () {
                //var branchId = $scope.selectedBranchId
                //var currentBranch = $scope.StoreInfo.Branches
                //$scope.branchAddress.Address1 = "Add1";
                //$scope.branchAddress.Address2 = "";
                //$scope.branchAddress.City = "";
                //$scope.branchAddress.State = "State";
                loadSellerRating();

            }
            storesService.getFilter($http, storeId, productId)
               .then(function (response) {
                   $scope.filterList = response.data;
                   if (response.data.SelectedFilters.SelectedCategory) {
                       $scope.filters.selectedCategory = response.data.SelectedFilters.SelectedCategory;
                       $scope.filters.selectedSubCategory = response.data.SelectedFilters.SelectedSubCategory;
                   }
                   else
                   {                       
                       $scope.filters.selectedSubCategory = response.data.SubCategoryFilter[0].CategoryId;
                       $scope.filters.selectedCategory = response.data.SubCategoryFilter[0].ParentCategoryId;
                   }
                   $scope.GetProducts();
               },
            function (err) {
                $scope.message = err.error_description;
            });
        }

        function loadSellerRating() {
            storesService.getRatings($scope, $http, $scope.selectedBranchId)
           .then(function (results) {
               var ratingValue = CalculateStarRating(results.data);
               $scope.branchRating = ratingValue.toFixed(1);
           });
        }       

        $scope.onSellerRatingChanged = function (rating) {
            if ($scope.userName && $scope.userName.length > 0) {
                storesService.updateRatings($scope, $http, $scope.userName, $scope.selectedBranchId, rating)
           .then(function (results) {
               var ratingValue = CalculateStarRating(results.data);
               $scope.branchRating = ratingValue.toFixed(1);
           });
            }
            else {
                loadSellerRating();
                $('#modal-container-Register').modal({
                    show: true
                });

            }
        }
        var CalculateStarRating = function (ratingList) {
            var rating = 0;
            var totalCount = 0;
            for (var i = 0; i < ratingList.length; i++) {
                rating = rating + (ratingList[i].Rating * ratingList[i].RatingCount);
                totalCount = totalCount + ratingList[i].RatingCount
            }
            return rating / totalCount;
        }

        InitializeStores();

       

        $scope.ContactSeller = function (contactData, branchid, productId) {
            contactData.message = "";
            if (!contactData.Mobile || contactData.Mobile.toString().length != 10) {
                contactData.savedSuccessfully = false;
                contactData.message = " Mobile number should be 10 digits";
            }
            else if (contactData && branchid && productId) {
                productService.contactSeller($scope, $http, contactData.Name, contactData.Email, contactData.Mobile, contactData.Subject, branchid, productId)
               .then(function (result) {
                   if (result.data === 'failed') {
                       contactData.savedSuccessfully = false;
                       contactData.message = " You can only sent one message to the store for same product in 2 hours.";
                   }
                   else if (result.statusText == 'OK') {
                       contactData.savedSuccessfully = true
                       contactData.message = "Message Sent";
                       $timeout(function () {
                           contactData.message = '';
                       }, 4000);
                   }
                   else {
                       contactData.savedSuccessfully = false
                       contactData.message = "Sorry. Please resend the details.";
                   }
               });
            }
            return false;
        }

        $scope.addToProductComparison = function (product) {
            var img = $('#img_' + product.ProductId);
            if ($rootScope.comparisonlist.length >= 4) {
                $scope.message = "Only 4 products can be compared."
                return;
            }
            flyToElement($(img), $('#compareTopLink'));

            var comparisonProduct = CreateComparisonListProductObject(product);

            if ($rootScope.comparisonlist.length < 4) {
                $rootScope.comparisonlist.push(comparisonProduct);
                localStorageService.set('comparisonlist', $rootScope.comparisonlist);
                updateComparisonProductIdList();
            }

        }

        function updateComparisonProductIdList() {
            $rootScope.comparisonlistProductId.splice(0, $rootScope.comparisonlistProductId.length);
            for (var i = 0; i < $rootScope.comparisonlist.length; i++) {
                $rootScope.comparisonlistProductId.push($rootScope.comparisonlist[i].ProductId);
            }

        }

        var CreateComparisonListProductObject = function (product) {
            var comparisonProduct = {};
            comparisonProduct.ProductId = product.ProductId;
            comparisonProduct.Name = product.Name;
            comparisonProduct.PictureName = product.PictureName;
            comparisonProduct.SpecialPrice = product.SpecialPrice;
            comparisonProduct.Price = product.Price;
            comparisonProduct.StoresCount = product.StoresCount;
            comparisonProduct.FlagWishlist = product.FlagWishlist;
            return comparisonProduct;
        }
    }
}]);
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
        }

        function GetBuyerAddress()
        {
            cartService.getBuyerAddress($http, $scope.userName).then(function (response) {
                $scope.buyerAddress = response.data;
            });
        }

        $rootScope.$watch('flagLoggedIn', function () {
            GetBuyerAddress();
        });

       $scope.onAddressTabClick = function()
        {
            GetBuyerAddress();
       }

       $scope.applyCoupon = function () {
           var orderDiscount = 0;

           cartService.getCartDiscount($http, $rootScope.cartlist, $rootScope.userName, $scope.couponCode)
            .then(function (response) {
                $scope.orderDiscount = response.data;
            });
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
                $scope.totalShipping = $scope.totalShipping  + $rootScope.cartlist[i].TotalAdditionalShippingCharge;
            }
            if ($rootScope.cartTotal > 0 && $scope.orderDiscount > 0 && (($rootScope.cartTotal - $scope.orderDiscount) > 0))
            {
                $scope.netPayable = (($rootScope.cartTotal - $scope.orderDiscount) + $scope.totalShipping);
            }
            localStorageService.set('cartlist', $rootScope.cartlist);
        }

        $scope.incrementProductQuantity = function (product) {
            for (var i = 0; i < $rootScope.cartlist.length; i++) {
                if ($rootScope.cartlist[i].ProductId == product.ProductId) {
                    $rootScope.cartlist[i].Quantity = ($rootScope.cartlist[i].Quantity *1) + 1;
                    $rootScope.cartlist[i].TotalAdditionalShippingCharge = $rootScope.cartlist[i].AdditionalShippingCharge * $rootScope.cartlist[i].Quantity;
                    $rootScope.cartlist[i].SubTotal = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity);
                    $rootScope.cartlist[i].SubTotalWithShipping = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity)+ $rootScope.cartlist[i].TotalAdditionalShippingCharge;

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

        $scope.addBuyerAddress = function ()
        {
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

        $scope.confirmOrder = function()
        {
            cartService.generateOrder($http, $rootScope.cartlist, $scope.userName, $scope.paymentOption, $scope.deliveryOption, $scope.couponCode)
                .then(function (response) {
                    $rootScope.cartlist = {};
                    $rootScope.cartTotal = 0;
                    if (response.data > 0 || response.data.length > 25) {
                        localStorageService.remove('cartlist');
                    }
                    if (response.data.length>25) {  
                        //if payment gateway
                        document.write(response.data);                       
                        $("#payuForm").submit();
                    }
                    else
                    {
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

    $scope.onReinitiatePayment = function()
    {
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

app.controller('NavbarController',  ['$scope', '$location', '$http',
    function ($scope, $location, $http) {
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true
        } else {
            return false;
        }
    }    
    }]);

app.controller('HomeSliderController', ['$scope', '$http', 'productService',
function ($scope, $http, productService) {

    $scope.messageOffers = ''
    //$('.bxslider').bxSlider({
    //    auto: true,
    //    mode: 'fade'
    //});

    //$('.slideList').slick({
    //    dots: true,
    //    draggable: false,
    //    slidesToShow: 1,
    //    slidesToScroll: 1,
    //    autoplay: true,
    //    autoplaySpeed: 3000,
    //    arrows: false,
    //    infinite: true
    //});

    var curLocationDiv = document.getElementById("curLocation");
    var lat = curLocationDiv.title;
    var lng = curLocationDiv.value;
    if (lat == null || lat == "" || lat === 'undefined') {
        lat = 13.05831;
        lng = 80.21195;
    }
    productService.getTopOffers($scope, $http, lat, lng)
    .then(function (data) {
        $scope.offerProducts = data;
        $scope.messageOffers = '';
        if ($scope.offerProducts.data.length == 0) {
            $scope.messageOffers = 'No Offers in selected Area.'
        }
         });

}]);

app.controller('LandingController', ['$rootScope', '$scope', '$http', '$location', '$anchorScroll', '$q', 'filterFilter', 'landingService', 'productService', 'userActionService',
    'authService', 'localStorageService', 'cartService', '$filter', '$cookieStore', 'breadcrumbs',
function ($rootScope, $scope, $http, $location, $anchorScroll, $q, filterFilter, landingService, productService, userActionService, authService, localStorageService, cartService,
    $filter, $cookieStore, breadcrumbs) {
    {
        $scope.error = '';
        $scope.showAreaList = false;
        $scope.breadcrumbs = breadcrumbs;
        $scope.homeBannerSettings = {};
		
        function InitializeLanding() {
            landingService.getMainMenu($scope, $http)
             .then(function (data) {
                 $scope.mainMenu = data;
             });

            landingService.getFeaturedProducts($scope, $http)
             .then(function (data) {
                 $scope.featuredProducts = data;
             });

            landingService.getTopSellingProductList1($scope, $http)
             .then(function (data) {
                 $scope.topSellingProductList1 = data;
             });

            landingService.loadLocationList($scope, $http)
                .then(function (data) {
                    $scope.locationlist = data;
            });           
            landingService.loadCurrentLocation($scope, $http);

            landingService.topSellingProductList2($scope, $http)
             .then(function (data) {
                 $scope.personalizedProductList1 = data;
             });

            landingService.getTopCategoriesList($scope, $http)
            .then(function (data) {
                $scope.topCategoryList = data;
            });

            landingService.getHomeBannerSettings($scope, $http)
            .then(function (response) {
                $scope.homeBannerSettings = response.data;
            });

            if ($rootScope.userName && $rootScope.userName.length > 0) {
                userActionService.getUserWishlistCount($scope, $http, $rootScope.userName)
                .then(function (response) {
                    $rootScope.wishlistCount = response.data;
                });
            }

 
            $scope.addProductWishlist = function (product) {
                if ($rootScope.userName && $rootScope.userName.length > 0) {
                    var img = $('#img_' + product.ProductId);
                    flyToElement($(img), $('#wishlistTopLink'));
                    userActionService.addUserWishlist($scope, $http, $scope.userName, product.ProductId)
                    .then(function (response) {
                        $scope.wishlist = response.data;
                        product.FlagWishlist = true;
                        $rootScope.wishlistCount = response.data.length;
                    });
                }
                else {
                    $('#modal-container-Register').modal({
                        show: true,
                        backdrop: true
                    });

                }
            }

            updateComparisonProductIdList();

            CalculateCartTotal()
        }

        $scope.LogOut = function () {
            authService.logOut();
            $rootScope.flagLoggedIn = false;
            localStorageService.remove('userName');
            localStorageService.remove('flagLoggedIn');
            $rootScope.userName = '';
            $rootScope.wishlistCount = 0;
            $location.path('/Home');
        }

        $scope.searchCatalogue = function () {
            $scope.error = '';
            var curLocationDiv = document.getElementById("curLocation");
            
            
            if ($scope.selectedArea != undefined && $scope.selectedArea.Latitude != undefined)
            {
                curLocationDiv.title = $scope.selectedArea.Latitude
                curLocationDiv.value = $scope.selectedArea.Longitude
                
            }
            else if (curLocationDiv.title && !$scope.selectedArea)
            {
                //do nothing but continue with whatever is the default location.
            }
            else
            {
                $scope.error = 'Area not exist. Please select your Area';
                return;
            }
            var searchedProduct = $scope.selectedProduct;
            if ($scope.selectedProduct.Name != null || $scope.selectedProduct.Name != undefined)
            {
                searchedProduct = $scope.selectedProduct.Name;
            }

            var areaName = $scope.$parent.currentAddress;
            if ($scope.selectedArea && $scope.selectedArea.AreaName) { areaName = $scope.selectedArea.AreaName }
            var params = {
                productFilter: searchedProduct, areaName: areaName,
                lat: curLocationDiv.title,
                lng: curLocationDiv.value
            }

           var curUrl = '/search';
           $location.$$url = null;
           $location.path(curUrl).search(params);
        }

        $scope.getCurrentLocation= function()
        {
            landingService.loadCurrentLocation($scope, $http);
        }

        $scope.$on('$typeahead.select', function (value, index) {
            $scope.error = '';
            var curLocationDiv = document.getElementById("curLocation");
            if (index.Latitude && index.Longitude)
            {                
                curLocationDiv.title = index.Latitude;
                curLocationDiv.value = index.Longitude;
                $scope.selectedArea = $scope.selectedAreaInput ;
                showAreaList = false;

            }
            if (index.Name != null && index.ProductId != null)
            {
                var curLocationDiv = document.getElementById("curLocation");
                var curUrl = '/product/' + $filter('formaturl')(index.Name) + '/' + index.ProductId;
                $location.path(curUrl).search({ lat: curLocationDiv.title, lng: curLocationDiv.value });
            }
            else if ($scope.selectedProduct && ($scope.selectedProduct.Name != null || $scope.selectedProduct.Name != undefined) && index.AreaName != null) {

                var curUrl = '/product/' + $filter('formaturl')($scope.selectedProduct.Name) + '/' + $scope.selectedProduct.ProductId;
                $location.path(curUrl).search({ lat: curLocationDiv.title, lng: curLocationDiv.value });
            }
        });

        $scope.getLocationList = function (viewValue) {
            var params = {
                address: viewValue, sensor: false
                ,components: 'country:India'
                 
               // ,result_type: 'locality'
              //  , location_type: 'APPROXIMATE'
              //  , key: 'ABQIAAAAvZMU4-DFRYtw1UlTj_zc6hT2yXp_ZAY8_ufC3CFXhHIE1NvwkxQcT1h-VA8wQL5JBdsM5JWeJpukvw'
            };
           $http.get('http://maps.googleapis.com/maps/api/geocode/json', { params: params})
          //  $http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + viewValue + '&key=AIzaSyCKW2AIIbJMbUKINlwA - ITsXrCx11FsEhM')
            .then(function (res) {
                if ($scope.locationlist != null && $scope.locationlist != undefined) {
                    var data = $scope.locationlist.data;
                    for (i = 0; i < res.data.results.length; i++) {
                        //City, AreaName, Latitude, Longitude
                        var location = {
                            City: res.data.results[i].formatted_address,
                            AreaName: res.data.results[i].formatted_address,
                            Latitude: res.data.results[i].geometry.location.lat,
                            Longitude: res.data.results[i].geometry.location.lng
                        }

                        $scope.locationlist.data.push(location);
                    }
                }
               
            });
            if ($scope.locationlist != null && $scope.locationlist != undefined) {
                var result = filterFilter($scope.locationlist.data, viewValue)
                return result;
            }
            else
            {
                return null;
            }

        };

        //$scope.getSearchProductList = function (viewValue) {
        //    if (viewValue) {
        //        return landingService.getSearchProductList($scope, $http, $q, viewValue)
        //        .then(function (data) {
        //            $scope.searchProductList = data;
        //            return $scope.searchProductList.data;
        //        });
        //    }
        //    return [];
        //}

        $scope.searchProductList = [];
        $scope.searchRequests = [];

        $scope.getSearchProductList = function (viewValue) {

           if (viewValue && _.isString(viewValue)) {
                var request = landingService.getSearchProductList($scope, $http, $q, viewValue);
                $scope.searchRequests.push(request);
                return request.promise.then(function (searchProduct) {
                    $scope.searchProductList = [];
                    $scope.searchProductList.push(searchProduct);
                    clearRequest(request);
                    return $scope.searchProductList[0];
                    
                }, function (reason) {
                });
            }           
            
        }

        $scope.cancel = function (request) {
            request.cancel("User cancelled");
            clearRequest(request);
        };

        var clearRequest = function (request) {
            $scope.searchRequests.splice($scope.searchRequests.indexOf(request), 1);
        };



        $scope.closeMainMenu = function()
        {
            $('div.popup').css('visibility', 'hidden');
        }

        $scope.clickMainMenu = function (obj, catName, catId) {
            if(isTouchDevice())
            {               
                $('div.popup').css('visibility', 'visible');
            }
            else
            {           
                //$location.path('/category/' + $filter('formaturl')(catName) + '/' + catId);
                $('div.popup').css('visibility', 'visible');
            }
           
        }

        var timeoutId = null;
        $scope.showMainMenu = function () {
            if (!timeoutId) {
                timeoutId = window.setTimeout(function () {
                    timeoutId = null;
                    $('div.popup').css('visibility', 'visible');
                }, 400);
            }
        }
        

        $scope.menuMouseLeave = function ()
        {
            if (timeoutId) {
                window.clearTimeout(timeoutId);
                timeoutId = null;
                $('div.popup').css('visibility', 'hidden');
            }
             
        }

        $scope.closeError = function()
        {
            $scope.error = '';
        }

        function isTouchDevice() {
            return window.ontouchstart !== undefined;
        }


        InitializeLanding();

        $("#areaSearchInputSelect").focusout(function () {
            $scope.showAreaList = false;
            if ($scope.selectedArea) {
                if (!$scope.selectedAreaInput)
                {
                    $scope.selectedAreaInput = {};
                }
                $scope.selectedAreaInput.AreaName = $scope.selectedArea.AreaName;
            }
        });      

        $scope.showAreaListClicked = function()
        {
            $scope.showAreaList = true;
            setTimeout(function () {
                $("#areaSearchInputSelect").select();
            }, 0);           
        }

        $scope.removeProductFromComparison = function (product) {           
            var index = $rootScope.comparisonlist.indexOf(product);
            if (index > -1) {
                $rootScope.comparisonlist.splice(index, 1);
                localStorageService.set('comparisonlist', $rootScope.comparisonlist);
                 updateComparisonProductIdList();
            }
            event.stopPropagation();
        }
        
        $scope.closeCompareDropDown = function()
        {   
            /*$("#compareDropDownMenu").css("display", "none");*/
           
        }

        $scope.openCompareDropDown = function () {
            $("#compareDropDownMenu").css("display", "block");
        }

        $scope.closeCartDropDown = function () {
            $(".dropdown-toggle").dropdown('toggle');
        }

        $scope.openCartDropDown = function () {
            $("#cartDropDownMenu").css("display", "block");
        }

        $('.keep-open').on({
            "hide.bs.dropdown": function () {
                return false;
            }
        });

        function updateComparisonProductIdList() {
            $rootScope.comparisonlistProductId.splice(0, $rootScope.comparisonlistProductId.length);
            for (var i = 0; i < $rootScope.comparisonlist.length; i++) {
                $rootScope.comparisonlistProductId.push($rootScope.comparisonlist[i].ProductId);
            }

        }

        $scope.addProductToCart = function (product, branchId, branchName, price, specialPrice, additionalShippingCharge, deliveryTime, selectedSize) {
            var img = $('#img_' + product.ProductId);
            flyToElement($(img), $('#cartTopLink'));
            var productExist = FlagProductAlreadyExistinCart(product);
            if (!productExist) {
                var addtoCartProduct = CreateCartListProductObject(product, branchId, branchName, price, specialPrice, additionalShippingCharge, deliveryTime, selectedSize);
                if (addtoCartProduct != null) {

                    if ($rootScope.flagLoggedIn) {
                        cartService.addShoppingCartItem($http, addtoCartProduct, $rootScope.userName)
                        .then(function (data) {
                        });
                    }

                    if (!$rootScope.cartlist.length)
                    {
                        $rootScope.cartlist = [];
                    }

                    $rootScope.cartlist.push(addtoCartProduct);
                    localStorageService.set('cartlist', $rootScope.cartlist);
                    $rootScope.cartMessage = "Success";
                    ShowCartSucessMessage();
                }
                else {
                    $rootScope.cartFailureMessage = "Failure";
                    ShowCartFailureMessage();
                }
            }
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

        function FlagProductAlreadyExistinCart(product) {
            for (var i = 0; i < $rootScope.cartlist.length; i++) {
                if ($rootScope.cartlist[i].ProductId == product.ProductId) {
                    $rootScope.cartlist[i].Quantity = $rootScope.cartlist[i].Quantity + 1;
                    $rootScope.cartlist[i].TotalAdditionalShippingCharge = $rootScope.cartlist[i].AdditionalShippingCharge * $rootScope.cartlist[i].Quantity;
                    $rootScope.cartlist[i].SubTotal = ($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity);
                    $rootScope.cartlist[i].SubTotalWithShipping = (($rootScope.cartlist[i].SpecialPrice * $rootScope.cartlist[i].Quantity) + $rootScope.cartlist[i].TotalAdditionalShippingCharge);
                    cartService.updateCartItemQuantity($http, $rootScope.cartlist[i], $rootScope.userName);
                    $rootScope.cartMessage = "Success";
                    ShowCartSucessMessage();
                    return productExist = true;
                }
            }
            return false;
        }

        function ShowCartSucessMessage() {
            $("#cart-success-alert").fadeTo(2000, 500).slideUp(500, function () {
                $rootScope.cartMessage = '';
            });
        }

        function ShowCartFailureMessage() {
            $("#cart-failure-alert").fadeTo(2000, 500).slideUp(500, function () {
                $rootScope.cartFailureMessage = '';
            });
        }


        var CreateCartListProductObject = function (product, branchId, branchName, price, specialPrice, additionalShippingCharge, deliveryTime, selectedSize) {
            if (product.StorePricingModel && product.StorePricingModel.length > 0) {
                var cart = {};
                cart.ProductId = product.ProductId;
                cart.Name = product.Name;
                cart.PictureName = product.PictureName;
                cart.SpecialPrice = specialPrice;
                cart.Price = price;
                cart.Branch = branchName;
                cart.BranchId = branchId;
                cart.StoresCount = product.StoresCount;
                cart.FlagWishlist = product.FlagWishlist;
                cart.Quantity = 1;
                
                cart.AdditionalShippingCharge = additionalShippingCharge;
                cart.TotalAdditionalShippingCharge = additionalShippingCharge * cart.Quantity;
                cart.SubTotal = (cart.SpecialPrice * cart.Quantity);
                cart.SubTotalWithShipping = (cart.SpecialPrice * cart.Quantity) + cart.TotalAdditionalShippingCharge ;
                cart.DeliveryTime = deliveryTime;
                cart.SelectedSize = selectedSize;
                return cart;
            }
            else
            {
                var cart = {};
                cart.ProductId = product.ProductId;
                cart.Name = product.Name;
                cart.PictureName = product.PictureName;
                cart.SpecialPrice = specialPrice;
                cart.Price = price;
                cart.Branch = branchName;
                cart.BranchId = branchId;               
                cart.Quantity = 1;
                
                cart.AdditionalShippingCharge = additionalShippingCharge;
                cart.TotalAdditionalShippingCharge = additionalShippingCharge * cart.Quantity;
                cart.SubTotal = (cart.SpecialPrice * cart.Quantity);
                cart.SubTotalWithShipping = (cart.SpecialPrice * cart.Quantity) + cart.TotalAdditionalShippingCharge;
                cart.DeliveryTime = deliveryTime;
                cart.SelectedSize = selectedSize;
                return cart;
            }
            return null;
        }
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
        }
        CalculateCartTotal();
        event.stopPropagation();
    }

    $scope.gotoAnchor = function () {       
      window.scrollTo(0, 20);   
    };
}]);



app.controller('OfferController', ['$scope', '$rootScope', '$http', 'productService', 'userActionService', 
function ($scope, $rootScope, $http, productService, userActionService) {
        $scope.messageOffers = '';
        InitializeOffers();
        function InitializeOffers() {
            var curLocationDiv = document.getElementById("curLocation");
            var lat = curLocationDiv.title;
            var lng = curLocationDiv.value;
            if (lat == null || lat == "" || lat === 'undefined') {
                lat = 13.058312;
                lng = 80.21195;
            }            
          

            productService.getAllOffers($scope, $http, lat, lng)
            .then(function (data) {
                $scope.products = data;
                $scope.messageOffers = '';
                if ($scope.products.data && $scope.products.data.length == 0)
                {
                    $scope.messageOffers = 'No Offers in selected Area.'
                }
            });
        }

        $scope.addProductWishlist = function (product) {
            if ($rootScope.userName && $rootScope.userName.length > 0) {
                var img = $('#img_' + product.ProductId);
                flyToElement($(img), $('#wishlistTopLink'));
                userActionService.addUserWishlist($scope, $http, $rootScope.userName, product.ProductId)
                .then(function (response) {
                    $scope.wishlist = response.data;
                    product.FlagWishlist = true;
                    $rootScope.wishlistCount = response.data.length;
                });
            }
            else {
                $('#modal-container-Register').modal({
                    show: true
                });

            }
        }
    }]);

app.controller('CategoryController',['$scope','$http' ,'categoryService',
function ($scope, $http, categoryService) {
        function InitializeCategory() {
       categoryService.getAllCategory($scope, $http);
    }

    $scope.insertCategory = function () {
      //  var categoryName = $scope.newCategory.Name;
        categoryService.insertCategory($scope, $http, $scope.newCategory);
        $scope.newCategory.Name = '';
        $scope.newCategory.Description = '';
        $scope.newCategory.MetaTitle = '';
    };

    $scope.deleteCategory = function (id) {
        categoryService.deleteCategory($scope, $http, id);
    };

    InitializeCategory();
}]);
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

app.controller('orderTrackingController', ['$rootScope', '$scope', '$http', '$routeParams', 'orderTrackingService', 'authInterceptorService',
function ($rootScope, $scope, $http, $routeParams,orderTrackingService, authInterceptorService) {
    {

       
        $scope.TrackOrdersList = {};
        $scope.TotalOrdersList = {};
        $scope.TotalProductList = {};
        $scope.ProductList= {};
        function initializeTrackingOrder() {

            orderTrackingService.getTrackingOrders($scope, $http)
              .then(function (response) {

                  $scope.TrackOrdersList = response.data;
                  
                //  GetOrders();
              },
              function (err) {


              });
            orderTrackingService.GetOrdersList($scope, $http)
           .then(function (response)
           {
               $scope.TotalOrdersList = response.data;
              
           },
           function (err) {
             
           });
         
            $scope.message = "";
            $scope.model ="Order Details";
           
        }
        initializeTrackingOrder();
     
    }
 

    $scope.OrderPagination=function(count)
    {
        var page =count;
        orderTrackingService.PagingOrders($scope, $http,page)
       .then(function (response) {
           $scope.TrackOrdersList = response.data;
      
       },
       function (err) {
         
       });

    }
    $scope.orderedProducts=function(orders)
    {
        $scope.ProductList = null;
        var btnText=$scope.model;
        var orderId =orders.Id;
        orderTrackingService.GetProductList($scope, $http, orderId)
         .then(function (response) {
           
             
             $scope.ProductList = response.data;
            
         },
         function (err) {
             
         });
    }
    $scope.CancelOrders=function(orders)
    { 
        var flagCancelOrder = window.confirm('Are you sure you want to Cancel Order? \n Order Number : ' + orders.Id + '\n Number of products: ' + orders.NumberOfProducts
            + '\n Order Status: ' + orders.OrderStatus + '\n Order Total: ' + orders.OrderTotal);
        if (flagCancelOrder) {

            var orderId = orders.Id;

            orderTrackingService.CancelOrders($scope, $http, orderId)
             .then(function (response) {

                 if (response.data === true) {
                     $scope.savedSuccessfully = true;
                     $scope.message = "Order Number " + orderId + " Cancelled";
                     loadOrderList();
                 }
                 else {
                     $scope.savedSuccessfully = false;
                     $scope.message = "Error Cancelled " + orderId;
                 }

             },
             function (err) {

             });
        }
    }

    function loadOrderList()
    {
        orderTrackingService.getTrackingOrders($scope, $http)
              .then(function (response) {

                  $scope.TrackOrdersList = response.data;                  
              //    GetOrders();
              },
              function (err) {


              });
    }

    $scope.getISTDate = function(orderDateUtc)
    {
        var IST = new Date(orderDateUtc + 'Z'); // Clone UTC Timestamp
       // IST.setHours(IST.getHours() + 5); // set Hours to 5 hours later
        //IST.setMinutes(IST.getMinutes() + 30);
        return IST;
    }

    $scope.SearchOrders = function (search,event)
    {
       
        var orderId =search.OrderId;
        if (orderId ==null) {
            orderId=0;
        }
        if (orderId > 0) {
            orderTrackingService.SearchOrders($scope, $http, orderId)
             .then(function (response) {
                 $scope.TrackOrdersList = response.data;

             },
             function (err) {

             });
        }
        else
        {
            initializeTrackingOrder();
        }
    }
}]);
app.controller('ProductController', ['$rootScope', '$scope', '$http', '$routeParams', '$timeout', '$cookieStore',
    'productService', 'mapService', 'userActionService', 'localStorageService', 'cartService', 'breadcrumbs',
function ($rootScope, $scope, $http, $routeParams, $timeout, $cookieStore,
    productService, mapService, userActionService,localStorageService, cartService, breadcrumbs) {
    {
        $scope.markers = [];
        var curLocationDiv = document.getElementById("curLocation");
        $scope.searchRadius = $rootScope.defaultRadius;
        $scope.messageProductPricing = '';
        $scope.productRating = 0;
        $scope.contactData = {};
        $scope.contactData.message = '';
        $scope.imgSrc = '';
        $scope.storeSortBy = 'SpecialPrice';
        $scope.reverse = false;
        $scope.selectedVariant = '';

        $scope.product = {};
        $scope.product.data = {};
        $scope.product.data.RelatedProductList = {};
		
        breadcrumbs.options = { 'Product': $routeParams.friendlyUrl };

        var zoomRadiusMappingObj = { 1: 14, 2: 14, 3: 14, 4: 13, 5: 13, 6: 12, 7: 12, 8: 12, 9: 12, 10: 12, 11: 11, 12: 11, 13: 11, 14: 11, 15: 11, 16: 11, 17: 11, 18: 11, 19: 11, 20: 11 }

        if ($routeParams.lat != null && $routeParams.lng!=null)
        {
            curLocationDiv.title = $routeParams.lat;
            curLocationDiv.value = $routeParams.lng;
        }
        var defLat = curLocationDiv.title;
        var defLng = curLocationDiv.value;
        if (defLat == null || defLat == "" || defLat === 'undefined') {
            defLat = 13.058312;
            defLng = 80.21195;
        }
        $scope.storeLocations = [];
        $scope.locationBased = true;        

        $scope.productId = ($routeParams.productId) ? parseInt($routeParams.productId) : 0; 
        
        function InitializeProduct() {
            loadProduct(defLat, defLng);
            loadProductSpecification();
            loadProductKeyFeatures();
            loadProductRating();
            loadContactDetails();
        }

        function loadContactDetails() {
            userActionService.getMyDetails($scope, $http, $rootScope.userName)
           .then(function (response) {
               if ($rootScope.flagLoggedIn) {
                   $scope.contactData.Email = response.data.Email;
                   $scope.contactData.Mobile = response.data.PhoneNumber1;
                   $scope.contactData.Name = response.data.FirstName;
               }

           }
           )
        }            

        function loadProduct(lat,lng)
        {
            productService.getProductDetails($scope, $http, $scope.productId, $scope.locationBased, lat, lng, $scope.searchRadius)
          .then(function (data) {
              $scope.product = data;
              $scope.imgSrc = $scope.product.data.PictureName;
              UpdateDistance();
              updateProductPricingMessage();
              updateWishlistDetails();
              loadGoogleMap(lat, lng);
              addToRecentlyViewedList($scope.product.data);
          });
        }

        var addToRecentlyViewedList = function (product) {
                     
            var alreadyExist = false;

            for (var i = 0; i < $rootScope.recentlyViewedlist.length; i++) {
                if (product.ProductId == $rootScope.recentlyViewedlist[i].ProductId)
                {
                    alreadyExist = true;
                }
            }

            if (!alreadyExist) {
                var recentViewedProduct = CreateComparisonListProductObject(product);
                if ($rootScope.recentlyViewedlist.length >= 20) {
                    $rootScope.recentlyViewedlist.splice(0, 2);
                }
                $rootScope.recentlyViewedlist.push(recentViewedProduct);
                localStorageService.set('recentlyViewedlist', $rootScope.recentlyViewedlist);
            }
        }

        function updateWishlistDetails()
        {
            var wishlist = $rootScope.wishlist;            
            for (var i = 0; i < wishlist.length; i++) {
                if ($scope.product.data.ProductId ==  wishlist[i].Product)
                $scope.product.data.FlagWishlist = true;
            }
        }

        function UpdateDistance()
        {
            if ($scope.product != null && $scope.product.data != null && $scope.product.data.StorePricingModel!=null) {
                for (var i = 0; i < $scope.product.data.StorePricingModel.length; i++) {
                    $scope.product.data.StorePricingModel[i].Distance = GetDistance($scope.product.data.StorePricingModel[i].Latitude, 
                        $scope.product.data.StorePricingModel[i].Longitude)
                }
            }
        }

        function GetDistance(lat2, lon2) {
            var lat1 = curLocationDiv.title;
            var lon1 = curLocationDiv.value;
            var radlat1 = Math.PI * lat1 / 180
            var radlat2 = Math.PI * lat2 / 180
            var radlon1 = Math.PI * lon1 / 180
            var radlon2 = Math.PI * lon2 / 180
            var theta = lon1 - lon2
            var radtheta = Math.PI * theta / 180
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist)
            dist = dist * 180 / Math.PI
            dist = dist * 60 * 1.1515
            dist = dist * 1.609344;
            return dist
        }

        function loadProductSpecification() {
            productService.getProductSpecification($scope, $http, $scope.productId)
          .then(function (data) {
              $scope.productSpecification = data;               
          });
        }

        function loadProductKeyFeatures() {
            productService.getProductKeyFeatures($scope, $http, $scope.productId)
          .then(function (data) {
              $scope.productKeyFeatures = data;
          });
        }

        function loadProductRating() {
            productService.getRatings($scope, $http, $scope.productId)
           .then(function (results) {
               var ratingValue = CalculateStarRating(results.data);
               $scope.productRating = ratingValue.toFixed(1);
          });
        }

        function updateProductPricingMessage() {
            $scope.messageProductPricing = ''
            if (!$scope.product.data || !$scope.product.data.StorePricingModel || $scope.product.data.StorePricingModel == 0) {
                $scope.messageProductPricing = 'Stores not available for this product in selected area. 1) Increase the KM radius of the map or 2) Drag Vbuy.in icon in center of the map and search nearby areas in map. '
            }
        }

        $scope.onProductRatingChanged = function (rating) {
            if ($scope.userName && $scope.userName.length > 0) {
                productService.updateRatings($scope, $http, $scope.userName, $scope.productId, rating)
           .then(function (results) {
               var ratingValue = CalculateStarRating(results.data);
               $scope.productRating = ratingValue.toFixed(1);
           });
            }
            else
            {
                loadProductRating();
                 $('#modal-container-Register').modal({
                        show: true
                 });
                  
            }

        }       

        var CalculateStarRating = function (ratingList) {
            var rating = 0;
            var totalCount = 0;
            for (var i = 0; i < ratingList.length; i++)
            {
                rating = rating + (ratingList[i].Rating * ratingList[i].RatingCount);
                totalCount = totalCount + ratingList[i].RatingCount
            }
            return rating / totalCount;
        }
              

        $scope.onProductFilterChanged = function () {
            var lat = curLocationDiv.title;
            var lng = curLocationDiv.value;

            $rootScope.defaultRadius = $scope.searchRadius;

            updateProductList(lat, lng);
            getStoreLocationsForProduct(lat, lng);
            $scope.circle.radius = $scope.searchRadius * 1000;
            $scope.circle.map = $scope.map;
            $scope.circle.setCenter(new google.maps.LatLng(lat, lng));
            UpdateMapZoom();
        }

        function UpdateMapZoom() {
            if ($scope.searchRadius < 21) {
                $scope.map.setZoom(zoomRadiusMappingObj[$scope.searchRadius])
            }
            else {
                $scope.map.setZoom(10)
            }
        }

        function updateProductList(lat, lng) {
            productService.getProductDetails($scope, $http, $scope.productId, $scope.locationBased, lat, lng, $scope.searchRadius)
             .then(function (data) {
                 $scope.product = data;
                 UpdateDistance();
                 updateProductPricingMessage();
             });
        }

        function getStoreLocationsForProduct(lat, lng) {
            mapService.getStoreLocationsForProduct($scope, $http, $scope.productId, lat, lng, $scope.searchRadius)
            .then(function (data) {
                $scope.storeLocations = data;
                if ($scope.storeLocations.data.length > 0) {
                    loadStoreLocationsInMap();
                }
                else {
                    ClearAllMarker();
                }
            });
        }

        //todo:change map to a directive later.
        function loadGoogleMap(lat, lng) {
            var element = document.getElementById('map_canvas');
            if (element != null && element.value != '') {             
                var image = {
                    url: 'Content/images/VBuy_map32.png',
                    // This marker is 32 pixels wide by 50 pixels tall.
                    size: new google.maps.Size(32, 60),
                    // The origin for this image is 0,0.
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at 0,32.
                    anchor: new google.maps.Point(18, 56)
                };

                var mapOptions = {
                    center: new google.maps.LatLng(lat, lng),
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false,
                    panControl: false,
                    streetViewControl: false,
                    zoomControl: true,
                    scrollwheel: false,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL
                    }
                }
                $scope.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: $scope.map,
                    icon: image,
                    draggable: true,
                    title: "Selected Area!.\n Drag to change center"
                });

                $scope.circle = new google.maps.Circle({
                    center: new google.maps.LatLng(lat, lng),
                    radius: $scope.searchRadius * 1000,
                    strokeColor: "#138808",
                    fillColor: "#FF9933",
                    fillOpacity: 0.1,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    map: $scope.map
                });

                getStoreLocationsForProduct(lat, lng);

                google.maps.event.addListener(marker, "drag", function (event) {
                    var newLat = event.latLng.lat();
                    var newLng = event.latLng.lng();
                    $scope.circle.setCenter(new google.maps.LatLng(newLat, newLng));
                });

                google.maps.event.addListener(marker, "dragend", function (event) {
                    var newLat = event.latLng.lat();
                    var newLng = event.latLng.lng();
                    $scope.map.setCenter(new google.maps.LatLng(newLat, newLng));
                    $scope.circle.setCenter(new google.maps.LatLng(newLat, newLng));
                    //clear existing markers.
                    ClearAllMarker();
                    getStoreLocationsForProduct(newLat, newLng);
                    updateProductList(newLat, newLng);
                    curLocationDiv.title = newLat;
                    curLocationDiv.value = newLng;
                });

                google.maps.event.clearListeners(window, 'resize');
                UpdateMapZoom();
            }
        }
        // Sets the map on all markers in the array.
        function ClearAllMarker() {
            for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setMap(null);
            }
        }

        function loadStoreLocationsInMap() {
            var info_window = new google.maps.InfoWindow({
                content: 'loading'
            });
            ClearAllMarker();
            for (var i = 0; i < $scope.storeLocations.data.length; i++) {
                var storeName = $scope.storeLocations.data[i].StoreName;

                var trimStoreName = storeName;
                if (storeName.length > 8) {
                    trimStoreName = storeName.substring(0, 7) + "..";
                }
                var styleIcon = new StyledIcon(StyledIconTypes.MARKER, { color: "#FF9933", fore: "#000080", text: trimStoreName });
                if (i < 5) {
                    styleIcon = new StyledIcon(StyledIconTypes.BUBBLE, { color: "#FF9933", fore: "#000080", text: trimStoreName });
                }

                var m = new StyledMarker({
                    map: $scope.map,
                    styleIcon: styleIcon,
                    animation: google.maps.Animation.DROP,
                    labelClass: "maplabels",
                    labelStyle: { opacity: 0.75 },
                    labelContent: $scope.storeLocations.data[i].StoreName,
                    title: $scope.storeLocations.data[i].StoreName,
                    position: new google.maps.LatLng($scope.storeLocations.data[i].Latitude, $scope.storeLocations.data[i].Longitude),
                    html: '<a href="/stores/branch/' + $scope.storeLocations.data[i].BranchId + '">'  +'<p><strong>' + $scope.storeLocations.data[i].BranchName + '</strong><br/>' + $scope.storeLocations.data[i].Address1
                        + ' , ' + $scope.storeLocations.data[i].Address2 + '</p></a>'
                });
                $scope.markers.push(m);

                google.maps.event.addListener(m, 'click', function () {
                    info_window.setContent(this.html);
                    info_window.open($scope.map, this);
                });
            }


        }

        InitializeProduct();

        $scope.GetDirection = function (productPricing, productId)
        {
            var selectedLatitude = curLocationDiv.title;
            var selectedLongitude = curLocationDiv.value;
            var storeLatitude = productPricing.Latitude;
            var storeLongitude = productPricing.Longitude;

            var start = new google.maps.LatLng(selectedLatitude, selectedLongitude);
            var end = new google.maps.LatLng(storeLatitude, storeLongitude);            

            if ($scope.directionsDisplay != null) {
                $scope.directionsDisplay.setMap(null);
                $scope.directionsDisplay = null;
            }
            $scope.directionsDisplay = new google.maps.DirectionsRenderer(
                {
                    suppressMarkers: true
                });// also, constructor can get "DirectionsRendererOptions" object

            $scope.directionsDisplay.setMap($scope.map); // map should be already initialized.

            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };
            // Instantiate a directions service.
            directionsService = new google.maps.DirectionsService();
            
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    $scope.directionsDisplay.setDirections(response);
                }
            });

        }


        $scope.BuyProduct= function(branchid, productId) {
            return false;
        }

        $scope.ContactSeller = function (contactData, branchid, productId) {
            contactData.message = "";
            if(!contactData.Mobile || contactData.Mobile.toString().length !=10)
            {
                contactData.savedSuccessfully = false;
                contactData.message = " Mobile number should be 10 digits";
            }
            else if (contactData && branchid && productId) {
                productService.contactSeller($scope, $http, contactData.Name, contactData.Email, contactData.Mobile, contactData.Subject, branchid, productId)
               .then(function (result) {
                   if (result.data === 'failed') {
                       contactData.savedSuccessfully = false;
                       contactData.message = " You can only sent one message to the store for same product in 2 hours.";
                   }
                   else if(result.statusText == 'OK')
                   {
                       contactData.savedSuccessfully = true
                       contactData.message = "Message Sent";                       
                       $timeout(function () {
                           contactData.message = '';
                       },4000);
                   }                  
                   else
                   {
                       contactData.savedSuccessfully = false
                       contactData.message = "Sorry. Please resend the details.";
                   }
               });
            }
            return false;
        }

        $scope.ChangeProductDisplayImage = function (productImageSrc)
        {
            $scope.imgSrc = productImageSrc;          

        }

        $scope.addToProductComparison = function (product) {
            var img = $('#img_' + product.ProductId);
            if ($rootScope.comparisonlist.length >= 4) {
                $scope.message = "Only 4 products can be compared."
                return;
            }
            flyToElement($(img), $('#compareTopLink'));

            var comparisonProduct = CreateComparisonListProductObject(product);

            if ($rootScope.comparisonlist.length < 4) {
                $rootScope.comparisonlist.push(comparisonProduct);
                localStorageService.set('comparisonlist', $rootScope.comparisonlist);
                updateComparisonProductIdList();
            }

        }

        $scope.addProductWishlist = function (product) {
            if ($scope.userName && $scope.userName.length > 0) {
                var img = $('#img_' + product.ProductId);
                flyToElement($(img), $('#wishlistTopLink'));
                userActionService.addUserWishlist($scope, $http, $scope.userName, product.ProductId)
                .then(function (response) {
                    $rootScope.wishlist = response.data;
                    product.FlagWishlist = true;
                    $rootScope.wishlistCount = response.data.length;
                });
            }
            else {
                $('#modal-container-Register').modal({
                    show: true
                });

            }
        }

        var CreateComparisonListProductObject = function (product) {
            var comparisonProduct = {};
            comparisonProduct.ProductId = product.ProductId;
            comparisonProduct.Name = product.Name;
            comparisonProduct.PictureName = product.PictureName;
            comparisonProduct.SpecialPrice = product.StorePricingModel[0].SpecialPrice;
            comparisonProduct.Price = product.StorePricingModel[0].Price;
            comparisonProduct.StoresCount = product.StoresCount;
            comparisonProduct.FlagWishlist = product.FlagWishlist;
            return comparisonProduct;
        }

        $scope.removeFromProductComparison = function (product) {
            var img = $('#img_' + product.ProductId);
            flyToElement($('#compareTopLink'), $(img));

            var index = -1;

            for (var i = 0; i < $rootScope.comparisonlist.length; i++) {
                if ($rootScope.comparisonlist[i].ProductId == product.ProductId) {
                    index = i;
                }
            }

            if (index > -1) {
                $rootScope.comparisonlist.splice(index, 1);
                localStorageService.set('comparisonlist', $rootScope.comparisonlist);
                updateComparisonProductIdList();
            }
        }

        function updateComparisonProductIdList() {
            $rootScope.comparisonlistProductId.splice(0, $rootScope.comparisonlistProductId.length);
            for (var i = 0; i < $rootScope.comparisonlist.length; i++) {
                $rootScope.comparisonlistProductId.push($rootScope.comparisonlist[i].ProductId);
            }

        }

        $scope.updateSelectedVariant = function (selectedSize) {
            $scope.selectedVariant = selectedSize;

        }

    }
}]);


app.controller('CompareController', ['$rootScope','$scope', '$http', '$routeParams', '$cookieStore', 'localStorageService', '$timeout', 'productService', 'userActionService','breadcrumbs',
function ($rootScope, $scope, $http, $routeParams, $cookieStore, localStorageService, $timeout, productService, mapService, userActionService, breadcrumbs)
{
    $scope.comparisonProductlist = [];
    $scope.productComparisonResult = {};
    $scope.productDetailedComparisonResult = {};

    InitializeCompareProduct();

    function InitializeCompareProduct() {
        loadComparison();
        loadDetailedComparison();
    }

    function loadComparison()
    {
        $scope.comparisonProductlist = $rootScope.comparisonlist;
        var productIds = new Array();
        for(prd in $scope.comparisonProductlist)
        {
            productIds.push($scope.comparisonProductlist[prd].ProductId);
        }
        productService.compareProduct($scope, $http, productIds)
            .then(function (result) {
                if (result.data) {
                    $scope.productComparisonResult = result.data
                }
            });
    }

    function loadDetailedComparison() {
        $scope.comparisonProductlist = $rootScope.comparisonlist;
        var productIds = new Array();
        for (prd in $scope.comparisonProductlist) {
            productIds.push($scope.comparisonProductlist[prd].ProductId);
        }
        productService.compareProductDetailedSpecification($scope, $http, productIds)
            .then(function (result) {
                if (result.data) {
                    $scope.productDetailedComparisonResult = result.data
                }
            });
    }

    $scope.removeProductInComparisonPage = function (product) {
        var index = $rootScope.comparisonlist.indexOf(product);
        if (index > -1) {
            $rootScope.comparisonlist.splice(index, 1);
            localStorageService.set('comparisonlist', $rootScope.comparisonlist);
            ReInitializeDefaultVariables(); 
            InitializeCompareProduct();
        }
    }

    var ReInitializeDefaultVariables = function()
    {
        $scope.comparisonProductlist = [];
        $scope.productComparisonResult = {};
        $scope.productDetailedComparisonResult = {};
    }

     $scope.$watch(function () {
         return $rootScope.comparisonlist;
     }, function () {
         ReInitializeDefaultVariables();
         InitializeCompareProduct();
     }, true);

}]);
/// <reference path="productlistController.js" />
app.controller('ProductListController', ['$rootScope', '$scope', '$http', '$routeParams', '$cookieStore', 'localStorageService', 'productService',
    'mapService', 'userActionService', '$modal', 'authService', 'breadcrumbs',
function ($rootScope, $scope, $http, $routeParams,$cookieStore,localStorageService, productService, mapService, userActionService,
    $modal, authService, breadcrumbs) {
    {
        $scope.markers = [];
        $scope.searchRadius = $rootScope.defaultRadius;
        $scope.priceRangeFrom = 0;
        $scope.priceRangeTo = 100000;
        $scope.priceRange = [$scope.priceRangeFrom, $scope.priceRangeTo];
        $scope.itemsPerPage = 50;
        $scope.showLoadMore = false;
        $scope.productDataLength = 0;

        $scope.searchFilter = {};
        $scope.searchFilter.data = {};
        $scope.searchFilter.data.Min = 0;
        $scope.searchFilter.data.Max = 100000;
        $scope.loadPriceRangeSlider = false;
        $scope.message = '';
        $scope.productFilterGroup = {};
        
        $scope.selectedFilter = {};
        $scope.selectedFilter.SelectedBrandList = [];

        $scope.selectedFilter.SelectedProductFilter1 = [];

        $scope.dropdownBrandSettings = {
            enableSearch: true,
            scrollableHeight: '300px',
            scrollable: true,
            displayProp: 'BrandName',
            idProp: 'Id',
            externalIdProp: 'Id',
            smartButtonMaxItems: 2
        };

        $scope.selectedFilter.SortBy = {};
        $scope.dropdownSortData = [{ id: 1, label: "Stores Count" }, { id: 2, label: "Low Price" }, { id: 3, label: "High Price" },{ id: 4, label: "A to Z" }, { id: 5, label: "Z to A" }];
        $scope.dropdownSortSettings = {
            scrollableHeight: '200px',
            scrollable: true,
            displayProp: 'label',
            idProp: 'id',
            externalIdProp: 'id',
            smartButtonMaxItems: 1,
            selectionLimit: 1,
            showUncheckAll: true
        };

        $scope.dropdownProductFilterSettings = {
            enableSearch: true,
            scrollableHeight: '300px',
            scrollable: true,
            displayProp: 'FilterValueText',
            idProp: 'FilterValueText',
            externalIdProp: '',
            showUncheckAll: true,
            showCheckAll: false,
            enableSearch: false,
            smartButtonMaxItems: 2           
        };

        $scope.dropdownBrandEvents =
            {
                onItemSelect : function(item)
                {
                    $scope.onPricingFilterChanged();
                },
                onItemDeselect: function (item) {
                    $scope.onPricingFilterChanged();
                },
                onDeselectAll : function()
                {
                    $scope.selectedFilter.SortBy = {};
                    $scope.onPricingFilterChanged();
                }
            }

        $scope.dropdownProductFilterEvents =
        {
            onItemSelect: function (item) {
                $scope.onPricingFilterChanged();
            },
            onItemDeselect: function (item) {
                $scope.onPricingFilterChanged();
            },
            onDeselectAll: function () {
                $scope.selectedFilter.SortBy = {};
                $scope.onPricingFilterChanged();
            }
        }

        $scope.filterBrandCustomTexts = { buttonDefaultText: 'Brand' };
        $scope.filterSortCustomTexts = { buttonDefaultText: 'Sort By', uncheckAll: 'Clear Sorting' };

        breadcrumbs.options = { 'Category': $routeParams.friendlyUrl};

        var zoomRadiusMappingObj = {1:14, 2:14, 3:14, 4:13,5:13,6:12,7:12,8:12,9:12,10:12,11:11,12:11,13:11,14:11,15:11,16:11,17:11,18:11,19:11,20:11}

        var curLocationDiv = document.getElementById("curLocation");
        if ($routeParams.lat != null && $routeParams.lng != null) {
            curLocationDiv.title = $routeParams.lat;
            curLocationDiv.value = $routeParams.lng;
        }
        var defLat = curLocationDiv.title;
        var defLng = curLocationDiv.value;
        if (defLat == null || defLat == "" || defLat === 'undefined') {
            defLat = 13.058312;
            defLng = 80.21195;
        }
        $scope.storeLocations = [];
        $scope.categoryId = ($routeParams.categoryId) ? parseInt($routeParams.categoryId) : 0;
        $scope.searchedCategoryName = $routeParams.friendlyUrl;

        $scope.onPricingFilterChanged = function () {
           
            var lat = curLocationDiv.title;
            var lng = curLocationDiv.value;
            $scope.productDataLength = 0;
            updateProductList(lat, lng);
            getStoreLocations(lat, lng);
           
        }

        $scope.onProductFilterChanged = function()
        {
            var lat = curLocationDiv.title;
            var lng = curLocationDiv.value;
            $scope.productDataLength = 0;

            $rootScope.defaultRadius = $scope.searchRadius;

            updateProductList(lat, lng);
            getStoreLocations(lat, lng);            

            $scope.circle.radius = $scope.searchRadius * 1000;
            $scope.circle.map = $scope.map;
            $scope.circle.setCenter(new google.maps.LatLng(lat, lng));
          
            UpdateMapZoom();
        }

        function UpdateMapZoom()
        {
            if ($scope.searchRadius < 21) {
                $scope.map.setZoom(zoomRadiusMappingObj[$scope.searchRadius])
            }
            else {
                $scope.map.setZoom(10)
            }
        }
        
        function InitializeProducts() {
            loadFilters();
            loadProducts(defLat, defLng);
            updateComparisonProductIdList();
        }

        function loadProducts(lat, lng) {
            //Here 1 is hardcoded now for item coumnt start.
            productService.getProducts($scope, $http, $scope.categoryId, null, lat, lng, $scope.searchRadius, $scope.priceRangeFrom, $scope.priceRangeTo, 1, $scope.itemsPerPage)
             .then(function (data) {
                 $scope.products = data;
                 if ($scope.products.data.length > 0)
                 {
                     $scope.products.totalCount = $scope.products.data[0].TotalCount;
                     $scope.productDataLength = $scope.products.data.length;
                 }
                 $scope.showLoadMore = ($scope.products.totalCount > 0 && $scope.products.totalCount > $scope.productDataLength);
                 var online = navigator.onLine;
                 if (online) {
                     loadGoogleMap(defLat, defLng);
                 }                
             });
        }

        function loadFilters() {
            productService.getMinMaxForProductCategory($scope, $http, $scope.categoryId)
            .then(function (data) {
                $scope.searchFilter = data;
                if ($scope.searchFilter.data.Max > 0) {

                }
                else {
                    $scope.searchFilter.data.Min = 0;
                    $scope.searchFilter.data.Max = 100000;
                }
                $scope.loadPriceRangeSlider = true;
            });

            productService.getFiltersForProductCategory($scope, $http, $scope.categoryId)
            .then(function (data) {
                $scope.productFilterList = data;
                $scope.productFilterGroup = {};
                $scope.productFilterGroup = _.groupBy($scope.productFilterList.data, 'FilterParameter');

                for (var group in $scope.productFilterGroup) {
                    $scope.productFilterGroup[group].SelectedProductFilter = [];
                }

                //Now we need to split this product filter list based on requirement in dropdown. Various Product dropdown filter. 
                //4 Filters 
                //Rest we can leave as it is and can show in big panel (More). 
            });
        }

        function updateComparisonProductIdList (){
            $rootScope.comparisonlistProductId.splice(0, $rootScope.comparisonlistProductId.length);
            for (var i = 0; i < $rootScope.comparisonlist.length; i++) {
                $rootScope.comparisonlistProductId.push($rootScope.comparisonlist[i].ProductId);
            }

        }

        function updateProductList(lat, lng) {
            var mapRadius = $scope.searchRadius;
            var productFilterListSelected = [];

            for (var group in $scope.productFilterGroup) {
                if ($scope.productFilterGroup[group].SelectedProductFilter) {
                    for (var i = 0; i < $scope.productFilterGroup[group].SelectedProductFilter.length; i++) {
                        productFilterListSelected.push({
                            FilterParameter: $scope.productFilterGroup[group].SelectedProductFilter[i].FilterParameter,
                            FilterValueText: $scope.productFilterGroup[group].SelectedProductFilter[i].FilterValueText
                        });
                    }
                }
            }
            productService.getProducts($scope, $http, $scope.categoryId, $scope.selectedFilter, lat, lng, $scope.searchRadius, $scope.priceRangeFrom,
                $scope.priceRangeTo, 1, $scope.itemsPerPage, productFilterListSelected)
             .then(function (data) {
                 $scope.products = data;
                 if ($scope.products.data.length > 0) {
                     $scope.products.totalCount = $scope.products.data[0].TotalCount;
                     $scope.productDataLength = $scope.products.data.length;
                     $scope.showLoadMore = ($scope.products.totalCount > 0 && $scope.products.totalCount > $scope.productDataLength);
                 }
                 else {
                     $scope.products.totalCount = 0;
                 }
                 $scope.showLoadMore = ($scope.products.totalCount > 0 && $scope.products.totalCount > $scope.productDataLength);
             });
        }

        function getStoreLocations(lat, lng) {
            mapService.getStoreLocationsForCategory($scope, $http, $scope.categoryId, lat, lng, $scope.searchRadius, $scope.priceRangeFrom, $scope.priceRangeTo)
            .then(function (data) {
                $scope.storeLocations = data;
                if ($scope.storeLocations.data.length > 0) {
                    loadCategoryStoreLocationsInMap();
                }
                else
                {
                    ClearAllMarker();
                }
            });
        }


        function loadGoogleMap(lat, lng) {

            var mapOptions = {
                center: new google.maps.LatLng(lat, lng),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                panControl: false,
                streetViewControl: false,
                zoomControl: true,
                scrollwheel: false,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                }
            }
            var image = {
                url: 'Content/images/VBuy_map32.png',
                // This marker is 32 pixels wide by 50 pixels tall.
                size: new google.maps.Size(32, 60),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(18, 56)
            };

            $scope.map = new google.maps.Map(document.getElementById('map_canvassmall'), mapOptions);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: $scope.map,
                draggable: true,
                icon: image,
                title: "Selected Area!.\n Drag to change center"
            });

            $scope.circle = new google.maps.Circle({
                center: new google.maps.LatLng(lat, lng),
                radius: $scope.searchRadius * 1000,
                strokeColor: "#138808",
                fillColor: "#FF9933",
                fillOpacity: 0.1,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                map: $scope.map
            });

            getStoreLocations(lat, lng);

            google.maps.event.addListener(marker, "drag", function (event) {
                var newLat = event.latLng.lat();
                var newLng = event.latLng.lng();
                $scope.circle.setCenter(new google.maps.LatLng(newLat, newLng));
            });

            google.maps.event.addListener(marker, "dragend", function (event) {
                var newLat = event.latLng.lat();
                var newLng = event.latLng.lng();
                //clear existing markers.
                ClearAllMarker();
                $scope.map.setCenter(new google.maps.LatLng(newLat, newLng));
                $scope.circle.setCenter(new google.maps.LatLng(newLat, newLng));
                getStoreLocations(newLat, newLng);
                updateProductList(newLat, newLng);
                curLocationDiv.title = newLat;
                curLocationDiv.value = newLng;

            });
            google.maps.event.clearListeners(window, 'resize');
            UpdateMapZoom();
        }            
        

        $scope.showMap = function() {            
            $('#modal-container-map').on('shown.bs.modal', function () {
                var lat = curLocationDiv.title;
                var lng = curLocationDiv.value;
                window.setTimeout(function () {
                google.maps.event.trigger($scope.map, 'resize');
                $scope.map.setCenter(new google.maps.LatLng(lat, lng));
                }, 0);
            });
            $('#modal-container-map').modal("show");
        }

        // Sets the map on all markers in the array.
        function ClearAllMarker() {
            for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setMap(null);
            }
        }

        function loadCategoryStoreLocationsInMap() {
            var info_window = new google.maps.InfoWindow({
                content: 'loading'
            });
            ClearAllMarker();
            for (var i = 0; i < $scope.storeLocations.data.length; i++) {
                var storeName = $scope.storeLocations.data[i].StoreName;

                var trimStoreName = storeName;
                if (storeName.length > 8) {
                    trimStoreName = storeName.substring(0, 7) + "..";
                }
                var styleIcon = new StyledIcon(StyledIconTypes.MARKER, { color: "#FF9933", fore: "#000080", text: trimStoreName });
                if (i < 5) {
                    styleIcon = new StyledIcon(StyledIconTypes.BUBBLE, { color: "#FF9933", fore: "#000080", text: trimStoreName });
                }

                var m = new StyledMarker({
                    map: $scope.map,
                    styleIcon: styleIcon,
                    animation: google.maps.Animation.DROP,
                    labelClass: "maplabels",
                    labelStyle: { opacity: 0.75 },
                    labelContent: $scope.storeLocations.data[i].StoreName,
                    title: $scope.storeLocations.data[i].StoreName,
                    position: new google.maps.LatLng($scope.storeLocations.data[i].Latitude, $scope.storeLocations.data[i].Longitude),
                    html: '<a href="/stores/branch/' + $scope.storeLocations.data[i].BranchId + '">'  + '<p><strong>' + $scope.storeLocations.data[i].BranchName + '</strong><br/>' + $scope.storeLocations.data[i].Address1
                        + ' , ' + $scope.storeLocations.data[i].Address2 + '</p></a>'
                });
                $scope.markers.push(m);

                google.maps.event.addListener(m, 'click', function () {
                    info_window.setContent(this.html);
                    info_window.open($scope.map, this);
                });
            }


        }

        InitializeProducts();

        $scope.addProductWishlist = function (product) {
            if ($scope.userName && $scope.userName.length>0) {
                var img = $('#img_' + product.ProductId);
                flyToElement($(img), $('#wishlistTopLink'));
                userActionService.addUserWishlist($scope, $http, $scope.userName, product.ProductId)
                .then(function (response) {
                    $scope.wishlist = response.data;
                    $rootScope.wishlist = response.data;
                    product.FlagWishlist = true;
                    $rootScope.wishlistCount = response.data.length;
                });
            }
            else
            {
                $('#modal-container-Register').modal({
                    show: true
                });
                
            }
        }

        $scope.addToProductComparison = function (product) {
            var img = $('#img_' + product.ProductId);
            if ($rootScope.comparisonlist.length >= 4) {
                $scope.message = "Only 4 products can be compared."
                return;
            }
            flyToElement($(img), $('#compareTopLink'));

           var comparisonProduct= CreateComparisonListProductObject(product);

                if ($rootScope.comparisonlist.length < 4) {
                    $rootScope.comparisonlist.push(comparisonProduct);
                    localStorageService.set('comparisonlist', $rootScope.comparisonlist);
                    updateComparisonProductIdList();
                }

        }


        var CreateComparisonListProductObject = function(product)
        {
            var comparisonProduct = {};
            comparisonProduct.ProductId = product.ProductId;
            comparisonProduct.Name = product.Name;
            comparisonProduct.PictureName = product.PictureName;
            comparisonProduct.SpecialPrice = product.SpecialPrice;
            comparisonProduct.Price = product.Price;
            comparisonProduct.StoresCount = product.StoresCount;
            comparisonProduct.FlagWishlist = product.FlagWishlist;
            return comparisonProduct;
        }

        $scope.removeFromProductComparison = function (product) {
            var img = $('#img_' + product.ProductId);            
            flyToElement($('#compareTopLink'), $(img));
            
            var index = -1;

            for (var i = 0; i < $rootScope.comparisonlist.length;i++)
            {
                if($rootScope.comparisonlist[i].ProductId == product.ProductId)
                {
                    index = i;
                }
            }

            if (index > -1) {
                $rootScope.comparisonlist.splice(index, 1);
                localStorageService.set('comparisonlist', $rootScope.comparisonlist);
                updateComparisonProductIdList();
            }
        }
  
        $scope.loadMore = function () {           
            var lat = curLocationDiv.title;
            var lng = curLocationDiv.value;
            var mapRadius = $scope.searchRadius;
            var productFilterListSelected = [];

            if ($scope.showLoadMore) {
                for (var group in $scope.productFilterGroup) {
                    if ($scope.productFilterGroup[group].SelectedProductFilter) {
                        for (var i = 0; i < $scope.productFilterGroup[group].SelectedProductFilter.length; i++) {
                            productFilterListSelected.push({
                                FilterParameter: $scope.productFilterGroup[group].SelectedProductFilter[i].FilterParameter,
                                FilterValueText: $scope.productFilterGroup[group].SelectedProductFilter[i].FilterValueText
                            });
                        }
                    }
                }

                productService.getProducts($scope, $http, $scope.categoryId, $scope.selectedFilter, lat, lng, mapRadius, $scope.priceRangeFrom, $scope.priceRangeTo,
                       $scope.products.data.length + 1, $scope.itemsPerPage, productFilterListSelected)
                     .then(function (data) {
                         for (i = 0; i < data.data.length; i++) {
                             $scope.products.data.push(data.data[i]);
                         }
                         $scope.productDataLength = $scope.products.data.length;
                         $scope.showLoadMore = ($scope.products.totalCount > 0 && $scope.products.totalCount > $scope.productDataLength);
                         $scope.loadBusy = false;
                     });
                $scope.loadBusy = false;
           }
            
        };

        $scope.clearFilter = function()
        {            
            if ($scope.productFilterGroup) {
                for (var group in $scope.productFilterGroup) {
                    $scope.productFilterGroup[group].SelectedProductFilter = [];
                }
                $scope.selectedFilter.SelectedBrandList = [];
                $scope.onPricingFilterChanged();
            }
        }

        $scope.loadBusy = false;
        $(window).scroll(function () {
   
            var elem = document.getElementById("productListDiv");
            var elementBottom, remaining, shouldScroll, windowBottom;
            
            windowBottom = $(window).height() + $(window).scrollTop();
            if (elem) {
                elementBottom = elem.offsetTop + elem.scrollHeight;
                remaining = elementBottom - windowBottom;
                shouldScroll = remaining <= $(window).height() * 1;
                if (shouldScroll && !$scope.loadBusy) {
                    $scope.loadMore();
                    $scope.loadBusy = true;
                }
            }

        });
    }
}]);



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


app.controller('SearchProductsController', ['$rootScope', '$scope', '$http', '$routeParams','$q', '$cookieStore', 'productService', 'mapService', 'userActionService', '$location','breadcrumbs',
function ($rootScope, $scope, $http, $routeParams, $q, $cookieStore, productService, mapService, userActionService, $location, breadcrumbs) {
    {
        $scope.markers = [];
        $scope.searchedProduct = $routeParams.productFilter;
        $scope.searchedArea = $routeParams.areaName;
        $scope.searchRadius = $rootScope.defaultRadius;

        $scope.priceRangeFrom = 0;
        $scope.priceRangeTo = 100000;
        $scope.priceRange = [$scope.priceRangeFrom, $scope.priceRangeTo];
        $scope.itemsPerPage = 50;
        $scope.productDataLength = 0;
         
        $scope.searchFilter = {};
        $scope.searchFilter.data = {};
        $scope.searchFilter.data.Min = 0;
        $scope.searchFilter.data.Max = 100000;
        $scope.loadPriceRangeSlider = false;

        $scope.selectedFilter = {};
        $scope.selectedFilter.SelectedBrandList = [];
        $scope.dropdownBrandSettings = {
            enableSearch: true,
            scrollableHeight: '300px',
            scrollable: true,
            displayProp: 'BrandName',
            idProp: 'Id',
            externalIdProp: 'Id',
            smartButtonMaxItems: 2
        };

        $scope.selectedFilter.SortBy = {};
        $scope.dropdownSortData = [{ id: 1, label: "Stores Count" }, { id: 2, label: "Low Price" }, { id: 3, label: "High Price" }, { id: 4, label: "A to Z" }, { id: 5, label: "Z to A" }];
        $scope.dropdownSortSettings = {
            scrollableHeight: '200px',
            scrollable: true,
            displayProp: 'label',
            idProp: 'id',
            externalIdProp: 'id',
            smartButtonMaxItems: 1,
            selectionLimit: 1,
            showUncheckAll: true
        };

        $scope.dropdownBrandEvents =
            {
                onItemSelect: function (item) {
                    setTimeout(function () {
                        $scope.onPricingFilterChanged();
                    },1000)

                    
                },
                onItemDeselect: function (item) {
                    setTimeout(function () {
                        $scope.onPricingFilterChanged();
                    }, 1000)
                },
                onDeselectAll: function () {
                    $scope.selectedFilter.SortBy = {};
                    $scope.onPricingFilterChanged();
                }
            }

        $scope.filterBrandCustomTexts = { buttonDefaultText: 'Brand' };
        $scope.filterSortCustomTexts = { buttonDefaultText: 'Sort By', uncheckAll: 'Clear Sorting' };


        var zoomRadiusMappingObj = { 1: 14, 2: 14, 3: 14, 4: 13, 5: 13, 6: 12, 7: 12, 8: 12, 9: 12, 10: 12, 11: 11, 12: 11, 13: 11, 14: 11, 15: 11, 16: 11, 17: 11, 18: 11, 19: 11, 20: 11 }

        var curLocationDiv = document.getElementById("curLocation");
        if ($routeParams.lat != null && $routeParams.lng != null) {
            curLocationDiv.title = $routeParams.lat;
            curLocationDiv.value = $routeParams.lng;
        }
        var defLat = curLocationDiv.title;
        var defLng = curLocationDiv.value;
        if (defLat == null || defLat == "" || defLat === 'undefined') {
            defLat = 13.058312;
            defLng = 80.21195;
        }
        $scope.storeLocations = [];

        function InitializeSearchProducts() {
            loadFilters();
            loadProducts(defLat, defLng);
            
        }
        
        function loadFilters() {
            productService.getMinMaxForProductSearch($scope, $http, $routeParams.productFilter)
            .then(function (data) {
                $scope.searchFilter = data;
                if ($scope.searchFilter.data.Max > 0) {

                }
                else {
                    $scope.searchFilter.data.Min = 0;
                    $scope.searchFilter.data.Max = 100000;
                }
                $scope.loadPriceRangeSlider = true;
            });
        }


        function loadProducts(lat, lng) {
            var request = productService.searchCatalogue($scope, $http, $q, $routeParams.productFilter, null, lat, lng, $scope.searchRadius,
                $scope.priceRangeFrom, $scope.priceRangeTo, 1, $scope.itemsPerPage);
            $scope.searchProductRequests.push(request);
            request.promise.then(function (data) {
                 $scope.products = data;
                 if ($scope.products.data.length > 0) {
                     $scope.productDataLength = $scope.products.data.length;
                     $scope.products.totalCount = $scope.products.data[0].TotalCount;
                 }                
                 $scope.showLoadMore = ($scope.products.totalCount > 0 && $scope.products.totalCount > $scope.productDataLength);
                 var online = navigator.onLine;
                 if (online) {
                     //initially we need to have seperate controller for search, later to 
                     //be combined with prod list.
                     loadGoogleMap(defLat, defLng);
                 }
            }, function (reason) {
            });
        }

        $scope.onPricingFilterChanged = function () {

            var lat = curLocationDiv.title;
            var lng = curLocationDiv.value
            $scope.productDataLength = 0;
            updateProductList(lat, lng);
            getStoreLocations(lat, lng);

        }
        $scope.onProductFilterChanged = function () {
            var lat = curLocationDiv.title;
            var lng = curLocationDiv.value;

            $scope.productDataLength = 0;
            $scope.$parent.defaultRadius = $scope.searchRadius;

            updateProductList(lat, lng);
            getStoreLocations(lat, lng);
            $scope.circle.radius = $scope.searchRadius * 1000;
            $scope.circle.map = $scope.map;
            $scope.circle.setCenter(new google.maps.LatLng(lat, lng));
            UpdateMapZoom();
        }

        function UpdateMapZoom() {
            if ($scope.searchRadius < 21) {
                $scope.map.setZoom(zoomRadiusMappingObj[$scope.searchRadius])
            }
            else {
                $scope.map.setZoom(10)
            }
        }

        $scope.searchProductRequests = [];
        function updateProductList(lat, lng) {
            $scope.searchProductRequests = [];
            var request = productService.searchCatalogue($scope, $http, $q, $routeParams.productFilter,
                $scope.selectedFilter, lat, lng, $scope.searchRadius, $scope.priceRangeFrom, $scope.priceRangeTo, 1, $scope.itemsPerPage);
          //  clearSearchProductRequest(request);
            $scope.searchProductRequests.push(request);
            request.promise.then(function (data) {
                 $scope.products = data;
                 if ($scope.products.data.length > 0) {
                     $scope.products.totalCount = $scope.products.data[0].TotalCount;
                     $scope.productDataLength = $scope.products.data.length;
                 }
                 else
                 {
                     $scope.products.totalCount = 0;
                 }
                 $scope.showLoadMore = ($scope.products.totalCount > 0 && $scope.products.totalCount > $scope.productDataLength);
                 
            }, function (reason) {
            });
        }
        var clearSearchProductRequest = function (request) {
            $scope.searchProductRequests.splice($scope.searchProductRequests.indexOf(request), 1);
        }

        function getStoreLocations(lat, lng) {
            mapService.getStoreLocationsForSearch($scope, $http, $routeParams.productFilter, lat, lng, $scope.searchRadius, $scope.priceRangeFrom, $scope.priceRangeTo)
            .then(function (data) {
                $scope.storeLocations = data;
                if ($scope.storeLocations.data.length > 0) {
                    loadSearchStoreLocationsInMap();
                }
            });
        }

        function loadGoogleMap(lat, lng) {

            var mapOptions = {
                center: new google.maps.LatLng(lat, lng),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                panControl: false,
                streetViewControl: false,
                zoomControl: true,
                scrollwheel: false,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                }
            }
            var image = {
                url: 'Content/images/VBuy_map32.png',
                // This marker is 32 pixels wide by 50 pixels tall.
                size: new google.maps.Size(32, 60),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(18, 56)
            };

            $scope.map = new google.maps.Map(document.getElementById('map_canvassmall'), mapOptions);

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: $scope.map,
                draggable: true,
                icon: image,
                title: "Selected Area!.\n Drag to change center"
            });

            $scope.circle = new google.maps.Circle({
                center: new google.maps.LatLng(lat, lng),
                radius: $scope.searchRadius * 1000,
                strokeColor: "#138808",
                fillColor: "#FF9933",
                fillOpacity: 0.1,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                map: $scope.map
            });

            getStoreLocations(lat, lng);

            google.maps.event.addListener(marker, "drag", function (event) {
                var newLat = event.latLng.lat();
                var newLng = event.latLng.lng();
                $scope.circle.setCenter(new google.maps.LatLng(newLat, newLng));
            });

            google.maps.event.addListener(marker, "dragend", function (event) {
                var newLat = event.latLng.lat();
                var newLng = event.latLng.lng();
                //clear existing markers.
                ClearAllMarker();
                $scope.map.setCenter(new google.maps.LatLng(newLat, newLng));
                $scope.circle.setCenter(new google.maps.LatLng(newLat, newLng));
                getStoreLocations(newLat, newLng);
                updateProductList(newLat, newLng);
                curLocationDiv.title = newLat;
                curLocationDiv.value = newLng;

                var params = {
                    productFilter: $routeParams.productFilter,
                    lat: curLocationDiv.title,
                    lng: curLocationDiv.value
                }
            });
            google.maps.event.clearListeners(window, 'resize');
            UpdateMapZoom();
        }

        // Sets the map on all markers in the array.
        function ClearAllMarker() {
            for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setMap(null);
            }
        }

        $scope.showMap = function () {
            $('#modal-container-map').on('shown.bs.modal', function () {
                var lat = curLocationDiv.title;
                var lng = curLocationDiv.value;
                window.setTimeout(function () {
                    google.maps.event.trigger($scope.map, 'resize');
                    $scope.map.setCenter(new google.maps.LatLng(lat, lng));
                }, 0);
            });
            $('#modal-container-map').modal("show");
        }

        function loadSearchStoreLocationsInMap() {
            var info_window = new google.maps.InfoWindow({
                content: 'loading'
            });
            ClearAllMarker();
            for (var i = 0; i < $scope.storeLocations.data.length; i++) {
                var storeName = $scope.storeLocations.data[i].StoreName;

                var trimStoreName = storeName;
                if (storeName.length > 8) {
                    trimStoreName = storeName.substring(0, 7) + "..";
                }
                var styleIcon = new StyledIcon(StyledIconTypes.MARKER, { color: "#FF9933", fore: "#000080", text: trimStoreName });
                if (i < 5) {
                    styleIcon = new StyledIcon(StyledIconTypes.BUBBLE, { color: "#FF9933", fore: "#000080", text: trimStoreName });
                }

                var m = new StyledMarker({
                    map: $scope.map,
                    styleIcon: styleIcon,
                    animation: google.maps.Animation.DROP,
                    labelClass: "maplabels",
                    labelStyle: { opacity: 0.75 },
                    labelContent: $scope.storeLocations.data[i].StoreName,
                    title: $scope.storeLocations.data[i].StoreName,
                    position: new google.maps.LatLng($scope.storeLocations.data[i].Latitude, $scope.storeLocations.data[i].Longitude),
                    html: '<p><strong>' + $scope.storeLocations.data[i].BranchName + '</strong><br/>' + $scope.storeLocations.data[i].Address1
                        + ' , ' + $scope.storeLocations.data[i].Address2 + '</p>'
                });
                $scope.markers.push(m);

                google.maps.event.addListener(m, 'click', function () {
                    info_window.setContent(this.html);
                    info_window.open($scope.map, this);
                });
            }
        }

        InitializeSearchProducts();

        $scope.addProductWishlist = function (product) {
            if ($scope.userName && $scope.userName.length > 0) {
                var img = $('#img_' + product.ProductId);
                flyToElement($(img), $('#wishlistTopLink'));
                userActionService.addUserWishlist($scope, $http, $scope.userName, product.ProductId)
                .then(function (response) {
                    $scope.wishlist = response.data;
                    product.FlagWishlist = true;
                    $rootScope.wishlistCount = response.data.length;
                });
            }
            else {
                $('#modal-container-Register').modal({
                    show: true
                });

            }
        }

        $scope.addToProductComparison = function (product) {
            var img = $('#img_' + product.ProductId);
            if ($rootScope.comparisonlist.length >= 4) {
                $scope.message = "Only 4 products can be compared."
                return;
            }
            flyToElement($(img), $('#compareTopLink'));

            var comparisonProduct = CreateComparisonListProductObject(product);

            if ($rootScope.comparisonlist.length < 4) {
                $rootScope.comparisonlist.push(comparisonProduct);
                $cookieStore.put('comparisonlist', $rootScope.comparisonlist);
                updateComparisonProductIdList();
            }

        }

        var CreateComparisonListProductObject = function (product) {
            var comparisonProduct = {};
            comparisonProduct.ProductId = product.ProductId;
            comparisonProduct.Name = product.Name;
            comparisonProduct.PictureName = product.PictureName;
            comparisonProduct.SpecialPrice = product.SpecialPrice;
            comparisonProduct.Price = product.Price;
            comparisonProduct.StoresCount = product.StoresCount;
            comparisonProduct.FlagWishlist = product.FlagWishlist;
            return comparisonProduct;
        }

        $scope.removeFromProductComparison = function (product) {
            var img = $('#img_' + product.ProductId);
            flyToElement($('#compareTopLink'), $(img));

            var index = -1;

            for (var i = 0; i < $rootScope.comparisonlist.length; i++) {
                if ($rootScope.comparisonlist[i].ProductId == product.ProductId) {
                    index = i;
                }
            }

            if (index > -1) {
                $rootScope.comparisonlist.splice(index, 1);
                $cookieStore.put('comparisonlist', $rootScope.comparisonlist);
                updateComparisonProductIdList();
            }
        }

        function updateComparisonProductIdList() {
            $rootScope.comparisonlistProductId.splice(0, $rootScope.comparisonlistProductId.length);
            for (var i = 0; i < $rootScope.comparisonlist.length; i++) {
                $rootScope.comparisonlistProductId.push($rootScope.comparisonlist[i].ProductId);
            }

        }

        $scope.loadMore = function () {
            var lat = curLocationDiv.title;
            var lng = curLocationDiv.value;
            var mapRadius = $scope.searchRadius;
            var request = productService.searchCatalogue($scope, $http, $q, $routeParams.productFilter, $scope.selectedFilter, lat, lng, $scope.searchRadius, $scope.priceRangeFrom, $scope.priceRangeTo
                    , $scope.products.data.length + 1, $scope.itemsPerPage);
            $scope.searchProductRequests.push(request);
                 request.promise.then(function (data) {
                     for (i = 0; i < data.data.length; i++) {
                         $scope.products.data.push(data.data[i]);
                     }
                     $scope.productDataLength = $scope.products.data.length;
                     $scope.showLoadMore = ($scope.products.totalCount > 0 && $scope.products.totalCount > $scope.productDataLength);

                 }, function (reason) {
                 });

        };
    }

}]);
/// <reference path="productlistController.js" />
app.controller('UserWishlistController', ['$rootScope', '$scope', '$http', '$routeParams', 'productService', 'mapService', 'userActionService', '$modal', 'authService',
function ($rootScope, $scope, $http, $routeParams, productService, mapService, userActionService, $modal, authService) {
    {
        $scope.markers = [];
        $scope.searchRadius = $scope.$parent.defaultRadius;
        $scope.priceRangeFrom = 0;
        $scope.priceRangeTo = 100000;
        $scope.priceRange = [$scope.priceRangeFrom, $scope.priceRangeTo];
        $scope.itemsPerPage = 50;
        $scope.showLoadMore = false;
        $scope.productDataLength = 0;

        $scope.searchFilter = {};
        $scope.searchFilter.data = {};
        $scope.searchFilter.data.Min = 0;
        $scope.searchFilter.data.Max = 100000;
        $scope.loadPriceRangeSlider = false;


        var zoomRadiusMappingObj = { 1: 14, 2: 14, 3: 14, 4: 13, 5: 13, 6: 12, 7: 12, 8: 12, 9: 12, 10: 12, 11: 11, 12: 11, 13: 11, 14: 11, 15: 11, 16: 11, 17: 11, 18: 11, 19: 11, 20: 11 }

        var curLocationDiv = document.getElementById("curLocation");
        if ($routeParams.lat != null && $routeParams.lng != null) {
            curLocationDiv.title = $routeParams.lat;
            curLocationDiv.value = $routeParams.lng;
        }
        var defLat = curLocationDiv.title;
        var defLng = curLocationDiv.value;
        if (defLat == null || defLat == "" || defLat === 'undefined') {
            defLat = 13.058312;
            defLng = 80.21195;
        }
        $scope.storeLocations = [];

        $scope.searchedCategoryName = $routeParams.friendlyUrl;

        $scope.onPricingFilterChanged = function () {

            var lat = curLocationDiv.title;
            var lng = curLocationDiv.value;
            $scope.productDataLength = 0;
            updateProductList(lat, lng);
            getStoreLocations(lat, lng);

        }

        $scope.onProductFilterChanged = function () {
            var lat = curLocationDiv.title;
            var lng = curLocationDiv.value;
            $scope.productDataLength = 0;
            $scope.$parent.defaultRadius = $scope.searchRadius;

            updateProductList(lat, lng);
            getStoreLocations(lat, lng);

            $scope.circle.radius = $scope.searchRadius * 1000;
            $scope.circle.map = $scope.map;
            $scope.circle.setCenter(new google.maps.LatLng(lat, lng));

            UpdateMapZoom();
        }

        function UpdateMapZoom() {
            if ($scope.searchRadius < 21) {
                $scope.map.setZoom(zoomRadiusMappingObj[$scope.searchRadius])
            }
            else {
                $scope.map.setZoom(10)
            }
        }

        function InitializeProducts() {
            loadProducts(defLat, defLng);
        }

        function loadProducts(lat, lng) {
            //Here 1 is hardcoded now for item coumnt start.
            productService.getWishlistProducts($scope, $http, lat, lng, $scope.searchRadius, 1, $scope.itemsPerPage)
             .then(function (data) {
                 $scope.products = data;
                 if ($scope.products.data.length > 0) {
                     $scope.products.totalCount = $scope.products.data[0].TotalCount;
                     $scope.productDataLength = $scope.products.data.length;
                 }
                 $scope.showLoadMore = ($scope.products.totalCount > 0 && $scope.products.totalCount > $scope.productDataLength);
                 var online = navigator.onLine;
                 if (online) {
                     loadGoogleMap(defLat, defLng);
                 }
             });
        }

        function updateProductList(lat, lng) {
            var mapRadius = $scope.searchRadius;
            productService.getWishlistProducts($scope, $http, lat, lng, $scope.searchRadius, 1, $scope.itemsPerPage)
             .then(function (data) {
                 $scope.products = data;
                 if ($scope.products.data.length > 0) {
                     $scope.products.totalCount = $scope.products.data[0].TotalCount;
                     $scope.productDataLength = $scope.products.data.length;
                     $scope.showLoadMore = ($scope.products.totalCount > 0 && $scope.products.totalCount > $scope.productDataLength);
                 }
                 else {
                     $scope.products.totalCount = 0;
                 }
                 $scope.showLoadMore = ($scope.products.totalCount > 0 && $scope.products.totalCount > $scope.productDataLength);
             });
        }

        function getStoreLocations(lat, lng) {
            mapService.getStoreLocationsForWishlist($scope, $http, lat, lng, $scope.searchRadius)
            .then(function (data) {
                $scope.storeLocations = data;
                if ($scope.storeLocations.data.length > 0) {
                    loadCategoryStoreLocationsInMap();
                }
                else {
                    ClearAllMarker();
                }
            });
        }


        function loadGoogleMap(lat, lng) {

            var mapOptions = {
                center: new google.maps.LatLng(lat, lng),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                panControl: false,
                streetViewControl: false,
                zoomControl: true,
                scrollwheel: false,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                }
            }
            var image = {
                url: 'Content/images/VBuy_map32.png',
                // This marker is 32 pixels wide by 50 pixels tall.
                size: new google.maps.Size(32, 60),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(18, 56)
            };

            $scope.map = new google.maps.Map(document.getElementById('map_canvassmall'), mapOptions);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: $scope.map,
                draggable: true,
                icon: image,
                title: "Selected Area!.\n Drag to change center"
            });

            $scope.circle = new google.maps.Circle({
                center: new google.maps.LatLng(lat, lng),
                radius: $scope.searchRadius * 1000,
                strokeColor: "#138808",
                fillColor: "#FF9933",
                fillOpacity: 0.1,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                map: $scope.map
            });

            getStoreLocations(lat, lng);

            google.maps.event.addListener(marker, "drag", function (event) {
                var newLat = event.latLng.lat();
                var newLng = event.latLng.lng();
                $scope.circle.setCenter(new google.maps.LatLng(newLat, newLng));
            });

            google.maps.event.addListener(marker, "dragend", function (event) {
                var newLat = event.latLng.lat();
                var newLng = event.latLng.lng();
                //clear existing markers.
                ClearAllMarker();
                $scope.map.setCenter(new google.maps.LatLng(newLat, newLng));
                $scope.circle.setCenter(new google.maps.LatLng(newLat, newLng));
                getStoreLocations(newLat, newLng);
                updateProductList(newLat, newLng);
                curLocationDiv.title = newLat;
                curLocationDiv.value = newLng;

            });
            google.maps.event.clearListeners(window, 'resize');
            UpdateMapZoom();
        }

        $scope.showMap = function () {
            $('#modal-container-map').on('shown.bs.modal', function () {
                var lat = curLocationDiv.title;
                var lng = curLocationDiv.value;
                window.setTimeout(function () {
                    google.maps.event.trigger($scope.map, 'resize');
                    $scope.map.setCenter(new google.maps.LatLng(lat, lng));
                }, 0);
            });
            $('#modal-container-map').modal("show");
        }

        // Sets the map on all markers in the array.
        function ClearAllMarker() {
            for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setMap(null);
            }
        }

        function loadCategoryStoreLocationsInMap() {
            var info_window = new google.maps.InfoWindow({
                content: 'loading'
            });
            ClearAllMarker();
            for (var i = 0; i < $scope.storeLocations.data.length; i++) {
                var storeName = $scope.storeLocations.data[i].StoreName;

                var trimStoreName = storeName;
                if (storeName.length > 8) {
                    trimStoreName = storeName.substring(0, 7) + "..";
                }
                var styleIcon = new StyledIcon(StyledIconTypes.MARKER, { color: "#FF9933", fore: "#000080", text: trimStoreName });
                if (i < 5) {
                    styleIcon = new StyledIcon(StyledIconTypes.BUBBLE, { color: "#FF9933", fore: "#000080", text: trimStoreName });
                }

                var m = new StyledMarker({
                    map: $scope.map,
                    styleIcon: styleIcon,
                    animation: google.maps.Animation.DROP,
                    labelClass: "maplabels",
                    labelStyle: { opacity: 0.75 },
                    labelContent: $scope.storeLocations.data[i].StoreName,
                    title: $scope.storeLocations.data[i].StoreName,
                    position: new google.maps.LatLng($scope.storeLocations.data[i].Latitude, $scope.storeLocations.data[i].Longitude),
                    html: '<p><strong>' + $scope.storeLocations.data[i].BranchName + '</strong><br/>' + $scope.storeLocations.data[i].Address1
                        + ' , ' + $scope.storeLocations.data[i].Address2 + '</p>'
                });
                $scope.markers.push(m);

                google.maps.event.addListener(m, 'click', function () {
                    info_window.setContent(this.html);
                    info_window.open($scope.map, this);
                });
            }
        }

        InitializeProducts();

        $scope.removeProductWishlist = function (product) {
            if ($scope.userName && $scope.userName.length > 0) {
                var img = $('#img_' + product.ProductId);
                flyToElement($(img), $('#wishlistTopLink'));
                userActionService.removeUserWishlist($scope, $http, $scope.userName, product.ProductId)
                .then(function (response) {
                    $scope.wishlist = response;
                    product.FlagWishlist = false;
                    $rootScope.wishlistCount = response.data.length;
                    var lat = curLocationDiv.title;
                    var lng = curLocationDiv.value;
                    updateProductList(lat, lng);
                });
            }
            else {
                // Show a basic modal
                var myModal = $modal({ title: 'Login for adding Wishlist', content: 'You must login or create an account to add wishlist', show: true });
            }
        }

        $scope.addProductWishlist = function (product) {
            if ($scope.userName && $scope.userName.length > 0) {
                var img = $('#img_' + product.ProductId);
                flyToElement($(img), $('#wishlistTopLink'));
                userActionService.addUserWishlist($scope, $http, $scope.userName, product.ProductId)
                .then(function (response) {
                    $scope.wishlist = response.data;
                    $rootScope.wishlistCount = response.data.length;
                    product.FlagWishlist = true;                  
                });
            }            
        }

        $scope.loadMore = function () {
            var lat = curLocationDiv.title;
            var lng = curLocationDiv.value;
            var mapRadius = $scope.searchRadius;
            productService.getWishlistProducts($scope, $http, lat, lng, mapRadius, $scope.products.data.length + 1, $scope.itemsPerPage)
                 .then(function (data) {
                     for (i = 0; i < data.data.length; i++) {
                         $scope.products.data.push(data.data[i]);
                     }
                     $scope.productDataLength = $scope.products.data.length;
                     $scope.showLoadMore = ($scope.products.totalCount > 0 && $scope.products.totalCount > $scope.productDataLength);

                 });

        };
    }
}]);