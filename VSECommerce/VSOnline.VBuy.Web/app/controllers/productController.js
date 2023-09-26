////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
//////////////////////////////////////////////////////////////////////////////////////////
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