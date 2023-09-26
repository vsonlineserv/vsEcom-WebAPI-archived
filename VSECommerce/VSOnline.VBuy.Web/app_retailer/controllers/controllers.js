 ////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////

app_retailer.controller('LandingController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location',  'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, authService) {
    {       
        $scope.LogOut =function() {
            authService.logOut();
            $rootScope.flagLoggedIn = false;
            $cookieStore.remove('userName');
            $cookieStore.remove('flagLoggedIn');
            $location.path('#/Login');
        }
    }
}]);

app_retailer.controller('RegisteredRetailerController', ['$scope', '$http', '$routeParams', '$location', '$timeout', 'retailerServiceNew',
function ($scope, $http, $routeParams, $location, $timeout, retailerServiceNew) {
    {
        $scope.savedSuccessfully = false;
        $scope.message = "";
        $scope.user = {}
        $scope.user.Country = 42;//india.
        $scope.user.State = 'TamilNadu';
        $scope.RegisterRetailer = function () {
          
            //find lat & long

            var glocation;

            glocation = $scope.Address1 + "," +  $scope.Address2;
            glocation = glocation + "," + $scope.user.City;
            glocation = glocation + "," + $scope.user.State;
            glocation = glocation + "," + $scope.user.Pincode;
            var mapGeoCoder = new google.maps.Geocoder();
            var geoCodeResult = "";
            //COMMENT:NO NEED LAT AND LNG
            //mapGeoCoder.geocode({ 'address': glocation }, function (results, status) {
            //    if (status == google.maps.GeocoderStatus.OK) {
            //        var geoCodeResult = results;
            //        if (displayLatLong(geoCodeResult)) {
                        RegisterRetailer();
            //        }
            //    }
            //    else {
            //        geoCodeResult = "We couldn't find that location. Try again."
            //        $scope.savedSuccessfully = false;
            //        $scope.message = geoCodeResult;
            //    }
                    
            //});
                        $scope.user.Latitude = "13.0445";
                        $scope.user.Longitude = "80.2114";
        }

        function RegisterRetailer() {
            var retailerDTO =
              {
                  BusinessName: $scope.user.BusinessName,
                  FirstName: $scope.user.FirstName,
                  LastName: $scope.user.LastName,
                  Email: $scope.user.Email,
                  Password: $scope.user.Password,
                  ConfirmPassword: $scope.user.ConfirmPassword,
                  Address1: $scope.user.Address1,
                  Address2: $scope.user.Address2,
                  Pincode: $scope.user.Pincode,
                  City: $scope.user.City,
                  State: $scope.user.State,
                  Country: $scope.user.Country,
                  PhoneNumber1: $scope.user.PhoneNumber1,
                  Latitude: $scope.user.Latitude,
                  Longitude: $scope.user.Longitude
              }
            retailerServiceNew.RegisterRetailer($scope, $http, retailerDTO)
                  .then(function (response) {

                      $scope.savedSuccessfully = true;
                      $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                      $timeout(function () {
                          $location.path('/Login');
                      }, 4000);

                  },
                   function (response) {
                       var errors = [];
                       for (var key in response.data.ModelState) {
                           for (var i = 0; i < response.data.ModelState[key].length; i++) {
                               errors.push(response.data.ModelState[key][i]);
                           }
                       }
                       $scope.message = "Failed to register user due to:" + errors.join(' ');
                   });
        }
        
        function displayLatLong(geoCodeResult) {

            if (typeof geoCodeResult == "string") {
                $scope.message == geoCodeResult;
                return false;
            }
            var bothCords = geoCodeResult[0].geometry.location;
            bothCords = bothCords.toString();
            bothCords = bothCords.replace("\(", " ");
            bothCords = bothCords.replace("\)", " ");
            bothCords = bothCords.split(",");
            var strLat = bothCords[0];
            var strLng = bothCords[1];
            $scope.user.Latitude = strLat;
            $scope.user.Longitude = strLng;
            return true;
        }
    }
}]);

app_retailer.controller('UserSettingsController', ['$scope', '$http', '$routeParams', '$modal', 'retailerServiceNew',
function ($scope, $http, $routeParams, $modal, retailerServiceNew) {
    {
        
    }
}]);

app_retailer.controller('ChangePasswordController', ['$rootScope', '$scope', '$http', '$routeParams','passwordService',
function ($rootScope, $scope, $http, $routeParams, passwordService) {
    {
        $scope.message = '';
        $scope.user = {};
        $scope.user.userName = $rootScope.userName;
        $scope.ChangePassword = function () {
            $scope.message = '';
            if ($scope.user.NewPassword === $scope.user.ConfirmPassword) {
                passwordService.changePassword($scope, $http, $scope.user.userName, $scope.user.CurrentPassword, $scope.user.NewPassword)
                    .then(function (response) {

                        if (response.data == true) {
                            $scope.savedSuccessfully = true;
                            $scope.message = "Password has been changed Successfully."
                        }
                        else {
                            $scope.savedSuccessfully = false;
                            $scope.message = "Error in updating Password"
                        }

                    },
                function (err) {
                    $scope.message = err.error_description;
                });
            }
            else {
                $scope.savedSuccessfully = false;
                $scope.message = "Password mismatch"
            }
        }
    }
}]);

app_retailer.controller('MyDetailsController', ['$rootScope', '$scope', '$http', '$routeParams','authService','storesService',
function ($rootScope, $scope, $http, $routeParams, authService, storesService) {
    {
        $scope.user = {};
        $scope.user.userName = $rootScope.userName;

        InitializeMyDetails();

        function InitializeMyDetails()
        {
            storesService.getMyDetails($scope, $http, $scope.user.userName)
            .then(function (response) {
                $scope.user.Email = response.data.Email;
                $scope.user.PhoneNumber1 = response.data.PhoneNumber1;
                $scope.user.FirstName = response.data.FirstName;
                $scope.user.LastName = response.data.LastName;
            });
        }
    }
}]);

app_retailer.controller('MyStoreController', ['$rootScope', '$scope', '$http', '$routeParams', 'authService', 'storesService',
function ($rootScope, $scope, $http, $routeParams, authService, storesService) {
    {
        $scope.message = '';
        $scope.savedSuccessfully = false;
        $scope.user = {};
        $scope.user.userName = $rootScope.userName;
        $scope.branch = {};
        $scope.flagBranchEdit = false;
     

        InitializeStoreDetails();

        function InitializeStoreDetails()
        {
            if ($rootScope.RetailerInfo.Branches.length > 0) {
                if (!($rootScope.filters.selectedBranchId > 0) || !$rootScope.filters.selectedBranchId) {
                    $rootScope.filters.selectedBranchId = $rootScope.RetailerInfo.Branches[0].BranchId;
                }
            }

            storesService.getStoreDetails($scope, $http, $scope.user.userName, $rootScope.filters.selectedBranchId)
            .then(function (response) {
                $scope.branch.BranchName = response.data.BranchName;
                $scope.branch.Email = response.data.Email;
                $scope.branch.Country = response.data.Country;
                $scope.branch.State = response.data.State;
                $scope.branch.City = response.data.City;
                $scope.branch.Address1 = response.data.Address1;
                $scope.branch.Address2 = response.data.Address2;
                $scope.branch.PostalCode = response.data.PostalCode;
                $scope.branch.PhoneNumber = response.data.PhoneNumber;
                $scope.branch.Latitude = response.data.Latitude;
                $scope.branch.Longitude = response.data.Longitude;
            });
        }

        $scope.UpdateBranchDetails = function(branch)
        {
            branch.BranchId = $rootScope.filters.selectedBranchId;
            storesService.updateBranchDetails($scope, $http, $scope.user.userName, branch)
             .then(function (response) {
                 if (response.data == "Success") {
                     $scope.savedSuccessfully = true;
                     $scope.message = " Updated Successfully " + branch.BranchName;
                 }
                 else
                 {
                     $scope.savedSuccessfully = false;
                 }

                 InitializeStoreDetails();
                 $scope.flagBranchEdit = false;
             });
            InitializeStoreDetails();
            $scope.flagBranchEdit = false;
        }

        $scope.CancelEdit = function ()
        {
            InitializeStoreDetails();
            $scope.flagBranchEdit = false;
        }
    }
    
}]);

app_retailer.controller('NewBranchController', ['$rootScope', '$scope', '$http', '$routeParams', '$location', '$timeout', 'storesService',
function ($rootScope, $scope, $http, $routeParams, $location, $timeout, storesService) {
    {
        $scope.savedSuccessfully = false;
        $scope.message = "";
        $scope.branch = {}
        $scope.branch.Country = 42;//india.
        $scope.branch.State = 'TamilNadu';

        $scope.CreateNewBranch = function () {

            //find lat & long

            var glocation;

            glocation = $scope.Address1 + "," + $scope.Address2;
            glocation = glocation + "," + $scope.branch.City;
            glocation = glocation + "," + $scope.branch.State;
            glocation = glocation + "," + $scope.branch.Pincode;
            var mapGeoCoder = new google.maps.Geocoder();
            var geoCodeResult = "";
            mapGeoCoder.geocode({ 'address': glocation }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var geoCodeResult = results;
                    if (displayLatLong(geoCodeResult)) {
                        CreateBranch();
                    }
                }
                else {
                    geoCodeResult = "We couldn't find that location. Try again."
                    $scope.savedSuccessfully = false;
                    $scope.message = geoCodeResult;
                }

            });
        }

        function CreateBranch() {
            var branchDTO =
              {
                  BranchName: $scope.branch.BranchName,
                  FirstName: $scope.branch.FirstName,
                  LastName: $scope.branch.LastName,
                  Email: $scope.branch.Email,
                  Address1: $scope.branch.Address1,
                  Address2: $scope.branch.Address2,
                  Pincode: $scope.branch.Pincode,
                  City: $scope.branch.City,
                  State: $scope.branch.State,
                  Country: $scope.branch.Country,
                  PhoneNumber: $scope.branch.PhoneNumber,
                  Latitude: $scope.branch.Latitude,
                  Longitude: $scope.branch.Longitude
              }
            storesService.createNewBranch($scope, $http, $rootScope.userName,branchDTO)
                  .then(function (response) {
                      if (response.data == "Success") {
                          $scope.savedSuccessfully = true;
                          $scope.message = "New Branch Created successfully. Add Product to the branch.";
                      }
                      else
                      {
                          $scope.message = "Failed to create new branch";
                      }
                  },
                   function (response) {
                       var errors = [];
                       for (var key in response.data.ModelState) {
                           for (var i = 0; i < response.data.ModelState[key].length; i++) {
                               errors.push(response.data.ModelState[key][i]);
                           }
                       }
                       $scope.message = "Failed to create new branch " + errors.join(' ');
                   });
        }

        function displayLatLong(geoCodeResult) {

            if (typeof geoCodeResult == "string") {
                $scope.message == geoCodeResult;
                return false;
            }
            var bothCords = geoCodeResult[0].geometry.location;
            bothCords = bothCords.toString();
            bothCords = bothCords.replace("\(", " ");
            bothCords = bothCords.replace("\)", " ");
            bothCords = bothCords.split(",");
            var strLat = bothCords[0];
            var strLng = bothCords[1];
            $scope.branch.Latitude = strLat;
            $scope.branch.Longitude = strLng;
            return true;
        }
    }
}]);