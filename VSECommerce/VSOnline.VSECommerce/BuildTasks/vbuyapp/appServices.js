app.factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};
       
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            var authService = $injector.get('authService');
            var authData = localStorageService.get('authorizationData');

            if (authData) {
                if (authData.useRefreshTokens) {
                    $location.path('/refresh');
                    return $q.reject(rejection);
                }
            }
            //We cannot logout for authorization failure. Only for no authentication logout can happen. 
            authService.logOut();
          //  $location.path('/login');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);
app.factory('authService', ['$rootScope', '$http', '$q', 'localStorageService', function ($rootScope, $http, $q, localStorageService) {

    var endPoint = '/VBuy/api/Login';

    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false
    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: ""
    };

    var RegisterUser = function (registration) {

        LogOut();

        return $http.post(endPoint + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var LoginWithFacebook = function (accessToken, email) {

        var data = "grant_type=social_login&tokenOrigin=facebook" + "&access_token=" + accessToken;
        return VBuyClientLogin(data, email)
    };

    var LoginWithGoogle = function (accessToken, email, expires_in, expires_at, token_type, issued_at) {

        var data = "grant_type=social_login&tokenOrigin=google" + "&access_token=" + accessToken
        + "&expires_in=" + expires_in
         + "&expires_at=" + expires_at
         + "&token_type=" + token_type
         + "&issued_at=" + issued_at
        return VBuyClientLogin(data, email)
    };

    var Login = function (loginData) {
       
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
        return VBuyClientLogin(data, loginData.userName)

    };

    function VBuyClientLogin(data, userName)
    {
        var deferred = $q.defer();

        $http.post('/VBuy/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            localStorageService.set('authorizationData', { token: response.access_token, userName: userName, refreshToken: "", useRefreshTokens: false });
            _authentication.isAuth = true;
            _authentication.userName = userName;

            deferred.resolve(response);

        }).error(function (err, status) {
            LogOut();
            deferred.reject(err);
        });

        return deferred.promise;
    }

    var LogOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.useRefreshTokens = false;

        localStorageService.remove('userName');
        localStorageService.remove('flagLoggedIn');
        localStorageService.remove('curUserDisplayName');

        $rootScope.flagLoggedIn = false;

        if(gapi && gapi.auth)
        {
            gapi.auth.signOut();
        }
        
    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.useRefreshTokens = authData.useRefreshTokens;
        }

    };

    var _refreshToken = function () {
        var deferred = $q.defer();

        var authData = localStorageService.get('authorizationData');

        if (authData) {

            if (authData.useRefreshTokens) {

                var data = "grant_type=";
                //"grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                localStorageService.remove('authorizationData');

                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                    deferred.resolve(response);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });
            }
        }

        return deferred.promise;
    };

    var _obtainAccessToken = function (externalData) {

        var deferred = $q.defer();

        $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _registerExternal = function (registerExternalData) {

        var deferred = $q.defer();

        $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

   // authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = Login;
    authServiceFactory.loginWithFacebook = LoginWithFacebook;
    authServiceFactory.loginWithGoogle = LoginWithGoogle
    authServiceFactory.logOut = LogOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.refreshToken = _refreshToken;

    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _fillAuthData;
    authServiceFactory.registerExternal = _registerExternal;

    return authServiceFactory;
}]);
app.service('cartService', function () {

    var endPoint = '/VBuy/api/Cart';
    var endPointCheckout = '/VBuy/api/CheckOut';

    this.getOrderConfirmationDetails = function ($http, orderid, userName) {

        var config = {
            params: { orderId: orderid, userName: userName }
        };

        return $http.get(endPointCheckout + '/GetOrderConfirmationDetails/', config);
    }

    this.generateOrder = function ($http, shoppingCartItemModelList, userName, paymentMethod, deliveryMethod, couponCode)
    {
        var shoppingCartItemListDTO = {
            shoppingCartDTOList: shoppingCartItemModelList,
            userName: userName,
            paymentMethod: paymentMethod,
            deliveryMethod: deliveryMethod,
            couponCode: couponCode
        };
       
        return $http.post(endPointCheckout + '/CreateOrderForCart/', shoppingCartItemListDTO);
    }

    this.initiatePaymentForOrder = function($http, userName, orderid)
    {
        var config = {
            params: { orderId: orderid, userName: userName }
        };

        return $http.get(endPointCheckout + '/InitiatePaymentGateway/', config);
    }
    

    this.addShoppingCartItem = function ($http, shoppingCartItemModel, userName) {

        var shoppingCartItem = {
            ProductId :shoppingCartItemModel.ProductId,
            BranchId : shoppingCartItemModel.BranchId,
            UnitPrice: shoppingCartItemModel.SpecialPrice,
            Quantity: shoppingCartItemModel.Quantity,
            AdditionalShippingCharge: shoppingCartItemModel.AdditionalShippingCharge,
            UserName: userName,
            SelectedSize : shoppingCartItemModel.SelectedSize
        }

        return $http.post(endPoint + '/AddShoppingCartItem/', shoppingCartItem);
    }

    this.addShoppingCartItemList = function ($http, shoppingCartItemModelList, userName) {        
        var shoppingCartItemListDTO = { shoppingCartDTOList: shoppingCartItemModelList, userName: userName };
            return $http.post(endPoint + '/AddShoppingCartItemList/', shoppingCartItemListDTO);
    }

    this.updateCartItemQuantity = function ($http, shoppingCartItemModel, userName)
    {
        var shoppingCartItem = {
            ProductId: shoppingCartItemModel.ProductId,
            BranchId: shoppingCartItemModel.BranchId,
            UnitPrice: shoppingCartItemModel.SpecialPrice,
            Quantity: shoppingCartItemModel.Quantity,
            AdditionalShippingCharge: shoppingCartItemModel.AdditionalShippingCharge,
            UserName: userName
        }

        return $http.post(endPoint + '/UpdateCartItemQuantity/', shoppingCartItem);
    }

    this.getCartDiscount = function($http, shoppingCartItemModelList, userName, couponCode)
    {
         var config = {
            params: { userName: userName, couponCode: couponCode }
        };
         return $http.get(endPointCheckout + '/GetCartDiscount/', config);
    }

    this.removeShoppingCartItem = function ($http, shoppingCartItemModel, userName) {

        var shoppingCartItem = {
            ProductId: shoppingCartItemModel.ProductId,
            BranchId: shoppingCartItemModel.BranchId,
            UnitPrice: shoppingCartItemModel.SpecialPrice,
            Quantity: shoppingCartItemModel.Quantity,
            AdditionalShippingCharge: shoppingCartItemModel.AdditionalShippingCharge,
            UserName: userName
        }

        return $http.post(endPoint + '/RemoveShoppingCartItem/', shoppingCartItem);
    }

    this.getShoppingCartItems = function ($http, userName)
    {
        var config = {
            params: { userName: userName }
        };

        return $http.get(endPoint + '/GetShoppingCartItems/', config);
    }

    this.getBuyerAddress = function($http, userName)
    {
        var config = {
            params: { userName: userName }
        };

        return $http.get(endPoint + '/GetBuyerAddress/', config);
    }

    this.addBuyerAddress = function ($http, addressModel, userName) {

        addressModel.UserName = userName;
        return $http.post(endPoint + '/AddBuyerAddress/', addressModel);
    }

});
app.service('categoryService', function () {

    var endPoint = '/VBuy/api/Admin';

    this.getAllCategory = function ($scope, $http) {
        var config = {
            headers: { "CommandType": "GetAllCategory" }
        };
        $scope.app = {};
        $http.get(endPoint, config)
         .success(function (data, status, headers) {
             $scope.app.category = data;             
         }).error(function () {
             $scope.app.error = 'something\'s broken';
         });;
        return $scope.app.category;
    };


});
app.service('landingService', function () {

    var endPoint = '/VBuy/api/Landing';
    var curLocationDiv = document.getElementById("curLocation");

    this.getAppData = function ($http)
    {
        var config = {
            headers: { "CommandType": "GetApplicationData" }
        };
        return $http.get(endPoint + '/GetApplicationData', config);
    }

    this.getMainMenu = function ($scope, $http) {
        var config = {
            headers: { "CommandType": "GetMainMenu" }
        };
        return $http.get(endPoint + '/GetMainMenu', config);
    }


    this.getSearchProductList = function ($scope, $http, $q, query) {
        //var canceller = $q.defer()
        //canceller.resolve("cancel prev request");
        //var config = {
        //    headers: { "CommandType": "GetSearchProductsFilter" },
        //    params: { searchString: query }
        //};

        //return $http.get(endPoint + '/GetSearchProductsFilter', config);

        var canceller = $q.defer();

        var cancel = function (reason) {
            canceller.resolve(reason);
        };

        var promise =
             $http.get(endPoint + '/GetSearchProductsFilter', {
                 timeout: canceller.promise,
                 headers: { "CommandType": "GetSearchProductsFilter" },
                 params: { searchString: query }
             })
                .then(function (response) {
                    return response.data;
                });

        return {
            promise: promise,
            cancel: cancel
        };

    }

    this.getFeaturedProducts = function ($scope, $http) {
        var config = {
            headers: { "CommandType": "GetFeaturedProducts" }
        };
        return $http.get(endPoint + '/GetFeaturedProducts', config);
    }

    this.getTopSellingProductList1 = function ($scope, $http) {
        return $http.get(endPoint + '/GetTopSellingProductList1');
    }

    this.getHomeBannerSettings = function ($scope, $http) {
        return $http.get(endPoint + '/GetHomeBannerSettings');
    }

    this.topSellingProductList2 = function ($scope, $http) {
        return $http.get(endPoint + '/GetPersonalizedProductList1');
    }

    this.getTopCategoriesList = function ($scope, $http)
    {
        return $http.get(endPoint + '/GetTopCategoriesList');
    }

    this.loadLocationList = function ($scope, $http) {
        var config = {
            headers: { "CommandType": "GetSearchAreaFilter" },
            params:{city:'Chennai'}
        };
        return $http.get(endPoint + '/GetSearchAreaFilter', config);
    }

    this.loadCurrentLocation = function ($scope, $http) {

        if (!curLocationDiv.title)
        {
            curLocationDiv.title = $scope.$parent.defaultLat;
            curLocationDiv.value = $scope.$parent.defaultLng;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, errorCallbackNavigator);
        } else {
            document.getElementById("areaSearchInput").value = 'Chennai';
        }

        function showPosition(position) {
            curLocationDiv.title = position.coords.latitude;
            curLocationDiv.value = position.coords.longitude;

            var params = {
                latlng: position.coords.latitude + ',' + position.coords.longitude, sensor: false
            };

            $http.get('http://maps.googleapis.com/maps/api/geocode/json', { params: params })
            .then(function (res) {
                if (res.data.results.length > 0) {                     
                    $scope.currentAddress = res.data.results[0].formatted_address;
                    $scope.$parent.currentAddress = $scope.currentAddress;
                    document.getElementById("areaSearchInput").value = $scope.currentAddress;
                }
                else
                {
                    if (!$scope.selectedArea) {
                        document.getElementById("areaSearchInput").value = 'Chennai';
                    }
                }
            });
        }

        function errorCallbackNavigator(error)
        {
            if (!$scope.selectedArea) {
                document.getElementById("areaSearchInput").value = 'Chennai';
            }
        }
    }  
    
});
app.service('mapService', function () {

    var endPoint = '/VBuy/api/LocationMap';

    this.getStoreLocationsForCategory = function ($scope, $http, catId, lat, lng, mapRadius, priceRangeFrom, priceRangeTo) {
        var config = {     
            params: { id: catId, lat: lat, lng: lng, mapRadius: mapRadius }
        };
        if (priceRangeTo>0) {
            config.params["priceRangeFrom"] = priceRangeFrom;
            config.params["priceRangeTo"] = priceRangeTo;
        }
        return $http.get(endPoint + '/GetCategoryStoreLocations/', config);
    }

    this.getStoreLocationsForProduct = function ($scope, $http, productId, lat, lng,mapRadius) {
        var config = {
            headers: { "CommandType": "GetProductStoreLocations" },
            params: { id: productId, lat: lat, lng: lng, mapRadius: mapRadius }
        };
        return $http.get(endPoint + '/GetProductStoreLocations/', config);
    }

    this.getStoreLocationsForSearch = function ($scope, $http, productFilter, lat, lng, mapRadius, priceRangeFrom, priceRangeTo) {
        var config = {
            params: { productFilter: productFilter, lat: lat, lng: lng, mapRadius: mapRadius }
        };
        if (priceRangeTo > 0) {
            config.params["priceRangeFrom"] = priceRangeFrom;
            config.params["priceRangeTo"] = priceRangeTo;
        }
        return $http.get(endPoint + '/GetSearchStoreLocations/', config);
    }

    this.getStoreLocationsForWishlist = function ($scope, $http, lat, lng, mapRadius) {
        var config = {
            params: { lat: lat, lng: lng, mapRadius: mapRadius }
        };
       
        return $http.get(endPoint + '/GetWishlistStoreLocations/', config);
    }

     
});
app.service('orderTrackingService', function ()
{
    var endPoint = '/VBuy/api/OrderTracking';
    this.getTrackingOrders = function ($scope, $http) {
      
        var config = {
            headers: { "CommandType": "GetTrackingOrders" },
           
        };
        return $http.get(endPoint + '/GetTrackingOrders', config);
    }
    this.GetOrdersList = function ($scope, $http) {

        var config = {
            headers: { "CommandType": "GetOrdersList" },

        };
        return $http.get(endPoint + '/GetOrdersList', config);
    }

    this.GetProductList = function ($scope, $http, orderId) {
      
        var config = {
            headers: { "CommandType": "GetProductList" },
            params: { OrderId: orderId }
        };
        return $http.get(endPoint + '/GetProductList', config);
    }
    this.CancelOrders = function ($scope, $http, orderId) {
     
        var config = {
            headers: { "CommandType":"CancelOrders" },
            params: { OrderId:orderId }
        };
        return $http.get(endPoint +'/CancelOrders', config);
    }
    this.SearchOrders = function ($scope, $http, orderId) {

        var config = {
            headers: { "CommandType": "SearchOrders" },
            params: { OrderId:orderId}
        };
        return $http.get(endPoint + '/SearchOrders', config);
    }
    this.PagingOrders = function ($scope, $http, page) {

        var config = {
            headers: { "CommandType": "GetPagingOrders" },
            params: {PageId:page}
        };
        return $http.get(endPoint + '/GetPagingOrders', config);
    }
    
});
app.service('passwordService', function () {
    var endPoint = '/VBuy/api/Login';

            this.forgotPassword = function ($scope, $http, userEmail){
                var config = {
                    params: { username: userEmail }
                };

                return $http.get(endPoint + '/ForgotPassword', config);
                    
            }
            this.resetPassword = function ($scope, $http, username, password) {
                var resetPasswordDTO =  { UserName : username, UniqueId :$scope.uid , Password :password}
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
app.service('productService', function () {

    var endPoint = '/VBuy/api/Products';

     this.getRatings = function($scope, $http, productId){
        var config = {
            params: { productId: productId }
        };
        return $http.get(endPoint + '/GetProductRating/', config);
    }

    this.updateRatings = function($scope, $http, userName, productId, rating){
        var config = {
            params: { productId: productId, rating: rating, userName: userName }
        };
        return $http.get(endPoint + '/UpdateProductRating/', config);
    }

    //this.getProducts = function ($scope, $http, categoryId, selectedFilter, lat, lng, mapRadius, priceRangeFrom, priceRangeTo, pageStart, pageSize) {

    //    var productParameterFilterSet = { id: categoryId, filter: selectedFilter, lat: lat, lng: lng, mapRadius: mapRadius, pageStart: pageStart, pageSize: pageSize }
       
    //    var config = {
    //        headers: { "CommandType": "GetProducts_N" }
    //    };

    //    if (selectedFilter) {
    //        selectedFilter.SelectedBrandIdList = [];
    //        for (i = 0; i < selectedFilter.SelectedBrandList.length; i++) {
    //            selectedFilter.SelectedBrandIdList.push(selectedFilter.SelectedBrandList[i].Id);
    //        }

    //        if (selectedFilter.SortBy && selectedFilter.SortBy.id) {
    //            selectedFilter.SortById = selectedFilter.SortBy.id;
    //        }
    //        else {
    //            selectedFilter.SortById = 0;
    //        }
    //            productParameterFilterSet["filter"] = selectedFilter;
    //    }
    //    if (priceRangeTo > 0) {
    //        productParameterFilterSet["priceRangeFrom"] = priceRangeFrom;
    //        productParameterFilterSet["priceRangeTo"] = priceRangeTo;
    //    }
    //    return $http.post(endPoint + '/GetProducts_N/', productParameterFilterSet, config);
    //}

    this.getProducts = function ($scope, $http, categoryId, selectedFilter, lat, lng, mapRadius, priceRangeFrom, priceRangeTo, pageStart, pageSize
        , productFilterListSelected) {

        var productParameterFilterSet = {
            id: categoryId, filter: selectedFilter, lat: lat, lng: lng, mapRadius: mapRadius, pageStart: pageStart, pageSize: pageSize
        , selectedProductFilter: productFilterListSelected
        }

        var config = {
            headers: { "CommandType": "GetProducts_J" }
        };

        if (selectedFilter) {
            selectedFilter.SelectedBrandIdList = [];
            for (i = 0; i < selectedFilter.SelectedBrandList.length; i++) {
                selectedFilter.SelectedBrandIdList.push(selectedFilter.SelectedBrandList[i].Id);
            }

            if (selectedFilter.SortBy && selectedFilter.SortBy.id) {
                selectedFilter.SortById = selectedFilter.SortBy.id;
            }
            else {
                selectedFilter.SortById = 0;
            }
            productParameterFilterSet["filter"] = selectedFilter;
        }
        if (priceRangeTo > 0) {
            productParameterFilterSet["priceRangeFrom"] = priceRangeFrom;
            productParameterFilterSet["priceRangeTo"] = priceRangeTo;
        }
        return $http.post(endPoint + '/GetProducts_J/', productParameterFilterSet, config);
    }

    this.getWishlistProducts = function ($scope, $http, lat, lng, mapRadius, pageStart, pageSize) {
        var config = {
            params: {lat: lat, lng: lng, mapRadius: mapRadius, pageStart: pageStart, pageSize: pageSize }
        };
        
        return $http.get(endPoint + '/GetUserWishlistProducts/', config);
    }

    this.getMinMaxForProductCategory = function($scope, $http, categoryId)
    {
        var config = {
            params: { id: categoryId }
        };
        return $http.get(endPoint + '/GetMinMaxForProductCategory/', config);
    }

    this.getFiltersForProductCategory = function ($scope, $http, categoryId) {
        var config = {
            params: { id: categoryId }
        };
        return $http.get(endPoint + '/GetFiltersForProductCategory/', config);
    }

    this.getMinMaxForProductSearch = function ($scope, $http, productFilter) {
        var config = {
            params: { search: productFilter }
        };
        return $http.get(endPoint + '/GetMinMaxForProductSearch/', config);
    }

    this.getProductSpecification = function ($scope, $http,  productId) {
        var config = {
            params: { id: productId}
        };
        return $http.get(endPoint + '/GetProductSpecification/', config);
    }

    this.getProductKeyFeatures = function ($scope, $http, productId) {
        var config = {
            params: { id: productId }
        };
        return $http.get(endPoint + '/GetProductKeyFeatures/', config);
    }
    
    this.searchCatalogue = function ($scope, $http, $q, productFilter, selectedFilter, lat, lng, mapRadius, priceRangeFrom, priceRangeTo, pageStart, pageSize) {
        //var config = {
        //    params: { productFilter: productFilter, lat: lat, lng: lng, mapRadius: mapRadius, pageStart: pageStart, pageSize: pageSize }
        //};
        //if (priceRangeTo > 0) {
        //    config.params["priceRangeFrom"] = priceRangeFrom;
        //    config.params["priceRangeTo"] = priceRangeTo;
        //}
        //return $http.get(endPoint + '/SearchCatalogue', config);

        var productSearchFilterSet = {
            productFilter: productFilter, filter: selectedFilter,
            lat: lat, lng: lng, mapRadius: mapRadius, pageStart: pageStart, pageSize: pageSize
        }

        var config = {
            headers: { "CommandType": "SearchCatalogue_N" }
        };

        if (selectedFilter) {
            selectedFilter.SelectedBrandIdList = [];
            for (i = 0; i < selectedFilter.SelectedBrandList.length; i++) {
                selectedFilter.SelectedBrandIdList.push(selectedFilter.SelectedBrandList[i].Id);
            }

            if (selectedFilter.SortBy && selectedFilter.SortBy.id) {
                selectedFilter.SortById = selectedFilter.SortBy.id;
            }
            else
            {
                selectedFilter.SortById = 0;
            }

            if (selectedFilter.SelectedBrandIdList.length > 0) {
                productSearchFilterSet["filter"] = selectedFilter;
            }
        }
        if (priceRangeTo > 0) {
            productSearchFilterSet["priceRangeFrom"] = priceRangeFrom;
            productSearchFilterSet["priceRangeTo"] = priceRangeTo;
        }

        var canceller = $q.defer();

        var cancel = function (reason) {
            canceller.resolve(reason);
        };
        var promise = $http.post(endPoint + '/SearchCatalogue_N/', productSearchFilterSet, config);

        return {
            promise: promise,
            cancel: cancel
        };
    }

    this.getProductDetails = function ($scope, $http, productId, flagLocationBased, lat, lng, mapRadius) {
        var config = {
            params: { id: productId, flaglocation: flagLocationBased, lat: lat, lng: lng, mapRadius: mapRadius }
        };
        return $http.get(endPoint + '/GetProductDetails/', config);
    }

    this.getAllOffers = function ($scope, $http, lat, lng) {
        var config = {
            params: { lat: lat, lng: lng, radius:20 }
        };
        return $http.get(endPoint + '/GetAllOffers', config);
    }

    this.getTopOffers = function ($scope, $http, lat, lng) {
        var config = {
            params: { lat: lat, lng: lng,radius:20 ,limit:12  }
        };
        return $http.get(endPoint + '/GetTopOffers', config);
    }

    this.contactSeller = function ($scope, $http, name, email, mobile, subject, branchid, productId)
    {
        var productContactResultSet = { Name: name, Email: email, Mobile: mobile, Subject: subject, Branchid: branchid, ProductId: productId };
        var config = {
            headers: { "CommandType": "ContactSeller" }
        };
        
        return $http.post(endPoint + '/ContactSeller/', productContactResultSet, config);
    }


    this.compareProduct = function($scope,$http,productIds)
    {
        var prdIds = new Array(productIds);

        var config = {
            params: { ids: prdIds.toString() }
        };
        
        return $http.get(endPoint + '/GetProductComparison/', config);
    }

    this.compareProductDetailedSpecification = function ($scope, $http, productIds) {
        var prdIds = new Array(productIds);

        var config = {
            params: { ids: prdIds.toString() }
        };

        return $http.get(endPoint + '/GetProductDetailedComparison/', config);
    }
});
app.service('storesService', function () {

    var endPoint = '/VBuy/api/Stores';

    this.getStoreInfo = function ($http, storeId)
    {

        return $http.get(endPoint + '/GetStoreInfo/' + storeId);
    }   

    this.getFilter = function ($http, storeId, productId) {
        var config = {
            params: { storeId: storeId, productId: productId }
        };
        return $http.get(endPoint + '/GetStoresProductFilter', config);
    }

    this.getStoreProducts = function ($scope, $http) {
        $scope.filters.storeId = $scope.StoreInfo.StoreId;
        $scope.filters.selectedBranchId = $scope.selectedBranchId
        var config = {
            params: $scope.filters
        };
        return $http.get(endPoint + '/GetStoreProducts', config);
    }

    this.getRatings = function ($scope, $http, branchId) {
        var config = {
            params: { branchId: branchId }
        };
        return $http.get(endPoint + '/GetBranchRating/', config);
    }

    this.updateRatings = function ($scope, $http, userName, branchId, rating) {
        var config = {
            params: { branchId: branchId, rating: rating, userName: userName }
        };
        return $http.get(endPoint + '/UpdateBranchRating/', config);
    }
});
app.service('userActionService', function () {

    var endPoint = '/VBuy/api/UserAction';
    var endPointUserRegister = '/VBuy/api/Login';

    this.getUserWishlist = function ($scope, $http, userName)
    {
        var config = {
            params: { userName: userName}
        };
          return $http.get(endPoint + '/GetUserWishlist/' , config);
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