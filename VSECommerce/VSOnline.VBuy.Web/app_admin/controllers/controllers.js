/*!
 * VSECommerce
 *
 * Copyright 2014-2018 Sivakumar Anirudhan, VS Online Services Pvt Ltd.
 *
 */

app_admin.controller('LandingController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', 'adminService', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, adminService, authService) {
    {
        $scope.LogOut = function () {
            authService.logOut();
            $rootScope.flagLoggedIn = false;
            $cookieStore.remove('userName');
            $cookieStore.remove('flagLoggedIn');
            $location.path('#/Login');
        }
    }
}]);


app_admin.controller('LoginController', ['$scope', '$cookieStore', '$location', '$rootScope', '$timeout', 'authService',
    function ($scope, $cookieStore, $location, $rootScope, $timeout, authService) {

        $scope.loginData = {
            userName: "",
            password: ""
        };
        ClearCookieStore();

        authService.logOut();
        $scope.message = "";
        $rootScope.flagLoggedIn = false;
        $rootScope.userName = "";
        $rootScope.curUserDisplayName = "";

        $scope.Login = function () {
            authService.login($scope.loginData).then(function (response) {

                if (response) {
                    $('form').fadeOut(500);
                    $('.wrapper').addClass('form-success');
                    $timeout(function () {
                        $scope.message = "Login Successful";
                        $location.path('/dashboard');

                        $rootScope.flagLoggedIn = true;
                        $rootScope.userName = $scope.loginData.userName;
                        $cookieStore.put('userName', $rootScope.userName);
                        $cookieStore.put('flagLoggedIn', $rootScope.flagLoggedIn);

                        $rootScope.curUserDisplayName = $scope.loginData.userName;
                        $cookieStore.put('curUserDisplayName', $rootScope.curUserDisplayName);
                    }, 500);
                }
            },
             function (err) {
                 $scope.message = err.error_description;
                 $rootScope.flagLoggedIn = false;
                 $scope.savedSuccessfully = false;
                 ClearCookieStore();
                 $location.path('/login');
             });
        };

        function ClearCookieStore() {
            $cookieStore.remove('userName');
            $cookieStore.remove('flagLoggedIn');
            $cookieStore.remove('curUserDisplayName');
        }

    }]);

app_admin.controller('DashboardController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', 'adminService', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, adminService, authService) {

    var endPoint = 'http://localhost:49475/api/AdminMigratedCategory';
    function InitializeUserStatistics() {
        regCustomers();
        regRetailers();
    }
    InitializeUserStatistics();

    function regCustomers() {
        var config = {
            headers: { "CommandType": "LoadCustomer" }
        };

        $http.get(endPoint + '/LoadCustomer', config)
  .then(function (response) {
      createCustomerGrid(response.data);
  });
    }
    function regRetailers() {
        var config = {
            headers: { "CommandType": "LoadRetailer" }
        };

        $http.get(endPoint + '/LoadRetailer', config)
              .then(function (response) {
                  createRetailerGrid(response.data);
              });
    }
    function createCustomerGrid(datas) {

        var data = {
            "rows": eval(datas)
        };
        jQuery("#regCustomersGrid").jqGrid("GridUnload");
        var grid = jQuery("#regCustomersGrid");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['days', 'Customers'],
            colModel: [

                        { name: 'days', index: 'days', width: 30, align: "center", sortable: true },
                        { name: 'users', index: 'users', width: 30, align: "center", sortable: true },


            ],
            width: "400",
            caption: "Number of Registered customers",
            height: 200,
            ignoreCase: true
        });



    }
    function createRetailerGrid(datas) {
        var data = {
            "rows": eval(datas)
        };
        jQuery("#regRetailerGrid").jqGrid("GridUnload");
        var grid = jQuery("#regRetailerGrid");
        grid.jqGrid({
            datastr: data,
            datatype: "jsonstring",
            jsonReader: { repeatitems: false },
            colNames: ['days', 'Retailers'],
            colModel: [

                        { name: 'days', index: 'days', width: 30, align: "center", sortable: true },
                        { name: 'retailer', index: 'retailer', width: 30, align: "center", sortable: true },


            ],
            width: "400",
            caption: "Number of Registered Retailers",
            height: 200,
            ignoreCase: true
        });

    }


}]);


app_admin.controller('TopCategoryController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', 'FileUploader'
    , '$timeout', '$location', '$filter', 'ngTableParams', 'adminService', 'authService', 'authInterceptorService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, FileUploader, $timeout, $location, $filter, ngTableParams, adminService, authService, authInterceptorService) {
    {

        $scope.topCategorylist = {};
        $scope.showOnHomeCategorylist = {};
        $scope.savedSuccessfully = false;
        $scope.flagCategoryImage = false;
        $scope.currentFileName = '';
        $scope.flagShowlargeImage = false;

        $scope.gridtopCategorylist = {};
        function InitializeTopCategory() {
            adminService.getTopCategory($http)
                    .then(function (response) {
                        $scope.topCategorylist = response.data;
                    });
            adminService.getShowHomePageCategory($http)
                    .then(function (response) {
                        $scope.showOnHomeCategorylist = response.data;
                    });

        }
        InitializeTopCategory();

        $scope.AddToHomePageCategory = function (categoryId) {
            adminService.showCategoryInHomePage($http, categoryId, true)
                  .then(function (response) {
                      if (response.data == "Success") {
                          $scope.savedSuccessfully = true;
                          $scope.message = "Category Added to Home Page"
                          $timeout(function () {
                              $scope.message = "";
                          }, 2000);
                          InitializeTopCategory();
                      }
                      else {
                          $scope.savedSuccessfully = false;
                          $scope.message = "Error adding Category from Home Page"
                          $timeout(function () {
                              $scope.message = "";
                          }, 2000);
                      }
                  });
        }

        $scope.RemoveFromHomePageCategory = function (categoryId) {
            adminService.showCategoryInHomePage($http, categoryId, false)
                  .then(function (response) {
                      if (response.data == "Success") {
                          $scope.message = "Category Removed from Home Page"
                          $scope.savedSuccessfully = true
                          $timeout(function () {
                              $scope.message = "";
                          }, 2000);
                          InitializeTopCategory();
                      }
                      else {
                          $scope.savedSuccessfully = false;
                          $scope.message = "Error removing Category from Home Page"
                          $timeout(function () {
                              $scope.message = "";
                          }, 2000);
                      }
                  });
        }



        $scope.topCategoryGridParams = new ngTableParams({
            page: 1,            // show first page
            // count per page
            count: 10,
            filter: { Name: '' },
            // initial sort order
            sorting: { Name: "asc" }
        }, {
            counts: [],
            getData: function ($defer, params) {

                $scope.gridtopCategorylist = params.sorting() ? $filter('orderBy')($scope.topCategorylist, params.orderBy()) : $scope.topCategorylist;
                $scope.gridtopCategorylist = params.filter() ? $filter('filter')($scope.gridtopCategorylist, params.filter()) : $scope.gridtopCategorylist;
                params.total($scope.gridtopCategorylist.length);
                $scope.gridtopCategorylist = $scope.gridtopCategorylist.slice((params.page() - 1) * params.count(), params.page() * params.count());
                $defer.resolve($scope.gridtopCategorylist);
            }
        });

        $scope.topShowCategoryGridParams = new ngTableParams({
            page: 1,            // show first page
            count: 5,        // count per page
        }, {
            counts: [],
            total: angular.isUndefined($scope.showOnHomeCategorylist.length) ? 0 : $scope.showOnHomeCategorylist.length,
            getData: function ($defer, params) {

                $defer.resolve($scope.showOnHomeCategorylist);
            }
        });

        $scope.AddImage = function (categoryName) {
            $scope.currentFileName = categoryName;
            $scope.flagCategoryImage = true;
        }

        $scope.uploaderCategoryImage = new FileUploader({
            url: 'api/AdminFileUpload/UploadHomeCartegoryImages',
            withCredentials: true
        });

        authInterceptorService.request($scope.uploaderCategoryImage);
        var key = $scope.uploaderCategoryImage.headers.Authorization;


        $scope.uploaderCategoryImage.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {

                var returnValImage = false;

                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                returnValImage = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;

                if (returnValImage == false) {
                    alert("Unsupported image type");
                }
                return returnValImage;
            }
        });

        $scope.uploaderCategoryImage.onSuccessItem = function (fileItem, response, status, headers) {
            if (response.toLowerCase() === 'success') {
                $scope.savedSuccessfully = true;
                $scope.flagCategoryImage = false;
                $scope.message = fileItem.file.name + " Uploaded";
                var imgName = document.getElementById(fileItem.file.name).src;
                document.getElementById(fileItem.file.name).src = imgName + "?" + new Date();
            }
            if (response.toLowerCase() === 'failure') {
                fileItem.isSuccess = false;
                fileItem.isError = true;
            }
            fileItem.isUploading = false;

        };
        $scope.uploaderCategoryImage.onErrorItem = function (fileItem, response, status, headers) {
            fileItem.isUploading = false;
        };

        $scope.ShowLargeImage = function (categoryName) {
            $scope.currentFileName = categoryName;
            $scope.flagShowlargeImage = true;
        }
    }
}]);

app_admin.controller('UploadSiteImagesController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', 'FileUploader', 'adminService', 'authService', 'authInterceptorService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, FileUploader, adminService, authService, authInterceptorService) {
    {

        $scope.uploaderHomeBanner = new FileUploader({
            url: 'http://localhost:49475/api/AdminFileUpload/UploadHomeBannerImages',
            withCredentials: true
        });


        authInterceptorService.request($scope.uploaderHomeBanner);
        var key = $scope.uploaderHomeBanner.headers.Authorization;


        $scope.uploaderHomeBanner.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {

                var returnValImage = false;

                if (item.name.indexOf("HomeBanner") >= 0 || item.name.indexOf("TopOffers") >= 0) {

                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    returnValImage = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;

                    if (returnValImage == false) {
                        alert("Unsupported image type");
                    }
                    return returnValImage;
                }
                else {
                    alert("use HomeBanner1.jpg/HomeBanner2.jpg..... as name of file.\n Supported upto HomeBanner4.jpg");
                }
                return false;
            }
        });

        $scope.uploaderHomeBanner.onSuccessItem = function (fileItem, response, status, headers) {
            if (response.toLowerCase() === 'success') {
            }
            if (response.toLowerCase() === 'failure') {
                fileItem.isSuccess = false;
                fileItem.isError = true;
            }
            fileItem.isUploading = false;

        };
        $scope.uploaderHomeBanner.onErrorItem = function (fileItem, response, status, headers) {
            fileItem.isUploading = false;
        };


        $scope.uploaderCategoryImage = new FileUploader({
            url: 'api/AdminFileUpload/UploadMenuCategoryImages',
            withCredentials: true
        });

        authInterceptorService.request($scope.uploaderCategoryImage);
        var key = $scope.uploaderCategoryImage.headers.Authorization;


        $scope.uploaderCategoryImage.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {

                var returnValImage = false;

                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                returnValImage = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;

                if (returnValImage == false) {
                    alert("Unsupported image type");
                }
                return returnValImage;
            }
        });

        $scope.uploaderCategoryImage.onSuccessItem = function (fileItem, response, status, headers) {
            if (response.toLowerCase() === 'success') {
            }
            if (response.toLowerCase() === 'failure') {
                fileItem.isSuccess = false;
                fileItem.isError = true;
            }
            fileItem.isUploading = false;

        };
        $scope.uploaderCategoryImage.onErrorItem = function (fileItem, response, status, headers) {
            fileItem.isUploading = false;
        };

    }
}]);


app_admin.controller('SiteSettingsController', ['$rootScope', '$scope', '$http', '$cookieStore', '$routeParams', '$location', '$filter', 'ngTableParams', 'adminService', 'authService',
function ($rootScope, $scope, $http, $cookieStore, $routeParams, $location, $filter, ngTableParams, adminService, authService) {
    {
        $scope.savedSuccessfully = false;
        $scope.message = '';
        $scope.siteSettingList = {};

        $scope.removeCache = function () {
            adminService.removeCache($http)
             .then(function (response) {
                 if (response.data == true) {
                     $scope.savedSuccessfully = true;
                     $scope.message = "Caching is removed Successfully"
                 }
                 else {
                     $scope.savedSuccessfully = true;
                     $scope.message = "Error in removing Cache"
                 }
             });
        }

        $scope.loadProductIndex = function () {
            alert("Indexing will take some time.......");
            adminService.loadProductIndex($http)
             .then(function (response) {
                 if (response.data == true) {
                     $scope.savedSuccessfully = true;
                     $scope.message = "Index Created Successfully"
                 }
                 else {
                     $scope.savedSuccessfully = true;
                     $scope.message = "Error in Indexing"
                 }
             });
        }

        function InitializeSiteSettings() {

            adminService.getSiteSettings($http)
            .then(function (response) {
                if (response.data) {
                    $scope.siteSettingList = response.data;

                }
            });
        }
        InitializeSiteSettings();

        $scope.updateSettings = function (setting) {
            adminService.updateSettings($http, setting.SiteKey, setting.NewValue)
           .then(function (response) {
               if (response.data == true) {
                   $scope.savedSuccessfully = true;
                   $scope.message = "successfully updated " + setting.SiteKey;
                   InitializeSiteSettings();
               }
           });
        }

        $scope.siteSettingGridParams = new ngTableParams({
            page: 1,            // show first page
            // count per page
            count: 10,
            filter: { SiteKey: '' },
            // initial sort order
            sorting: { SiteKey: "asc" }
        }, {
            counts: [],
            getData: function ($defer, params) {

                $scope.siteSettingListFiltered = params.sorting() ? $filter('orderBy')($scope.siteSettingList, params.orderBy()) : $scope.siteSettingList;
                $scope.siteSettingListFiltered = params.filter() ? $filter('filter')($scope.siteSettingListFiltered, params.filter()) : $scope.siteSettingListFiltered;
                params.total($scope.siteSettingListFiltered.length);
                if ($scope.siteSettingListFiltered && $scope.siteSettingListFiltered.length > 0) {
                    $scope.siteSettingListFiltered = $scope.siteSettingListFiltered.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve($scope.siteSettingListFiltered);
                }
                else {
                    $defer.resolve($scope.siteSettingList);
                }
            }
        });

    }
}]);
