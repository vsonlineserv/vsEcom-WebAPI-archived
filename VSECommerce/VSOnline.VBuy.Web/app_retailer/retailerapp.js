 ////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
 angular.module('formatUrlStringFilters', []).filter('formaturl', function () {
    return function (input) {
        if (input) {
            return input.replace(/\W+/g, '-').toLowerCase();
        }
    };
});

var app_retailer = angular.module('VBuyRetailerApp', ['ngRoute', 'ngAnimate', 'mgcrea.ngStrap',
    'ngSanitize', 'LocalStorageModule', 'ngTable', 'angularFileUpload', 'angular-loading-bar', 'ngCookies', 'formatUrlStringFilters', 'chart.js']);

//This configures the routes and associates each route with a view and a controller
app_retailer.config(function ($routeProvider) {
    $routeProvider
         .when('/Login',
            {
                controller: 'LoginController',
                templateUrl: 'app_retailer/partials/login.html',
                caseInsensitiveMatch: true
            })
        .when('/myOrders',
        {
             controller: 'ordersController',
            templateUrl: 'app_retailer/partials/myOrders.html',
            caseInsensitiveMatch: true
        })
          .when('/Pricing',
        {
            controller: 'PricingController',
            templateUrl: 'app_retailer/partials/managePricing.html',
            caseInsensitiveMatch: true
        })
           .when('/productlookup',
        {
            controller: 'StoresController',
            templateUrl: 'app_retailer/partials/manageProducts.html',
            caseInsensitiveMatch: true

        })
           .when('/newproduct',
        {
            controller: 'NewProductController',
            templateUrl: 'app_retailer/partials/newProduct.html',
            caseInsensitiveMatch: true
        })      
         .when('/newbranch',
        {
            controller: 'NewBranchController',
            templateUrl: 'app_retailer/partials/newbranch.html',
            caseInsensitiveMatch: true
        })       
         .when('/Inbox',
        {
            controller: 'InboxController',
            templateUrl: 'app_retailer/partials/myInbox.html',
            caseInsensitiveMatch: true
        })
          .when('/Dashboard',
        {
            controller: 'dashboardController',
            templateUrl: 'app_retailer/partials/dashboard.html',
            caseInsensitiveMatch: true
        })
        .when('/Register',
            {
                controller: 'RegisteredRetailerController',
                templateUrl: 'app_retailer/partials/retailerRegister.html',
                caseInsensitiveMatch: true
            })
        .when('/RetailerHome',
            {
                controller: 'StoresController',
                templateUrl: 'app_retailer/partials/retailerHome.html',
                caseInsensitiveMatch: true
            })
         .when('/UpdateProduct/:productId',
        {
            controller: 'EditProductController',
            templateUrl: 'app_retailer/partials/updateProduct.html',
            caseInsensitiveMatch: true
        })
           .when('/UpdateProductSeo/:productId',
        {
            controller: 'SEOEditProductController',
            templateUrl: 'app_retailer/partials/productSEO.html',
            caseInsensitiveMatch: true
        })
        .when('/UpdateFeatures/:productId',
        {
            controller: 'FeaturesEditProductController',
            templateUrl: 'app_retailer/partials/updateKeyFeatures.html',
            caseInsensitiveMatch: true

        })
        .when('/UpdateProductImage/:productId',
        {
            controller: 'EditProductController',
            templateUrl: 'app_retailer/partials/productImage.html',
            caseInsensitiveMatch: true
        })
          .when('/UploadBulkProducts',
        {
            controller: 'BulkUploadProductController',
            templateUrl: 'app_retailer/partials/productBulkUpload.html',
            caseInsensitiveMatch: true
        })
         .when('/ForgotPassword',
            {
                controller: 'ForgotPasswordController',
                templateUrl: 'app_retailer/partials/ForgotPassword.html',
                caseInsensitiveMatch: true
            })
        .when('/ResetPassword/:uid/:username',
            {
                controller: 'ResetPasswordController',
                templateUrl: 'app_retailer/partials/ResetPassword.html',
                caseInsensitiveMatch: true
            })
         .when('/ChangePassword',
            {
                controller: 'ChangePasswordController',
                templateUrl: 'app_retailer/partials/ChangePassword.html',
                caseInsensitiveMatch: true
            })
         .when('/MyDetails',
            {
                controller: 'MyDetailsController',
                templateUrl: 'app_retailer/partials/MyDetails.html',
                caseInsensitiveMatch: true
            })
           .when('/mystore',
            {
                controller: 'MyStoreController',
                templateUrl: 'app_retailer/partials/myStore.html',
                caseInsensitiveMatch: true
            })
          .when('/PrintOrder/:orderId',
            {
                controller: 'PrintOrderController',
                templateUrl: 'app_retailer/partials/printOrder.html',
                caseInsensitiveMatch: true
            })
         .when('/UserSettings',
            {
                controller: 'UserSettingsController',
                templateUrl: 'app_retailer/partials/userSettings.html',
                caseInsensitiveMatch: true
            })
         .when('/PolicyTerms',
            {               
                templateUrl: 'shared/PolicyTerms.html',
                caseInsensitiveMatch: true
            })
          .when('/PolicySeller',
            {
                templateUrl: 'shared/PolicySeller.html',
                caseInsensitiveMatch: true
            })
          .when('/PolicyPrivacy',
            {
                templateUrl: 'shared/PolicyPrivacy.html',
                caseInsensitiveMatch: true
            })
          .when('/mda',
            {
                templateUrl: 'shared/sellerMDA.html',
                caseInsensitiveMatch: true
            })
        .otherwise({ redirectTo: '/Login' });
});


app_retailer.config(function ($httpProvider) {
    $httpProvider.prefix = 'VBuy';
    $httpProvider.interceptors.push('authInterceptorService');
});
//Add this to have access to a global variable
app_retailer.run(function ($rootScope, $http, $cookieStore, retailerServiceNew) {

    $rootScope.getAppData = retailerServiceNew.getAppData($http).then(function (response) {
        $rootScope.imageUrlBaseUploaded = response.data.imageUrlBaseUploaded;
        $rootScope.ApplicationHosting = response.data.ApplicationHosting;
    });

    $rootScope.flagLoggedIn = $cookieStore.get('flagLoggedIn') || false;
    // keep user logged in after page refresh
    $rootScope.userName = $cookieStore.get('userName') || {};
    $rootScope.StoreName = '';
    $rootScope.BranchId = 0;
    $rootScope.RetailerInfo = {};
    $rootScope.filters = {};
    $rootScope.curUserDisplayName = $cookieStore.get('curUserDisplayName') || {};
});

