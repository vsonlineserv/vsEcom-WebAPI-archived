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

var app_admin = angular.module('VBuyAdminApp', ['ngRoute', 'ngSanitize', 'LocalStorageModule', 'ngTable', 'angularFileUpload', 'angular-loading-bar', 'ngCookies', 'formatUrlStringFilters']);

//This configures the routes and associates each route with a view and a controller
app_admin.config(function ($routeProvider) {
    $routeProvider
         .when('/Login',
            {
                controller: 'LoginController',
                templateUrl: 'app_admin/partials/login.html',
                caseInsensitiveMatch: true
            })
         .when('/dashboard',
            {
                controller: 'DashboardController',
                templateUrl: 'app_admin/partials/dashboard.html',
                caseInsensitiveMatch: true
            })
        .when('/topCategory',
            {
                controller: 'TopCategoryController',
                templateUrl: 'app_admin/partials/topCategories.html',
                caseInsensitiveMatch: true
            })

         .when('/uploadSiteImages',
            {
                controller: 'UploadSiteImagesController',
                templateUrl: 'app_admin/partials/uploadSiteImages.html',
                caseInsensitiveMatch: true
            })
          .when('/siteSettings',
            {
                controller: 'SiteSettingsController',
                templateUrl: 'app_admin/partials/siteSettings.html',
                caseInsensitiveMatch: true
            })
          .when('/newcategory',
        {
            controller: 'AdminCategoryController',
            templateUrl: 'app_admin/partials/category.html',
            caseInsensitiveMatch: true
        })
          .when('/editcategory/:categoryId',
        {
            controller: 'AdminCategoryController',
            templateUrl: 'app_admin/partials/category.html',
            caseInsensitiveMatch: true
        })
          .when('/updatecategoryfilter/:categoryId',
        {
            controller: 'AdminCategoryFilterController',
            templateUrl: 'app_admin/partials/categoryParameter.html',
            caseInsensitiveMatch: true
        })
            .when('/publishcategory',
        {
            controller: 'PublishCategoryController',
            templateUrl: 'app_admin/partials/publishcategory.html',
            caseInsensitiveMatch: true
        })
     .when('/category',
        {
            controller: 'AdminCategoryListController',
            templateUrl: 'app_admin/partials/categorylist.html',
            caseInsensitiveMatch: true
        })
      .when('/exportproduct',
        {
            controller: 'AdminCategoryExportController',
            templateUrl: 'app_admin/partials/exportproduct.html',
            caseInsensitiveMatch: true
        })
             .when('/products',
        {
            controller: 'AdminProductListController',
            templateUrl: 'app_admin/partials/productlist.html',
            caseInsensitiveMatch: true
        })
             .when('/manufacturer',
        {
            controller: 'AdminBrandController',
            templateUrl: 'app_admin/partials/manufacturer.html',
            caseInsensitiveMatch: true
        })
             .when('/publishProduct',
        {
            controller: 'AdminPublishProductController',
            templateUrl: 'app_admin/partials/publishproduct.html',
            caseInsensitiveMatch: true
        })
             .when('/productSEO',
        {
            controller: 'AdminProductSeoController',
            templateUrl: 'app_admin/partials/productseo.html',
            caseInsensitiveMatch: true
        })
          .when('/orders',
        {
            controller: 'AdminOrdersController',
            templateUrl: 'app_admin/partials/orders.html',
            caseInsensitiveMatch: true
        })
          .when('/enquiry',
        {
            controller: 'AdminEnquiryController',
            templateUrl: 'app_admin/partials/enquiry.html',
            caseInsensitiveMatch: true
        })
          .when('/pricing',
        {
            controller: 'AdminPricingController',
            templateUrl: 'app_admin/partials/pricing.html',
            caseInsensitiveMatch: true
        })
            .when('/userMaster',
        {
            controller: 'AdminUserMasterController',
            templateUrl: 'app_admin/partials/userMaster.html',
            caseInsensitiveMatch: true
        })
            .when('/seller',
        {
            controller: 'AdminSellerController',
            templateUrl: 'app_admin/partials/seller.html',
            caseInsensitiveMatch: true
        })
            .when('/sellerCategory',
        {
            controller: 'AdminSellerCategoryController',
            templateUrl: 'app_admin/partials/sellercategory.html',
            caseInsensitiveMatch: true
        })
            .when('/newStore',
        {
            controller: 'AdminNewStoreController',
            templateUrl: 'app_admin/partials/newStore.html',
            caseInsensitiveMatch: true
        })
             .when('/siteDiscount',
        {
            controller: 'AdminSiteDiscountController',
            templateUrl: 'app_admin/partials/siteDiscount.html',
            caseInsensitiveMatch: true
        })
        .otherwise({ redirectTo: '/Login' });
});

app_admin.config(function ($httpProvider) {
    $httpProvider.prefix = 'VBuy';
    $httpProvider.interceptors.push('authInterceptorService');
});

//Add this to have access to a global variable
app_admin.run(function ($rootScope, $http, $cookieStore, adminService) {

    $rootScope.getAppData = adminService.getAppData($http).then(function (response) {
        $rootScope.imageUrlBase = response.data.imageUrlBase;
        $rootScope.homeFolder = response.data.homeFolder;
        $rootScope.homeCategoryFolder = response.data.homeCategoryFolder;
        $rootScope.imageUrlBaseStandard = response.data.imageUrlBaseStandard;
        $rootScope.imageUrlBaseSmall = response.data.imageUrlBaseSmall;
        $rootScope.imageUrlBaseLarge = response.data.imageUrlBaseLarge;
        $rootScope.ApplicationHosting = response.data.ApplicationHosting;
    });
    $rootScope.flagLoggedIn = $cookieStore.get('flagLoggedIn') || false;
    // keep user logged in after page refresh
    $rootScope.userName = $cookieStore.get('userName') || {};
    $rootScope.curUserDisplayName = $cookieStore.get('curUserDisplayName') || {};
});

