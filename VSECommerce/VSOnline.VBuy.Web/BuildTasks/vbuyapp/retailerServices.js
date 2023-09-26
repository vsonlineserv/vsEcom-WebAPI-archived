app_retailer.factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

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
            authService.logOut();
            $location.path('/login');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);
app_retailer.factory('authService', ['$rootScope', '$http', '$q', 'localStorageService', function ($rootScope, $http, $q, localStorageService) {

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

    var RegisterRetailer = function (registration) {

        LogOut();

        return $http.post(endPoint + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var Login = function (loginData) {
       
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post('/VBuy/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });
            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;

            deferred.resolve(response);

        }).error(function (err, status) {
            LogOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var LogOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.useRefreshTokens = false;

        $rootScope.flagLoggedIn = false;
        
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
    authServiceFactory.logOut = LogOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.refreshToken = _refreshToken;

    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _fillAuthData;
    authServiceFactory.registerExternal = _registerExternal;

    return authServiceFactory;
}]);
app_retailer.service('ordersService', function () {

    var endPoint = '/VBuy/api/RetailerOrder';
    this.getPendingOrders = function ($scope, $http, branch, pageSize, pageNo)
    {
       
        var config = {
            headers: { "CommandType": "GetPendingOrderHistory" },
            params: { branchId: branch,PageSize:pageSize,PageNo:pageNo}
        };
        return $http.get(endPoint + '/GetPendingOrderHistory', config);
    }
    this.GetTotalOrders = function ($scope, $http, branch) {
     
        var config = {
            headers: { "CommandType": "GetTotalOrders" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetTotalOrders', config);
    }
    this.getorders = function ($scope, $http, branch, order)
    {
       
        var config = {
            headers: { "CommandType": "GetOrders" },
            params: {branchId:branch,orderId:order}
        };
        return $http.get(endPoint + '/GetOrders', config);
    }
    this.getOrderSearch = function ($scope, $http, branch, orderStatus, orderid, paymentStatus)
    {
       
        var config = {
            headers: { "CommandType":"GetOrdersSearch" },
            params: { branchId: branch, order: orderid, Status: orderStatus }
        };
        return $http.get(endPoint +'/GetOrdersSearch', config);
    }
    this.getOrdersSummary = function ($scope, $http, branch) {
       
        var config = {
            headers: { "CommandType": "GetOrdersSummary" },
            params: { branchId: branch}
        };
        return $http.get(endPoint + '/GetOrdersSummary', config);
    }

    this.getOrderSummaryByCategory = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetOrderSummaryByCategory" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetOrderSummaryByCategory', config);
    }

    this.getOrderSummaryByProduct = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetOrderSummaryByProduct" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetOrderSummaryByProduct', config);
    }

    this.getOrderCountByStatus = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetOrderCountSplitByStatus" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetOrderCountSplitByStatus', config);
    }

    this.getLast7DaysSalesChart = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetLast7DaysSalesChart" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetLast7DaysSalesChart', config);
    }

    this.getLast6MonthsSalesChart = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetLast6MonthsSalesChart" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetLast6MonthsSalesChart', config);
    }
    
    this.getBranchProductSummary = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetBranchProductSummary" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetBranchProductSummary', config);
    }

    this.getBranchEnquirySummary = function ($scope, $http, branch) {

        var config = {
            headers: { "CommandType": "GetBranchEnquirySummary" },
            params: { branchId: branch }
        };
        return $http.get(endPoint + '/GetBranchEnquirySummary', config);
    }

    

    this.getOrderStatus = function ($scope, $http) {

        var config = {
            headers: { "CommandType":"GetOrderStatus" }
          
        };
        return $http.get(endPoint +'/GetOrderStatus', config);
    }

    this.printOrderDetails = function ($http, orderId) {

        var config = {
            headers: { "CommandType": "PrintOrderDetails" },
            params: { orderId: orderId}

        };
        return $http.get(endPoint + '/PrintOrderDetails', config);
    }

    this.GetPaymentOption= function ($scope, $http) {

        var config = {
            headers: { "CommandType": "GetPaymentOption" }

        };
        return $http.get(endPoint + '/GetPaymentOption', config);
    }

    this.UpdateOrderStatus= function($scope, $http, subOrderId, OrderId, statusId)
    {
        var config = {
            headers: { "CommandType": "UpdateOrderStatus" }

        };
        var orderStatusUpdate = { subOrderId: subOrderId, orderId: OrderId, statusId: statusId };
        return $http.post(endPoint + '/UpdateOrderStatus/', orderStatusUpdate, config);
        
    }

    this.UpdatePaymentStatus = function ($scope, $http, subOrderId, OrderId, statusId) {
        var config = {
            headers: { "CommandType": "UpdateOrderStatus" }

        };
        var orderStatus = { subOrderId: subOrderId, orderId: OrderId, statusId: statusId };
        return $http.post(endPoint + '/UpdateOrderStatus/', orderStatus, config);
    }
  
});
app_retailer.service('passwordService', function () {
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
app_retailer.service('productService', function () {

    var endPoint = '/VBuy/api/Products';
    var updateProductEndPoint = '/VBuy/api/UpdateProducts';
    var endPointRetailer = '/VBuy/api/Retailer';

    this.getProductSpecification = function ($scope, $http, productId) {
        var config = {
            params: { productId: productId }
        };
        return $http.get(endPointRetailer + '/GetProductSpecification/', config);
    }

    this.getProductKeyFeatures = function ($scope, $http, productId) {
        var config = {
            params: { productId: productId }
        };
        return $http.get(endPointRetailer + '/GetProductKeyFeatures/', config);
    }

    this.getProductFilterValues = function ($scope, $http, productId) {
        var config = {
            params: { productId: productId }
        };
        return $http.get(endPointRetailer + '/GetProductFilterValues/', config);
    }

    this.getFiltersForProductCategory = function ($scope, $http, productId) {
        var config = {
            params: { productId: productId }
        };
        return $http.get(endPointRetailer + '/GetFiltersForProductCategory/', config);
    }

    this.updateProductSpecifications = function ($scope, $http, productId, productFilters, productKeyFeatures, productSpecifications ) {
        var productSpecifications = {
            productFilters: productFilters,
            productKeyFeatures: productKeyFeatures,
            productSpecifications: productSpecifications        
        };
        var config = {
            headers: { "CommandType": "UpdateProductSpecifications" }
        };
        return $http.post(endPointRetailer + '/UpdateProductSpecifications/', productSpecifications, config);
    }

    this.getProductById = function ($scope, $http, productId) {
        var config = {
            params: { id: productId}
        };
        return $http.get(endPointRetailer + '/GetProductById/', config);
    }

    this.updateProduct = function ($scope, $http, product) {         
        var config = {
            headers: { "CommandType": "UpdateProduct" }
        };
        return $http.post(endPointRetailer + '/UpdateProduct', product, config);
    }

    this.updateProductSeo = function ($scope, $http, product) {
        var config = {
            headers: { "CommandType": "UpdateProductSEO" }
        };
        return $http.post(endPointRetailer + '/UpdateProductSEO', product, config);
    }
    
});
app_retailer.service('retailerServiceNew', function () {

    var endPointLanding = '/VBuy/api/Landing';
    var endPoint = '/VBuy/api/Login';

    this.RegisterRetailer = function ($scope, $http, retailerDTO)
    {

        var config = {
            headers: { "CommandType": "RegisterRetailer" }
        };
        return $http.post(endPoint + '/RegisterRetailer', retailerDTO, config)
            .then(function (response) {
                return response;
            });
    }

    this.getAppData = function($http)
    {
        var config = {
            headers: { "CommandType": "GetApplicationData" }
        };
        return $http.get(endPointLanding + '/GetApplicationData', config)
            .then(function (response) {
                return response;
            });

    }
});
app_retailer.service('storesService', function () {

    var endPoint = '/VBuy/api/Retailer';


    this.getFilter = function ($http)
    {
   
        var config = {
            headers: { "CommandType": "GetRetailerProductFilter" },
           
        };
        return $http.get(endPoint + '/GetRetailerProductFilter', config);
    }

    this.getProducts = function ($scope, $http) {
     
        var config = {
            headers: { "CommandType":"GetProducts" },
            params : $scope.filters
        };
        return $http.get(endPoint +'/GetProducts', config);
    }
    
    this.productPagination = function ($scope, $http, PageNo, pageSize) {
       
        //int selectedCategory, int selectedSubCategory, int? selectedBrand, int?pages
        var config = {
            headers: { "CommandType": "GetPagingProducts" },
            params: {
                selectedCategory: $scope.filters.selectedCategory,
                selectedSubCategory: $scope.filters.selectedSubCategory,
                selectedBrand: $scope.filters.selectedBrand,
                pageNo: PageNo,
                PageSize: pageSize
            }
        };
        return $http.get(endPoint + '/GetPagingProducts', config);
    }
    this.getMyFilteredProducts = function ($scope, $http, branchId) {
        $scope.filters.storeId = $scope.RetailerInfo.StoreId;
        $scope.filters.selectedBranchId = branchId;
        var config = {
            headers: { "CommandType": "GetMyProducts" },
            params: $scope.filters
        };
        return $http.get(endPoint + '/GetMyProducts', config);
    }
    this.getMyFilteredProductsPaging = function ($scope, $http, pageno,pageSize) {
       
        var config = {
            headers: { "CommandType":"GetMyFilteredProductsPaging" },
            params: {
                selectedCategory: $scope.filters.selectedCategory,
                selectedSubCategory: $scope.filters.selectedSubCategory,
                selectedBranchId:$scope.filters.selectedBranchId,
                storeId: $scope.RetailerInfo.StoreId,
                pageNo: pageno,
                selectedBrand: $scope.filters.selectedBrand,
                PageSize:pageSize
            }
        };
        return $http.get(endPoint +'/GetMyFilteredProductsPaging', config);
    }
   
    this.getRetailerInfo = function ($http)
    {
        var config = {
            headers: { "CommandType": "GetRetailerInfo" },
        };
        return $http.get(endPoint + '/GetRetailerInfo', config);
    }

    this.includeProduct = function ($scope, $http, includeproductPricing) {

        var config = {
            headers: { "CommandType": "IncludeProducts" }
        };
        return $http.post(endPoint + '/IncludeProducts', includeproductPricing, config);
    }

    this.createProduct = function ($scope, $http, newProduct) {
        var config = {
            headers: { "CommandType": "IncludeProducts" }
        };
        return $http.post(endPoint + '/CreateProduct', newProduct, config);
    }

    this.updatePrice = function ($scope, $http, productPricing) {

        productPricing.StoreId = $scope.RetailerInfo.StoreId
        productPricing.BranchIdList = [];
        productPricing.BranchIdList.push($scope.filters.selectedBranchId);
        var config = {
            headers: { "CommandType": "UpdateProductPrice" }
        };
        return $http.post(endPoint + '/UpdateProductPrice', productPricing, config);
    }
    this.removeProduct=function($scope,$http,product)
    {
        product.StoreId = $scope.RetailerInfo.StoreId
        product.BranchIdList = [];
        product.BranchIdList.push($scope.filters.selectedBranchId);
        var config = {
            headers: { "CommandType": "RemoveProduct" }
        };
        return $http.post(endPoint + '/RemoveProduct', product, config);
    }

    this.resumeProduct = function ($scope, $http, product) {
        product.StoreId = $scope.RetailerInfo.StoreId
        product.BranchIdList = [];
        product.BranchIdList.push($scope.filters.selectedBranchId);
        var config = {
            headers: { "CommandType": "ResumeProduct" }
        };
        return $http.post(endPoint + '/ResumeProduct', product, config);
    }
    this.getMyDetails = function ($scope, $http, userName) {

        var config = {
            params: { username: userName }
        };
        return $http.get(endPoint + '/GetMyDetails', config);
    }

    this.getInbox = function ($scope, $http, branchId) {

        var config = {
            params: { storeId: branchId }
        };
        return $http.get(endPoint + '/GetSellerInbox', config);
    }

    this.InboxReply = function ($scope, $http, mailId, reply) {
        var config = {
            params: { mailId: mailId, reply: reply }
        };
        return $http.get(endPoint + '/InboxReply', config);
    }

    this.getStoreDetails = function($scope, $http, userName, branchId)
    {
        var config = {
            params: { username: userName, branchId: branchId },
            headers: { "CommandType": "UpdateFilterParameters" }
            };
            return $http.get(endPoint + '/GetStoreDetails', config);
    }

    this.updateBranchDetails = function($scope, $http, userName, branch)
    {
        var branchModel = {branch:branch, userName:userName}
        var config = {
            headers: { "CommandType": "UpdateBranchDetails" }
        };
        
        return $http.post(endPoint + '/UpdateBranchDetails/', branchModel, config);
    }

    this.createNewBranch = function ($scope, $http, userName, branch) {
        branch.BranchId = 0;
        var branchModel = { branch: branch, userName: userName }
        var config = {
            headers: { "CommandType": "CreateNewBranch" }
        };

        return $http.post(endPoint + '/CreateNewBranch/', branchModel, config);
    }
});