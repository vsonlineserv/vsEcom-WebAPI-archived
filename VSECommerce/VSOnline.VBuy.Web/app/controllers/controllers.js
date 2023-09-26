////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.controller('NavbarController', ['$scope', '$location', '$http',
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