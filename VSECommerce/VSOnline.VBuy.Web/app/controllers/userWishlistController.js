////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
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