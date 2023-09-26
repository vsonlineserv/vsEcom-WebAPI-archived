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

angular.module('highlightListFilters', []).filter('highlight', function () {
    function escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    return function (matchItem, query) {
        return query ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem;
    };
});

angular.module('autosuggestFilters', []).filter('autosuggest', function () {
        return function (input, viewValue) {
        if (input) {
            return input;
        }
    };
    
});

angular.module('uniqueFilters', []).filter('unique', function () {
    return function (input, key) {
        var unique = {};
        var uniqueList = [];
        if (input) {
            for (var i = 0; i < input.length; i++) {
                if (typeof unique[input[i][key]] == "undefined") {
                    unique[input[i][key]] = "";
                    uniqueList.push(input[i]);
                }
            }
        }
        return uniqueList;
    };
});

var app = angular.module('VBuyApp', ['ngRoute', 'ngAnimate', 'mgcrea.ngStrap', 'ngSanitize', 'LocalStorageModule', 
    'angular-loading-bar', 'formatUrlStringFilters', 'uniqueFilters', 'highlightListFilters', 'viewhead', 'ngCookies', 'facebook', 'directive.g+signin', 'ng-breadcrumbs',
    'angularjs-dropdown-multiselect', 'autosuggestFilters']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode({
        enabled: true
    });

    $routeProvider
        .when('/Home',
            {
                controller: 'LandingController',
                templateUrl: 'app/partials/featuredProducts.html',
                caseInsensitiveMatch: true
            })
        .when('/search/',
            {
                controller: 'SearchProductsController',
                templateUrl: 'app/partials/search.html',
                label: 'Search',
                caseInsensitiveMatch: true
            })
         .when('/offers',
            {
                controller: 'OfferController',
                templateUrl: 'app/partials/offers.html',
                label: 'Offers',
                caseInsensitiveMatch: true
            })
        .when('/category/:friendlyUrl/:categoryId',
            {
                controller: 'ProductListController',
                templateUrl: 'app/partials/products.html',
                label: 'Category',
                caseInsensitiveMatch: true
            })
        .when('/product/:friendlyUrl/:productId',
            {
                controller: 'ProductController',
                templateUrl: 'app/partials/product.html',
                label: 'Product',
                caseInsensitiveMatch: true
            })
        .when('/stores/:friendlyUrl/:storeId',
        {
            controller: 'StoresController',
            templateUrl: 'app/partials/stores.html',
            label: 'Stores',
            caseInsensitiveMatch: true

        })
            .when('/storebranch/:friendlyUrl/:storeId',
        {
            controller: 'StoreBranchController',
            templateUrl: 'app/partials/stores.html',
            caseInsensitiveMatch: true
        })
         .when('/PolicyTerms',
            {
                templateUrl: 'shared/PolicyTerms.html',
                label: 'Terms Policy',
                caseInsensitiveMatch: true
            })
          .when('/PolicySeller',
            {
                templateUrl: 'shared/PolicySeller.html',
                label: 'Seller Policy',
                caseInsensitiveMatch: true
            })
          .when('/PolicyPrivacy',
            {
                templateUrl: 'shared/PolicyPrivacy.html',
                label: 'Privacy Policy',
                caseInsensitiveMatch: true
            })
         .when('/ReturnPolicy',
            {
                templateUrl: 'shared/ReturnPolicy.html',
                label: 'Return Policy',
                caseInsensitiveMatch: true
            })
          .when('/OfferPolicy',
            {
                templateUrl: 'shared/OfferPolicy.html',
                label: 'Offer Policy',
                caseInsensitiveMatch: true
            })
       .when('/mda',
            {
                templateUrl: 'shared/sellerMDA.html',
                label: 'Marketing Agreement',
                caseInsensitiveMatch: true
            })
         .when('/faq',
            {
                templateUrl: 'shared/faq.html',
                label: 'FAQ',
                caseInsensitiveMatch: true
            })
          .when('/Login',
            {
                controller: 'LoginController',
                label: 'Login',
                templateUrl: 'app/partials/login.html',
                caseInsensitiveMatch: true
            })
          .when('/Register',
            {
                controller: 'LoginController',
                templateUrl: 'app/partials/Register.html',
                label: 'Register',
                caseInsensitiveMatch: true
            })
          .when('/ForgotPassword',
            {
                controller: 'LoginController',
                templateUrl: 'app/partials/ForgotPassword.html',
                caseInsensitiveMatch: true
            })
           .when('/ResetPassword/:uid/:username',
            {
                controller: 'ResetPasswordController',
                templateUrl: 'app/partials/ResetPassword.html',
                caseInsensitiveMatch: true
            })
         .when('/ChangePassword',
            {
                controller: 'ChangePasswordController',
                templateUrl: 'app/partials/ChangePassword.html',
                caseInsensitiveMatch: true
            })
         .when('/wishlist',
            {
                controller: 'UserWishlistController',
                templateUrl: 'app/partials/userWishlist.html',
                label: 'Wish list',
                caseInsensitiveMatch: true
            })
        .when('/Compare',
            {
                controller: 'CompareController',
                templateUrl: 'app/partials/Compare.html',
                label: 'Compare',
                caseInsensitiveMatch: true
            })
         .when('/cart',
            {
                controller: 'CartController',
                templateUrl: 'app/partials/cart.html',
                label: 'Cart',
                caseInsensitiveMatch: true
            })
     .when('/checkout',
            {
                controller: 'CheckoutController',
                templateUrl: 'app/partials/checkout.html',
                label: 'Checkout',
                caseInsensitiveMatch: true
            })
          .when('/confirmOrder/:orderId',
            {
                controller: 'OrderConfirmationController',
                templateUrl: 'app/partials/orderConfirmation.html',
                label: 'ConfirmOrder',
                caseInsensitiveMatch: true
            })
        .when('/failedTransactionOrder/:orderId',
            {
                controller: 'OrderConfirmationFailureController',
                templateUrl: 'app/partials/orderTransactionFailed.html',
                label: 'ConfirmOrder',
                caseInsensitiveMatch: true
            })    
         .when('/ViewProfile',
            {
                controller: 'MyAccountController',
                templateUrl: 'app/partials/MyAccount.html',
                label: 'View Profile',
                caseInsensitiveMatch: true
            })
		    .when('/OrderTracking',
            {
                controller: 'orderTrackingController',
                templateUrl: 'app/partials/orderTracking.html',
                caseInsensitiveMatch: true
            })
            .otherwise({ redirectTo: '/Home' });   
});

//Add this to have access to a global variable
app.run(function ($rootScope, $cookieStore, localStorageService, landingService, $http) {

    //default.
    //$rootScope.imageUrlBase = 'http://images.vbuy.in/VBuyImages/'; //global variable
    //$rootScope.imageUrlBaseStandard = 'http://images.vbuy.in/VBuyImages/Standard/'; //global variable
    //$rootScope.imageUrlBaseSmall = 'http://images.vbuy.in/VBuyImages/Small/'; //global variable
    //$rootScope.imageUrlBaseLarge = 'http://images.vbuy.in/VBuyImages/Large/';

    $rootScope.getAppData = landingService.getAppData($http).then(function (response) {
        $rootScope.imageUrlBase = response.data.imageUrlBase;
        $rootScope.homeFolder = response.data.homeFolder;
        $rootScope.homeCategoryFolder = response.data.homeCategoryFolder;
        $rootScope.imageUrlBaseStandard = response.data.imageUrlBaseStandard;
        $rootScope.imageUrlBaseSmall = response.data.imageUrlBaseSmall;
        $rootScope.imageUrlBaseLarge = response.data.imageUrlBaseLarge;
        $rootScope.ApplicationHosting = response.data.ApplicationHosting;
    });
   

    $rootScope.flagLoggedIn = localStorageService.get('flagLoggedIn') || false;
    // keep user logged in after page refresh
    $rootScope.userName = localStorageService.get('userName') || {};
    $rootScope.curUserDisplayName = localStorageService.get('curUserDisplayName') || {};
    $rootScope.wishlist = [];
    $rootScope.wishlistCount = 0;

    $rootScope.recentlyViewedlist = localStorageService.get('recentlyViewedlist') || [];

    $rootScope.comparisonlist = localStorageService.get('comparisonlist') || [];
    $rootScope.cartlist = localStorageService.get('cartlist') || [];
    $rootScope.cartTotal = 0;
    $rootScope.comparisonlistProductId = [];

    $rootScope.cartFailureMessage = '';
    $rootScope.cartMessage = '';

    $rootScope.currentAddress = 'Chennai';    
    $rootScope.defaultLat = 13.05831;
    $rootScope.defaultLng = 80.21195;
    $rootScope.defaultRadius = 5;
});

app.config(function ($httpProvider) {
    $httpProvider.prefix = 'VBuy';
    $httpProvider.interceptors.push('authInterceptorService');
});

app.config(function (FacebookProvider) {
    FacebookProvider.init('576492315819399');
  })


$(window).scroll(function () {
    var d = $('#menubar');
    if (d.offset()) {
        if (d.offset().top < 800) {
            d.fadeIn();
            $('a.back-to-top').fadeOut('slow');
        } else {
            d.fadeOut();
            $('a.back-to-top').fadeIn('slow');
        }
    }
});