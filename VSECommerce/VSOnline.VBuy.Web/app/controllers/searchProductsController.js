////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.controller('SearchProductsController', ['$rootScope', '$scope', '$http', '$routeParams', '$q', '$cookieStore', 'productService', 'mapService', 'userActionService', '$location', 'breadcrumbs',
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