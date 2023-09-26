////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.service('landingService', function () {

    // var endPoint = '/VSECommerce/api/Landing';
    var endPoint = 'http://localhost:49475/api/Landing';

    var curLocationDiv = document.getElementById("curLocation");

    this.getAppData = function ($http) {
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

    this.getTopCategoriesList = function ($scope, $http) {
        return $http.get(endPoint + '/GetTopCategoriesList');
    }

    this.loadLocationList = function ($scope, $http) {
        var config = {
            headers: { "CommandType": "GetSearchAreaFilter" },
            params: { city: 'Chennai' }
        };
        return $http.get(endPoint + '/GetSearchAreaFilter', config);
    }

    this.loadCurrentLocation = function ($scope, $http) {

        if (!curLocationDiv.title) {
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
                else {
                    if (!$scope.selectedArea) {
                        document.getElementById("areaSearchInput").value = 'Chennai';
                    }
                }
            });
        }

        function errorCallbackNavigator(error) {
            if (!$scope.selectedArea) {
                document.getElementById("areaSearchInput").value = 'Chennai';
            }
        }
    }

});