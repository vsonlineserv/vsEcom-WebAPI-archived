app_retailer.controller('ForgotPasswordController', ['$scope', '$http', '$location', '$rootScope', 'passwordService',
    function ($scope, $http, $location, $rootScope, passwordService) {
        $scope.message = '';
        $scope.successfullySent = false;

        $scope.SendForgetPassword = function () {
            passwordService.forgotPassword($scope, $http, $scope.Email)
             .then(function (response) {
                 if (response.data == false) {
                     $scope.message = 'Sorry. Unable to identify user. Please verify provided email id'
                     $scope.successfullySent = false
                 }
                 else
                 {
                     $scope.message = 'A link has been sent to your mail to reset the password'
                     $scope.successfullySent = true;
                 }
             });
        };
        
         
}]);

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
            mapGeoCoder.geocode({ 'address': glocation }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var geoCodeResult = results;
                    if (displayLatLong(geoCodeResult)) {
                        RegisterRetailer();
                    }
                }
                else {
                    geoCodeResult = "We couldn't find that location. Try again."
                    $scope.savedSuccessfully = false;
                    $scope.message = geoCodeResult;
                }
                    
            });
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
app_retailer.controller('EditProductController', ['$rootScope', '$scope', '$http', '$routeParams',
    '$filter', 'ngTableParams', 'FileUploader', 'productService', 'storesService', 'authInterceptorService',
function ($rootScope, $scope, $http, $routeParams, $filter, ngTableParams, FileUploader, productService, storesService, authInterceptorService) {
    {
        $scope.savedSuccessfully = false;
        $scope.message = "";
        $scope.product = {};
        $scope.productId = 0;
        $scope.filterList = {};
        $scope.filters = {};

        InitializeProductDetails();
        
        function InitializeProductDetails() {
            $scope.productId = ($routeParams.productId) ? parseInt($routeParams.productId) : 0;

            storesService.getFilter($http)
             .then(function (response) {
                 $scope.filterList = response.data;
             });

            loadProductData();
        }

        function loadProductData()
        {
            if ($scope.productId > 0) {

                productService.getProductById($scope, $http, $scope.productId)
                .then(function (response) {
                    $scope.product = response.data;
                    $scope.filters.selectedSubCategory = $scope.product.Category;
                    if (response.data.CategoryDetails) {
                        $scope.filters.selectedCategory = response.data.CategoryDetails.ParentCategoryId;
                    }
                });
            }
        }

        $scope.UpdateProduct = function (product) {
            productService.updateProduct($scope, $http, product)
              .then(function (response) {
                  if (response.data === 'Success') {
                      $scope.savedSuccessfully = true;
                      $scope.message = product.Name + " Updated";
                      loadProductData();
                  }
                  else {
                      $scope.savedSuccessfully = false;
                      $scope.message = " Error updating " + product.Name;
                  }

              },
           function (err) {
               $scope.message = err.error_description;
           });
         }




        var uploader = $scope.uploader = new FileUploader({
            url: 'api/FileUpload/UploadFile?productId=' + $scope.productId,
            withCredentials: true
        });


        authInterceptorService.request(uploader);
        var key = uploader.headers.Authorization;

        uploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                if (this.queue.length >= 3) {
                    alert("Only 3 pictures can be selected");
                }
                var returnValImage = false;
                var returnValLength = false;
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                returnValImage = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;

                if (returnValImage == false) {
                    alert("Unsupported image type");
                }

                returnValLength = this.queue.length < 3;
                return returnValImage && returnValLength;
            }
        });

        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            if (response.toLowerCase() === 'success')
            {
                loadProductData();
            }
            if (response.toLowerCase() === 'failure') {
                fileItem.isSuccess = false;
                fileItem.isError = true;
            }
            fileItem.isUploading = false;

        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            fileItem.isUploading = false;
        };

    }
}]);

app_retailer.controller('FeaturesEditProductController', ['$rootScope', '$scope', '$http', '$routeParams',
    '$filter', 'ngTableParams', 'FileUploader', 'productService', 'storesService', 'authInterceptorService',
function ($rootScope, $scope, $http, $routeParams, $filter, ngTableParams, FileUploader, productService, storesService, authInterceptorService) {
    {
        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.filterRows = [{}];
        $scope.featureRows = [{}];
        $scope.specRows = [{}];
        $scope.addfilterRow = function () {
            $scope.filterRows.push({               
            });
        };
        $scope.addfeatureRow = function () {
            $scope.featureRows.push({

            });
        };
        $scope.addspecRow = function () {
            $scope.specRows.push({

            });
        };

        InitializeProductSpecifications();
        
        function InitializeProductSpecifications() {
            $scope.productId = ($routeParams.productId) ? parseInt($routeParams.productId) : 0;       

            loadProductData();
            loadProductFilterMaster();
        }

        function loadProductData() {
            if ($scope.productId > 0) {

                productService.getProductById($scope, $http, $scope.productId)
                .then(function (response) {
                    $scope.product = response.data;                
                });

                productService.getProductKeyFeatures($scope, $http, $scope.productId)
               .then(function (response) {
                   $scope.featureRows = response.data;
                   if ($scope.featureRows.length == 0) {
                       $scope.addfeatureRow();
                   }
               });

                productService.getProductFilterValues($scope, $http, $scope.productId)
              .then(function (response) {
                  $scope.filterRows = response.data;
                  if ($scope.filterRows.length == 0) {
                      $scope.addfilterRow();
                  }
              });

                productService.getProductSpecification($scope, $http, $scope.productId)
              .then(function (response) {
                  $scope.specRows = response.data;
                  if ($scope.specRows.length == 0) {
                      $scope.addspecRow();
                  }
              });                
            }
        }

        function loadProductFilterMaster()
        {
            if ($scope.productId > 0) {

                productService.getFiltersForProductCategory($scope, $http, $scope.productId)
                .then(function (response) {
                    $scope.productFilters = response.data
                });
            }
        }

        $scope.updateProductSpecifications= function()
        {
            productService.updateProductSpecifications($scope, $http, $scope.productId, $scope.filterRows, $scope.featureRows, $scope.specRows)
               .then(function (response) {
                   $scope.flagUpdated = response.data
                   if($scope.flagUpdated == true)
                   {
                       loadProductData();
                   }
               });
        }

    }
}]);


app_retailer.controller('BulkUploadProductController', ['$rootScope', '$scope', '$http', '$routeParams',
    '$filter', 'ngTableParams', 'FileUploader', 'productService', 'storesService', 'authInterceptorService',
function ($rootScope, $scope, $http, $routeParams, $filter, ngTableParams, FileUploader, productService, storesService, authInterceptorService) {


    $scope.filterList = {};
    $scope.filters = {};
    $scope.categoryName = " ";
    $scope.subCategoryName = " ";
    $scope.savedSuccessfully = false;
    $scope.message = "";

    Initialize();

    function Initialize() {
        $scope.productId = ($routeParams.productId) ? parseInt($routeParams.productId) : 0;

        storesService.getFilter($http)
         .then(function (response) {
             $scope.filterList = response.data;
         });
    }


    var uploaderBulkProducts = $scope.uploaderBulkProducts = new FileUploader({
        url: 'api/FileUpload/UploadBulkProducts',
        withCredentials: true
    });

    authInterceptorService.request(uploaderBulkProducts);
    var key = uploaderBulkProducts.headers.Authorization;

    uploaderBulkProducts.onSuccessItem = function (fileItem, response, status, headers) {
       
        if (response.toLowerCase() === 'failure' || response.toLowerCase() === 'error') {
            fileItem.isSuccess = false;
            fileItem.isError = true;
        }
        else
        {
            $scope.savedSuccessfully = true;
            $scope.message = response;
        }
        fileItem.isUploading = false;

    };
    uploaderBulkProducts.onErrorItem = function (fileItem, response, status, headers) {
        fileItem.isUploading = false;
    };


    var uploaderBulkProductImageZip = $scope.uploaderBulkProductImageZip = new FileUploader({
        url: 'api/FileUpload/UploadBulkImagesInZip',
        withCredentials: true
    });

    authInterceptorService.request(uploaderBulkProductImageZip);
    var key = uploaderBulkProductImageZip.headers.Authorization;

    uploaderBulkProductImageZip.onSuccessItem = function (fileItem, response, status, headers) {
        if (response.toLowerCase() === 'success') {

        }
        if (response.toLowerCase() === 'failure') {
            fileItem.isSuccess = false;
            fileItem.isError = true;
        }
        fileItem.isUploading = false;

    };
    uploaderBulkProductImageZip.onErrorItem = function (fileItem, response, status, headers) {
        fileItem.isUploading = false;
    };

    var uploaderBulkProductImage = $scope.uploaderBulkProductImage = new FileUploader({
        url: 'api/FileUpload/UploadImagesInBulk?category=' + $scope.categoryName + '&subCategory=' + $scope.subCategoryName,
        withCredentials: true
    });

    authInterceptorService.request(uploaderBulkProductImage);
    var key = uploaderBulkProductImage.headers.Authorization;

    $scope.changeProductCategory = function () {
        var  spaceRemovedCatName= $scope.parentCategory.Name.trim().replace(/\s+/g, '_');
        var catNameFormatted = spaceRemovedCatName.replace(/\&+/g, '_');
        var catNameFormatted = catNameFormatted.replace(/\_+/g, '_');
        $scope.categoryName = catNameFormatted.trim();
    }

    $scope.changeProductSubCategory = function () {
        var spaceRemovedCatName = $scope.subCategory.Name.trim().replace(/\s+/g, '_');
        var catNameFormatted = spaceRemovedCatName.replace(/\&+/g, '_');
        var catNameFormatted = catNameFormatted.replace(/\,+/g, '_');
        var catNameFormatted = catNameFormatted.replace(/\_+/g, '_');
        $scope.subCategoryName = catNameFormatted;
    }

    uploaderBulkProductImage.filters.push({
        name: 'customFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            if (this.queue.length >= 100) {
                alert("Only 100 pictures can be selected");
            }
            var returnValImage = false;
            var returnValLength = false;
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            returnValImage = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;

            if (returnValImage == false) {
                alert("Unsupported image type");
            }

           
            returnValLength = this.queue.length <= 100;
            return returnValImage && returnValLength;
        }
    });

    uploaderBulkProductImage.onSuccessItem = function (fileItem, response, status, headers) {
        if (response.toLowerCase() === 'success') {

        }
        if (response.toLowerCase() === 'failure') {
            fileItem.isSuccess = false;
            fileItem.isError = true;
        }
        fileItem.isUploading = false;

    };
    uploaderBulkProductImage.onErrorItem = function (fileItem, response, status, headers) {
        fileItem.isUploading = false;
    };
    uploaderBulkProductImage.onBeforeUploadItem = function (item) {
        if (item.file.name.indexOf("/")== -1)
        {
            item.file.name = $scope.categoryName + "/" + $scope.subCategoryName + "/" + item.file.name;
        }
    };
    
}]);


app_retailer.controller('SEOEditProductController', ['$rootScope', '$scope', '$http', '$routeParams',
    'productService', 'storesService', 'authInterceptorService',
function ($rootScope, $scope, $http, $routeParams, productService, storesService, authInterceptorService) {
    {
        $scope.savedSuccessfully = false;
        $scope.message = "";

        InitializeProductSpecifications();

        function InitializeProductSpecifications() {
            $scope.productId = ($routeParams.productId) ? parseInt($routeParams.productId) : 0;
            loadProductData();
          
        }

        function loadProductData() {
            if ($scope.productId > 0) {
                productService.getProductById($scope, $http, $scope.productId)
                .then(function (response) {
                    $scope.product = response.data;
                }); 
            }
        }

        $scope.UpdateProductSeo = function (product) {
            productService.updateProductSeo($scope, $http, product)
              .then(function (response) {
                  if (response.data === 'Success') {
                      $scope.savedSuccessfully = true;
                      $scope.message = product.Name + " - SEO Updated";
                      loadProductData();
                  }
                  else {
                      $scope.savedSuccessfully = false;
                      $scope.message = " Error updating SEO for " + product.Name;
                  }

              },
           function (err) {
               $scope.message = err.error_description;
           });
        }
    }
}]);
app_retailer.controller('LoginController', ['$scope', '$cookieStore', '$location', '$rootScope', 'authService',
    function ($scope, $cookieStore, $location, $rootScope, authService) {

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

 
    $scope.Login = function () {
        authService.login($scope.loginData).then(function (response) {
            $rootScope.flagLoggedIn = true;
            $rootScope.userName = $scope.loginData.userName;
            $cookieStore.put('userName', $rootScope.userName);
            $cookieStore.put('flagLoggedIn', $rootScope.flagLoggedIn);

            $rootScope.curUserDisplayName = $scope.loginData.userName; 
            $cookieStore.put('curUserDisplayName', $rootScope.curUserDisplayName);

            $location.path('/Dashboard');
        },
         function (err) {
             $scope.message = err.error_description;
             $rootScope.flagLoggedIn = false;
             ClearCookieStore();
         });
    };

    function ClearCookieStore() {
        $cookieStore.remove('userName');
        $cookieStore.remove('flagLoggedIn');
        $cookieStore.remove('curUserDisplayName');
    }

    $scope.ChangePassword = function () {
        $scope.message = '';
        $scope.user = {};
        $scope.user.userName = $rootScope.userName;

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
    };
}]);



app_retailer.controller('ordersController', ['$rootScope', '$scope', '$http','$route', '$routeParams','$filter',
    'ordersService', 'storesService', 'ngTableParams', 'authInterceptorService',
function ($rootScope, $scope, $http,$route, $routeParams, $filter, ordersService, storesService,ngTableParams, authInterceptorService) {

        $scope.RetailerInfo = {};
        $scope.filters = {};
        $scope.message = '';
        $scope.pendingOrdersList = {};
        $scope.filteredOrdersList = {};
        $scope.OrderStatusList = {};
        $scope.PaymentOptionList = {};

        $scope.pageButtonList = [];
        $scope.currentPage = 0;
        var pageSize =100000;
        var pageNo = 1;
        $scope.pagenumbers = 0;

            function initializeOrderStores()
            {
                
                storesService.getRetailerInfo($http)
                .then(function (response) {
                    $rootScope.flagLoggedIn = true;
                    $scope.RetailerInfo = response.data;
                    $rootScope.RetailerInfo = response.data
                    $rootScope.StoreName = $scope.RetailerInfo.StoreName;
                },
             function (err) {
                 $scope.message = err.error_description;
                 $rootScope.flagLoggedIn = false;
             });

                storesService.getFilter($http)
                .then(function (response) {
                    $scope.filterList = response.data
                    loadDefaultFilterValues();
                },
             function (err) {
                 $scope.message = err.error_description;
             });         
             
            }

            var loadDefaultFilterValues = function () {
                if ($rootScope.RetailerInfo.Branches.length > 0) {
                    if (!($rootScope.filters.selectedBranchId > 0) || !$rootScope.filters.selectedBranchId) {
                        $rootScope.filters.selectedBranchId = $rootScope.RetailerInfo.Branches[0].BranchId;
                    }
                }

                if ($scope.filterList.CategoryFilter.length > 0) {
                    //change the logic later by saved filters.
                    $scope.filters.selectedCategory = $scope.filterList.CategoryFilter[0].CategoryId;

                }
                var branch = $rootScope.filters.selectedBranchId;
                getOrderStatus();
                GetPaymentOption();
                    GetTotalOrders(branch);
                    GetPendingOrders(branch, pageSize, pageNo);
                }
                  
            var GetPendingOrders = function (branch, pageSize, pageNo)
        {             
                ordersService.getPendingOrders($scope, $http, branch, pageSize, pageNo)
            .then(function (response) {
                $scope.pendingOrdersList = response.data;
                $scope.pendingOrdersGridParams.reload();
            },
            function (err) {
            

            });
            }
            var GetTotalOrders = function (branch) {
              
                ordersService.GetTotalOrders($scope, $http, branch)
                .then(function (response) {
                    $scope.TotalOrdersList = response.data;

                },
                function (err) {


                });
            }
             
        $scope.pendingOrdersTabClick=function()
        {
            var branch = $rootScope.filters.selectedBranchId;
            $scope.pageButtonList = [];
            GetPendingOrders(branch,pageSize, pageNo);
        }
        var getOrderStatus=function()
        {
            ordersService.getOrderStatus($scope, $http)
            .then(function (response) {           
                $scope.OrderStatusList = response.data;

            },
            function (err) {
            

            });
        }
        $scope.GetOrdersPage = function (obj)
        {
            var pageNo=obj.target.attributes.data.value;
            var branch = $rootScope.filters.selectedBranchId;
            GetPendingOrders(branch, pageSize, pageNo);
        }
        var GetPaymentOption = function ()
        {
          
            ordersService.GetPaymentOption($scope, $http)
                        .then(function (response) {
                            $scope.PaymentOptionList = response.data;

                        },
                        function (err) {
                      

                        });
        }
            initializeOrderStores();

        $scope.changeOrderStatus = function (orders) {
            var changeStatus = window.confirm("Proceed with changing Order Status? \n SubOrder Number : " + orders.Id + "\n Order Number : " + orders.OrderId);
            if(changeStatus)
            {
                ordersService.UpdateOrderStatus($scope, $http, orders.Id, orders.OrderId, orders.OrderItemStatusId)
                .then(function (response) {
                    if (response.data == "true")
                        $scope.pendingOrdersTabClick();
                    $scope.pendingOrdersGridParams.reload();
                    $scope.message = orders.Id + " / " + orders.OrderId + " Status Changed.";
                    $scope.savedSuccessfully = true;
                });
            }
        
        }
        $scope.changePaymentStatus = function (orders) {
        $scope.orderPaymentStatusId = orders.OrderItemStatusId;
        ordersService.UpdatePaymentStatus($scope, $http);
    }

    $scope.SearchOrders = function (order)
    {
        var branch = $rootScope.filters.selectedBranchId;

        if ((!order.status || order.status == "") && !(order.id>0))
        {
            GetPendingOrders(branch, pageSize, pageNo)
            return;
        }
        var orderStatus = order.status;
        var paymentStatus = order.payment;
      var orderid = order.id;
        if (orderid==null)
        {
            orderid =0;
        }
        if (orderStatus==null) {
            orderStatus = 0;
        }
        if (order.payment==null)
        {
            paymentStatus =0;
        }
        ordersService.getOrderSearch($scope, $http, branch, orderStatus, orderid, paymentStatus)
       .then(function (response) {
           $scope.pendingOrdersList = response.data;
           $scope.pendingOrdersGridParams.reload();
       },
       function (err) {
         
       });
       
    }
    var range = function () {
        var rangeSize = 4;
        var start;

        start = $scope.currentPage;
        if ($scope.pagenumbers < 4) {
            $scope.pageButtonList = [];
            for (var i = start; i <= $scope.pagenumbers; i++) {

                $scope.pageButtonList.push(i);

            }
        }
        else {
            if (start > $scope.pagenumbers - rangeSize) {

                start = $scope.pagenumbers - rangeSize + 1;

            }
            $scope.pageButtonList = [];
            for (var i = start; i < start + rangeSize; i++) {

                $scope.pageButtonList.push(i);

            }
        }
       


    }

    $scope.prevPage = function () {

        if ($scope.currentPage > 0) {
            var pageno = $scope.currentPage - 1;
            var branch = $rootScope.filters.selectedBranchId;
            GetPendingOrders(branch, pageSize, pageno);
            $scope.currentPage--;
            range();

        }
    };

    $scope.DisablePrevPage = function () {

        return $scope.currentPage === 0 ? "disabled" : "";

    };
    var pageCount = function () {

        $scope.pagenumbers = Math.ceil($scope.TotalOrdersList.length / pageSize) - 1;

    };
    $scope.nextPage = function () {

        if ($scope.currentPage < $scope.pagenumbers) {
            var pageno = $scope.currentPage + 1;
            var branch = $rootScope.filters.selectedBranchId;
            GetPendingOrders(branch, pageSize, pageno);
            $scope.currentPage++;
            range();

        }
    };
    $scope.DisableNextPage = function () {

        return $scope.currentPage === $scope.pagenumbers ? "disabled" : "";

    };
    $scope.setPage = function (n) {
        var pageno = n + 1;
        var branch = $rootScope.filters.selectedBranchId;
    
        GetPendingOrders(branch,pageSize,pageno)
        $scope.currentPage = n;

    };
  
   $scope.pendingOrdersGridParams = new ngTableParams({
       page: 1,            // show first page
       count: 10,        // count per page

   },
       {
           counts: [10, 25, 50, 100],
           total: angular.isUndefined($scope.pendingOrdersList.length) ? 0 : $scope.pendingOrdersList.length,
           getData: function ($defer, params) {
               $scope.filteredOrdersList = params.sorting() ? $filter('orderBy')($scope.pendingOrdersList, params.orderBy()) : $scope.pendingOrdersList;
               $scope.filteredOrdersList = params.filter() ? $filter('filter')($scope.filteredOrdersList, params.filter()) : $scope.filteredOrdersList;               
               if ($scope.filteredOrdersList && $scope.filteredOrdersList.length > 0) {
                   params.total($scope.filteredOrdersList.length);
                   params.totalPage = (Math.ceil($scope.filteredOrdersList.length / params.count()));
                   $scope.filteredOrdersList = $scope.filteredOrdersList.slice((params.page() - 1) * params.count(), params.page() * params.count());
                   $defer.resolve($scope.filteredOrdersList);
               }
               else {
                   params.total($scope.pendingOrdersList.length);
                   params.totalPage = (Math.ceil($scope.pendingOrdersList.length / params.count()));
                   $defer.resolve($scope.pendingOrdersList);
               }

           }
       });

   $rootScope.onBranchChange = function () {
       $route.reload();
   }

   $scope.getLocalDate = function (dateUtc) {
       var LOCALTIME = new Date(dateUtc + 'Z'); // Clone UTC Timestamp
       return LOCALTIME;
   }
}]);


app_retailer.controller('PrintOrderController', ['$scope', '$location', '$http', '$rootScope', '$routeParams', 'ordersService',
function ($scope, $location, $http, $rootScope, $routeParams, ordersService) {

    $scope.message = '';
    $scope.orderConfirmationDate = {};

    InitializePrintOrder();
    function InitializePrintOrder() {

        ordersService.printOrderDetails($http, $routeParams.orderId)
                   .then(function (response) {
                       if (response.data) {
                           $scope.printorderDetails = response.data;
                            

                           var IST = new Date($scope.printorderDetails.OrderDetails.OrderDateUtc + 'Z'); // Clone UTC Timestamp                           
                           $scope.orderConfirmationDate = IST;
                       }
                   });
    }

}]);


app_retailer.controller('dashboardController', ['$rootScope', '$scope', '$http', '$route', '$routeParams', '$filter',
    'ordersService', 'storesService', 'authInterceptorService',
function ($rootScope, $scope, $http, $route, $routeParams, $filter, ordersService, storesService, authInterceptorService) {

    $scope.RetailerInfo = {};
    $scope.filters = {};
    $scope.message = '';

    $scope.orderSummaryList = {};
    $scope.OrderStatusList = {};
    $scope.PaymentOptionList = {};
    $scope.TotalOrdersList = {};
 

    function groupBy(array, col, value) {
        var r = [], o = {};
        array.forEach(function (a) {
            if (!o[a[col]]) {
                o[a[col]] = {};
                o[a[col]][col] = a[col];
                o[a[col]][value] = 0;
                r.push(o[a[col]]);
            }
            o[a[col]][value] += +a[value];
        });
        return r;
    };

    function InitializeDashboard() {

        storesService.getRetailerInfo($http)
        .then(function (response) {
            $rootScope.flagLoggedIn = true;
            $scope.RetailerInfo = response.data;
            $rootScope.RetailerInfo = response.data
            $rootScope.StoreName = $scope.RetailerInfo.StoreName;
        },
     function (err) {
         $scope.message = err.error_description;
         $rootScope.flagLoggedIn = false;
     });

        storesService.getFilter($http)
        .then(function (response) {
            $scope.filterList = response.data
            loadDefaultFilterValues();
        },
     function (err) {
         $scope.message = err.error_description;
     });

        GetOrderSummary();

    }

    var loadDefaultFilterValues = function () {
        if ($rootScope.RetailerInfo.Branches.length > 0) {
            if (!($rootScope.filters.selectedBranchId > 0) || !$rootScope.filters.selectedBranchId) {
                $rootScope.filters.selectedBranchId = $rootScope.RetailerInfo.Branches[0].BranchId;
            }
        }

        if ($scope.filterList.CategoryFilter.length > 0) {
            $scope.filters.selectedCategory = $scope.filterList.CategoryFilter[0].CategoryId;

        }
        var branch = $rootScope.filters.selectedBranchId;
        GetOrderSummary(branch);
    }
    var GetOrderSummary = function (branch) {
        ordersService.getOrdersSummary($scope, $http, branch)
        .then(function (response) {

            $scope.orderSummaryList = response.data;

        },
        function (err) {
        });

        ordersService.getOrderSummaryByCategory($scope, $http, branch)
       .then(function (response) {

           $scope.orderCategorySummaryList = response.data;

       },
       function (err) {
       });

        ordersService.getOrderSummaryByProduct($scope, $http, branch)
      .then(function (response) {

          $scope.orderProductSummaryList = response.data;

      },
      function (err) {
      });

        ordersService.getOrderCountByStatus($scope, $http, branch)
     .then(function (response) {
         var label = [];
         var data = [];
         $scope.orderCountByStatusSummaryList = response.data;

         var groupresult = groupBy($scope.orderCountByStatusSummaryList, 'PaymentMethodString', 'OrderCount');

         for (var i = 0; i < groupresult.length; i++) {
             label.push(groupresult[i]["PaymentMethodString"]);
             data.push(groupresult[i]["OrderCount"]);
         }
         $scope.labelpaymentMethod = label;
         $scope.datapaymentMethod = data;
     },
     function (err) {
     });

        ordersService.getBranchProductSummary($scope, $http, branch)
    .then(function (response) {

        $scope.branchProductSummaryList = response.data;

    },
    function (err) {
    });

        ordersService.getBranchEnquirySummary($scope, $http, branch)
   .then(function (response) {

       $scope.branchEnquirySummaryList = response.data;

   },
   function (err) {
   });

        ordersService.getLast7DaysSalesChart($scope, $http, branch)
    .then(function (response) {

        $scope.branch7daysSalesChart = response.data;
        $scope.labelweekday = [];
        $scope.seriesweekday = [];
        $scope.dataweekday = [];
        $scope.seriesweekday = ['Sales'];
        var label = [];
        var salesdata1 = [];
        for (var i = 0; i < $scope.branch7daysSalesChart.length; i++) {
            label.push($scope.branch7daysSalesChart[i]["Period"]);
            salesdata1.push($scope.branch7daysSalesChart[i]["Total"]);
        }
        $scope.labelweekday = label;
        $scope.dataweekday.push(salesdata1);
    },
    function (err) {
    });

        ordersService.getLast6MonthsSalesChart($scope, $http, branch)
        .then(function (response) {

            $scope.branch6MonthsSalesChart = response.data;
            $scope.labelMonth = [];
            $scope.seriesMonth = [];
            $scope.dataMonth = [];
            $scope.seriesMonth = ['Sales'];
            var label = [];
            var salesdata1 = [];
            for (var i = 0; i < $scope.branch6MonthsSalesChart.length; i++) {
                label.push($scope.branch6MonthsSalesChart[i]["Period"]);
                salesdata1.push($scope.branch6MonthsSalesChart[i]["Total"]);
            }
            $scope.labelMonth = label;
            $scope.dataMonth.push(salesdata1);
        },
        function (err) {
        });

    }
     
    InitializeDashboard();

    $rootScope.onBranchChange = function () {
        $route.reload();
    }
}]);


app_retailer.controller('ResetPasswordController', ['$scope', '$location', '$http', '$rootScope', '$routeParams', 'passwordService',
    function ($scope, $location, $http, $rootScope, $routeParams, passwordService) {


        $scope.message = '';

        InitializeResetPassword();

        function InitializeResetPassword()
        {
            $scope.uid = $routeParams.uid;
            $scope.username = $routeParams.username;
        }


        $scope.ResetPassword = function () {
            $scope.message = '';
            if ($scope.user.Password === $scope.user.ConfirmPassword) {
                passwordService.resetPassword($scope, $http, $scope.username, $scope.user.Password)
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
    }]);


app_retailer.controller('StoresController', ['$rootScope', '$scope', '$http', '$routeParams', '$route',
    '$filter', 'ngTableParams', 'FileUploader', 'storesService', 'authInterceptorService',
function ($rootScope, $scope, $http, $routeParams, $route, $filter, ngTableParams, FileUploader, storesService, authInterceptorService) {
    {
        $scope.StoreName = "";
        $scope.message = '';
        $scope.filters = {};
        $scope.ProductList = {};
        $scope.filteredProductList = {};
        $scope.MyFilteredProductList = {};
        $scope.RetailerInfo = {};
 
        function InitializeRetailerStores() {
         
            storesService.getRetailerInfo($http)
            .then(function (response) {
                $rootScope.flagLoggedIn = true;
                $scope.RetailerInfo = response.data;
                $rootScope.RetailerInfo = response.data
                $rootScope.StoreName = $scope.RetailerInfo.StoreName;
            },
         function (err) {
             $scope.message = err.error_description;
             $rootScope.flagLoggedIn = false;
         });

            storesService.getFilter($http)
            .then(function (response) {
                $scope.filterList = response.data;
                loadDefaultFilterValues();
            },
         function (err) {
             $scope.message = err.error_description;
         });            
        }

        InitializeRetailerStores();
        var loadDefaultFilterValues = function () {
            $scope.RetailerInfo = $rootScope.RetailerInfo;
            if ($scope.RetailerInfo.Branches.length > 0) {

                if (!($rootScope.filters.selectedBranchId > 0)) {
                    $rootScope.filters.selectedBranchId = $scope.RetailerInfo.Branches[0].BranchId;
                    $scope.filters.selectedBranchId = $rootScope.filters.selectedBranchId;
                }
            }


            if ($scope.filterList.CategoryFilter.length > 0) {
                //change the logic later by saved filters.
                $scope.filters.selectedCategory = $scope.filterList.CategoryFilter[0].CategoryId;
                $scope.filters.selectedCategoryObj = $scope.filterList.CategoryFilter[0];

                if (!($scope.filters.selectedSubCategory > 0)) {
                    var subCatgoryFilterList = $filter('filter')($scope.filterList.SubCategoryFilter, { 'ParentCategoryId': $scope.filters.selectedCategory });
                    $scope.filters.selectedSubCategoryObj = subCatgoryFilterList[0];
                    $scope.filters.selectedSubCategory = subCatgoryFilterList[0].CategoryId;
                }
            }

            $scope.selectedPage = 1;
            GetAllProducts();
        }
        
        $scope.GetProducts = function () {     
                GetAllProducts();  
        }

        $rootScope.onBranchChange = function ()
        {
            $route.reload();
        }
         
        var GetAllProducts = function () {           
            storesService.getProducts($scope, $http)
                  .then(function (response) {
                      $scope.ProductList = response.data;
                      $scope.includeProductsGridParams.reload();
                  },
               function (err) {
                   $scope.message = err.error_description;
               
               });
        }

        $scope.includeProductsGridParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,        // count per page
            filter: { Name: '' }
        }, {
            counts: [10,25,50,100],
            paginationMaxBlocks: 12,
            paginationMinBlocks: 2,
            total: !angular.isUndefined($scope.ProductList.length) ? $scope.ProductList.length : 0, // length of data
            getData: function ($defer, params) {
                $scope.filteredProductList = params.sorting() ? $filter('orderBy')($scope.ProductList, params.orderBy()) : $scope.ProductList;
                $scope.filteredProductList = params.filter() ? $filter('filter')($scope.filteredProductList, params.filter()) : $scope.filteredProductList;
                params.total($scope.filteredProductList.length);
                params.totalPage = (Math.ceil($scope.filteredProductList.length / params.count()));
                if ($scope.filteredProductList.length > 0) {
                    $scope.filteredProductList = $scope.filteredProductList.slice((params.page() - 1) * params.count(), params.page() * params.count());
                }
                $defer.resolve($scope.filteredProductList);
            }
        });

        $scope.savedSuccessfully = false;

        $scope.IncludeProduct = function (includeproductPricing) {
            includeproductPricing.StoreId = $scope.RetailerInfo.StoreId;
            includeproductPricing.BranchIdList = $rootScope.filters.selectedBranchId;

            if (!includeproductPricing.NewPrice) {
                includeproductPricing.NewPrice = includeproductPricing.Price
            }
            if (!includeproductPricing.NewSpecialPrice)
            {
                includeproductPricing.NewSpecialPrice = includeproductPricing.NewPrice;
            }

            storesService.includeProduct($scope, $http, includeproductPricing)
              .then(function (response) {
                  var responseData = response.data;
                  if (responseData.toLowerCase() === 'success') {
                      $scope.savedSuccessfully = true;
                      $scope.message = includeproductPricing.Name + "  Added to your Store";                      
                  }
                  else if (responseData.toLowerCase() === 'alreadyexist')
                  {
                      $scope.savedSuccessfully = false;
                      $scope.message = includeproductPricing.Name + " Already exist in your store";
                  }
                  else
                  {
                      $scope.savedSuccessfully = false;
                      $scope.message = " Error updating " + includeproductPricing.Name;
                  }
              },
           function (err) {
               $scope.savedSuccessfully = false;
               $scope.message = err.error_description;
           });
            includeproductPricing.$edit = false;
        }

        $scope.changeCategory = function()
        {
            $scope.filters.selectedCategory = $scope.filters.selectedCategoryObj.CategoryId;
            $scope.filters.selectedCategoryName = $scope.filters.selectedCategoryObj.Name;
        }

        $scope.changeSubCategory = function () {
            $scope.filters.selectedSubCategory = $scope.filters.selectedSubCategoryObj.CategoryId;
            $scope.filters.selectedSubCategoryName = $scope.filters.selectedSubCategoryObj.Name;
        }

       
        var  range=function()
        {
            var rangeSize = 4;
            var start;

            start = $scope.currentPage;

            if ($scope.pagenumbers <4)
            {
                $scope.pageButtonList = [];
                for (var i = start; i <= $scope.pagenumbers; i++) {

                    $scope.pageButtonList.push(i);

                }
            }
            else {
                if (start > $scope.pagenumbers - rangeSize) {

                    start = $scope.pagenumbers - rangeSize + 1;

                }

                $scope.pageButtonList = [];
                for (var i = start; i < start + rangeSize; i++) {

                    $scope.pageButtonList.push(i);

                }
            }
         


        }

        $scope.prevPage = function () {

            if ($scope.currentPage > 0) {
                var pageno = $scope.currentPage - 1;
                productPageList(pageno);
                $scope.currentPage--;
                range();

            }
        };

        $scope.DisablePrevPage = function () {

            return $scope.currentPage === 0 ? "disabled" : "";

        };
        var pageCount = function () {

            $scope.pagenumbers = Math.ceil(totalProduct / pageSize) - 1;

        };
        $scope.nextPage = function () {

            if ($scope.currentPage < $scope.pagenumbers) {
                var pageno = $scope.currentPage + 1;
                productPageList(pageno);
                $scope.currentPage++;
                range();

            }
        };
        $scope.DisableNextPage = function () {

            return $scope.currentPage === $scope.pagenumbers ? "disabled" : "";

        };
        $scope.setPage = function (n) {
           var pageno = n + 1;
           productPageList(pageno);
            $scope.currentPage = n;

        };
        
    }
}]);


app_retailer.controller('InboxController', ['$rootScope', '$scope', '$http', '$routeParams', '$route',
    '$filter', 'ngTableParams', 'storesService', 'authInterceptorService',
function ($rootScope, $scope, $http, $routeParams,$route, $filter, ngTableParams, storesService, authInterceptorService) {
    {
        $scope.StoreName = "";
        $scope.message = '';
 
        $scope.MyInboxList = {};


        function InitializeRetailerStores() {

            storesService.getRetailerInfo($http)
            .then(function (response) {
                $rootScope.flagLoggedIn = true;
                $scope.RetailerInfo = response.data;
                $rootScope.RetailerInfo = response.data
                $rootScope.StoreName = $scope.RetailerInfo.StoreName;
            },
         function (err) {
             $scope.message = err.error_description;
             $rootScope.flagLoggedIn = false;
         });

            storesService.getFilter($http)
            .then(function (response) {
                $scope.filterList = response.data;
                loadDefaultFilterValues();
                loadInbox();
            },
         function (err) {
             $scope.message = err.error_description;
         });
        }

        InitializeRetailerStores();
        var loadDefaultFilterValues = function () {
            if ($rootScope.RetailerInfo.Branches.length > 0) {
                if (!($rootScope.filters.selectedBranchId > 0) || !$rootScope.filters.selectedBranchId) {
                    $rootScope.filters.selectedBranchId = $rootScope.RetailerInfo.Branches[0].BranchId;
                }
            }

        }

        function loadInbox() {
            storesService.getInbox($scope, $http, $rootScope.filters.selectedBranchId)
                    .then(function (response) {
                        $scope.MyInboxList = response.data;
                        $scope.myInbox.reload();
                    });
        }

 
        $scope.myInbox = new ngTableParams({
            page: 1,            // show first page
            count: 40,
        }, {
            counts: [10, 25, 50, 100],
            total: angular.isUndefined($scope.MyInboxList.length) ? 0 : $scope.MyInboxList.length,
            getData: function ($defer, params) {
                $scope.gridInboxList = params.sorting() ? $filter('orderBy')($scope.MyInboxList, params.orderBy()) : $scope.MyInboxList;
                $scope.gridInboxList = params.filter() ? $filter('filter')($scope.gridInboxList, params.filter()) : $scope.gridInboxList;
                params.total($scope.gridInboxList.length);
                params.totalPage = (Math.ceil($scope.gridInboxList.length / params.count()));
                if ($scope.gridInboxList.length > 0) {
                    $scope.gridInboxList = $scope.gridInboxList.slice((params.page() - 1) * params.count(), params.page() * params.count());
                }
                $defer.resolve($scope.gridInboxList);
            }
        });

        $scope.savedSuccessfully = false;

        $scope.InboxReply = function (mailId, reply, mail) {
            var status = false;
            storesService.InboxReply($scope, $http, mailId, reply)
             .then(function (response) {
                 if (response.statusText == 'OK') {
                     mail.replyStatusError = "";
                     mail.replyStatus = "successfully replied";
                     status = true;
                 }
                 else {
                     mail.replyStatus = "";
                     mail.replyStatusError = "Reply not sent. please resend";
                     status = true;
                 }
             });
        }
      
        $rootScope.onBranchChange = function () {
            $route.reload();
        }
    }
}]);


app_retailer.controller('PricingController', ['$rootScope', '$scope', '$http', '$routeParams','$route',
    '$filter', 'ngTableParams', 'storesService', 'authInterceptorService',
function ($rootScope, $scope, $http, $routeParams,$route, $filter, ngTableParams, storesService, authInterceptorService) {
    {
        $scope.StoreName = "";
        $scope.message = '';
        $scope.filters = {}; 
        $scope.MyFilteredProductList = {};      
        $scope.gridfilteredPricingList = {};
        $scope.RetailerInfo = {};       
        $scope.pageButtonList = [];
        $scope.pricingPageButtonList = [];
        var pageSize = 100000;
        $scope.pagenumbers = 0;


        $rootScope.onBranchChange = function () {
            $route.reload();
        }

        var loadDefaultFilterValues = function () {
            $scope.RetailerInfo = $rootScope.RetailerInfo;
            if ($scope.RetailerInfo.Branches.length > 0) {

                if (!($rootScope.filters.selectedBranchId > 0)) {
                    $rootScope.filters.selectedBranchId = $scope.RetailerInfo.Branches[0].BranchId; 
                }
                $scope.filters.selectedBranchId = $rootScope.filters.selectedBranchId;
            }

              
            if ($scope.filterList.CategoryFilter.length > 0) {
                //change the logic later by saved filters.
                $scope.filters.selectedCategory = $scope.filterList.CategoryFilter[0].CategoryId;
                $scope.filters.selectedCategoryObj = $scope.filterList.CategoryFilter[0];

                if (!($scope.filters.selectedSubCategory > 0)) {
                    var subCatgoryFilterList = $filter('filter')($scope.filterList.SubCategoryFilter, { 'ParentCategoryId': $scope.filters.selectedCategory });
                    $scope.filters.selectedSubCategoryObj = subCatgoryFilterList[0];
                    $scope.filters.selectedSubCategory = subCatgoryFilterList[0].CategoryId;
                }
            }
          
            $scope.selectedPage = 1;
            GetMyFilteredProductsPaging();
        }
        
        function InitializeRetailerStoresANDPricing() {

            storesService.getRetailerInfo($http)
            .then(function (response) {
                $rootScope.flagLoggedIn = true;
                $scope.RetailerInfo = response.data;
                $rootScope.RetailerInfo = response.data
                $rootScope.StoreName = $scope.RetailerInfo.StoreName;

            },
         function (err) {
             $scope.message = err.error_description;
             $rootScope.flagLoggedIn = false;
         });

            storesService.getFilter($http)
            .then(function (response) {
                $scope.filterList = response.data;
                loadDefaultFilterValues();
            },
         function (err) {
             $scope.message = err.error_description;
         });
        }
        InitializeRetailerStoresANDPricing();

        var GetMyFilteredProductsPaging = function () {

            var pageNo = $scope.selectedPage;
            storesService.getMyFilteredProductsPaging($scope, $http, pageNo, pageSize)
              .then(function (response) {
                  $scope.MyFilteredProductList = response.data;                 
                  if ($scope.MyFilteredProductList != null) {
                      
                      for (var i = 0; i < $scope.MyFilteredProductList.length; i++) {

                          //if (!$scope.MyFilteredProductList[i].PriceStartTime)
                          //{
                          //    $scope.MyFilteredProductList[i].PriceStartTime = new Date();
                          //}
                          //if (!$scope.MyFilteredProductList[i].PriceEndTime) {
                          //    $scope.MyFilteredProductList[i].PriceEndTime = new Date();
                          //}

                          $scope.MyFilteredProductList[i].NewPrice = $scope.MyFilteredProductList[i].Price;
                          $scope.MyFilteredProductList[i].NewSpecialPrice = $scope.MyFilteredProductList[i].SpecialPrice;
                          $scope.MyFilteredProductList[i].NewSpecialPriceDescription = $scope.MyFilteredProductList[i].SpecialPriceDescription;
                          $scope.MyFilteredProductList[i].NewPriceStartTime = $scope.MyFilteredProductList[i].PriceStartTime;
                          $scope.MyFilteredProductList[i].NewPriceEndTime = $scope.MyFilteredProductList[i].PriceEndTime;
                          $scope.MyFilteredProductList[i].NewAdditionalTax = $scope.MyFilteredProductList[i].AdditionalTax;
                          $scope.MyFilteredProductList[i].NewShippingCharge = $scope.MyFilteredProductList[i].AdditionalShippingCharge;                          
                          $scope.MyFilteredProductList[i].NewDeliveryTime = $scope.MyFilteredProductList[i].DeliveryTime;
                      }
                  }
                  else
                  {

                  }
                  $scope.myProductGridParams.reload();
              });
        }
        
        $scope.GetProducts = function () {
            GetMyFilteredProductsPaging();            
        }

        $scope.myProductGridParams = new ngTableParams({
            // show first page
            count: 10,        // count per page
            filter: { ProductName: '' }
        }, {
            counts: [10, 25, 50, 100],
            paginationMaxBlocks: 12,
            paginationMinBlocks: 2,
            total: !angular.isUndefined($scope.MyFilteredProductList.length) ? $scope.MyFilteredProductList.length : 0, // length of data
            getData: function ($defer, params) {
                if ($scope.MyFilteredProductList.length > 0) {
                    $scope.gridfilteredPricingList = params.sorting() ? $filter('orderBy')($scope.MyFilteredProductList, params.orderBy()) : $scope.MyFilteredProductList;
                    $scope.gridfilteredPricingList = params.filter() ? $filter('filter')($scope.gridfilteredPricingList, params.filter()) : $scope.gridfilteredPricingList;
                    params.total($scope.gridfilteredPricingList.length);
                    params.totalPage = (Math.ceil($scope.gridfilteredPricingList.length / params.count()));
                    if ($scope.gridfilteredPricingList.length > 0) {
                        $scope.gridfilteredPricingList = $scope.gridfilteredPricingList.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    }
                    $defer.resolve($scope.gridfilteredPricingList);
                }
                else
                {
                    $defer.resolve($scope.MyFilteredProductList);
                }
            }
        });


        $scope.savedSuccessfully = false;

        $scope.UpdatePrice = function (productPricing) {
            storesService.updatePrice($scope, $http, productPricing)
              .then(function (response) {
                  if (response.data === true) {
                      $scope.savedSuccessfully = true;
                      $scope.message = productPricing.ProductName + " Updated";
                      $scope.GetProducts();
                  }
                  else {
                      $scope.savedSuccessfully = false;
                      $scope.message = " Error updating " + productPricing.ProductName;
                  }

              },
           function (err) {
               $scope.message = err.error_description;
           });
            productPricing.$edit = false;
        }

        $scope.changeCategory = function () {
            $scope.filters.selectedCategory = $scope.filters.selectedCategoryObj.CategoryId;
            $scope.filters.selectedCategoryName = $scope.filters.selectedCategoryObj.Name;
        }

        $scope.changeSubCategory = function () {
            $scope.filters.selectedSubCategory = $scope.filters.selectedSubCategoryObj.CategoryId;
            $scope.filters.selectedSubCategoryName = $scope.filters.selectedSubCategoryObj.Name;
        }

        $scope.Suspend = function (product) {
            //Todo:

            storesService.removeProduct($scope, $http, product)
            .then(function (response) {
                if (response.data == true) {
                    $scope.savedSuccessfully = true;
                    $scope.message = product.ProductName + " Removed";
                    $scope.GetProducts();
                }
                else {
                    $scope.savedSuccessfully = false;
                    $scope.message = "Cannot Remove " + product.ProductName;
                }
            },
            function (err) {
                $scope.message = err.error_description;
            }
            );

        }

        $scope.Resume = function (product) {
            //Todo:

            storesService.resumeProduct($scope, $http, product)
            .then(function (response) {
                if (response.data == true) {
                    $scope.savedSuccessfully = true;
                    $scope.message = product.ProductName + " Resumed Successfully";
                    $scope.GetProducts();
                }
                else {
                    $scope.savedSuccessfully = false;
                    $scope.message = "Cannot Include " + product.ProductName;
                }
            },
            function (err) {
                $scope.message = err.error_description;
            }
            );

        }

        var range = function () {
            var rangeSize = 4;
            var start;

            start = $scope.currentPage;

            if ($scope.pagenumbers < 4) {
                $scope.pageButtonList = [];
                for (var i = start; i <= $scope.pagenumbers; i++) {

                    $scope.pageButtonList.push(i);

                }
            }
            else {
                if (start > $scope.pagenumbers - rangeSize) {

                    start = $scope.pagenumbers - rangeSize + 1;

                }

                $scope.pageButtonList = [];
                for (var i = start; i < start + rangeSize; i++) {

                    $scope.pageButtonList.push(i);

                }
            }



        }

        $scope.prevPricingPage = function () {

            if ($scope.currentPricingPage > 0) {
                var pageno = $scope.currentPricingPage - 1;
                GetMyFilteredProductsPaging(pageno);
                $scope.currentPricingPage--;
                

            }
        };
        $scope.DisablePrevPricingPage = function () {

            return $scope.currentPricingPage === 0 ? "disabled" : "";

        };
        var pagePricingCount = function () {

            $scope.pricingPagenumber = Math.ceil(totalPricing / pageSize) - 1;

        };
        $scope.nextPricingPage = function () {

            if ($scope.currentPricingPage < $scope.pricingPagenumber) {
                var pageno = $scope.currentPricingPage + 1;
                GetMyFilteredProductsPaging(pageno);
                $scope.currentPricingPage++;
                

            }
        };
        $scope.DisableNextPricingPage = function () {

            return $scope.currentPricingPage === $scope.pricingPagenumber ? "disabled" : "";

        };
        $scope.setPricingPage = function (n) {
            var pageno = n + 1;
            GetMyFilteredProductsPaging(pageno);
            $scope.currentPricingPage = n;

        };
    }
}]);

app_retailer.controller('NewProductController', ['$rootScope', '$scope', '$http', '$routeParams',
    '$filter', '$timeout', '$location', 'ngTableParams', 'FileUploader', 'storesService', 'authInterceptorService',
function ($rootScope, $scope, $http, $routeParams, $filter, $timeout, $location, ngTableParams, FileUploader, storesService, authInterceptorService) {
    {
        $scope.StoreName = "";
        $scope.message = '';
        $scope.filters = {};
        $scope.newproduct = {};
        $scope.RetailerInfo = {};
       
        $scope.weightList = [
       { name: 'g', Id: 1 },
       { name: 'mg', Id: 2 },
       { name: 'kg', Id: 3 }
        ];
        $scope.LWHList = [
     { name: 'cm', Id: 1 },
     { name: 'mm', Id: 2 },
     { name: 'inch', Id: 3 }
        ];

        function InitializeRetailerStores() {

            storesService.getRetailerInfo($http)
            .then(function (response) {
                $rootScope.flagLoggedIn = true;
                $scope.RetailerInfo = response.data;
                $rootScope.RetailerInfo = response.data
                $rootScope.StoreName = $scope.RetailerInfo.StoreName;
                branch = $scope.RetailerInfo.Branches[0].BranchId;

            },
         function (err) {
             $scope.message = err.error_description;
             $rootScope.flagLoggedIn = false;
         });

            storesService.getFilter($http)
            .then(function (response) {
                $scope.filterList = response.data;
                loadDefaultFilterValues();
            },
         function (err) {
             $scope.message = err.error_description;
         });
        }

        InitializeRetailerStores();
        $scope.showProduct = false;
        $scope.showPricing = false;
        var loadDefaultFilterValues = function () {
            if ($scope.RetailerInfo.Branches.length > 0) {
                if (!($rootScope.filters.selectedBranchId > 0)) {
                    $rootScope.filters.selectedBranchId = $scope.RetailerInfo.Branches[0].BranchId;
                }

            }

            if ($scope.filterList.CategoryFilter.length > 0) {
                //change the logic later by saved filters.
                $scope.filters.selectedCategory = $scope.filterList.CategoryFilter[0].CategoryId;

            }

        }

        $scope.savedSuccessfully = false;
        $scope.changeProductCategory = function () {
            $scope.newproduct.selectedCategory = $scope.newproduct.selectedCategoryObj.CategoryId;
            $scope.newproduct.selectedCategoryName = $scope.newproduct.selectedCategoryObj.Name;
        }

        $scope.changeProductSubCategory = function () {
            $scope.newproduct.selectedSubCategory = $scope.newproduct.selectedSubCategoryObj.CategoryId;
            $scope.newproduct.selectedSubCategoryName = $scope.newproduct.selectedSubCategoryObj.Name;
        }

        $scope.AddNewProduct = function (newProduct) {
            // include category
            newProduct.Category = $scope.newproduct.selectedSubCategory;
            newProduct.Weight = newProduct.WeightProperty + (newProduct.selectWeight) ? newProduct.selectWeight.name : '';
            newProduct.Length = newProduct.LengthProperty + (newProduct.selectLWh) ? newProduct.selectLWh.name : '';
            newProduct.Width = newProduct.WidthProperty + (newProduct.selectLWh) ? newProduct.selectLWh.name : '';
            newProduct.Height = newProduct.HeightProperty + (newProduct.selectLWh) ? newProduct.selectLWh.name : '';


            var selectedCategory = $scope.newproduct.selectedCategory;
            var selectedSubCategory = $scope.newproduct.selectedSubCategory;

            storesService.createProduct($scope, $http, newProduct)
              .then(function (response) {
                  if (response.data && response.data.StatusString === 'Success') {
                      $scope.savedSuccessfully = true;
                      $scope.message = newProduct.Name + " created" + " Go to Manage Product and add the product to your stores.";

                      $timeout(function () {
                          $location.path('/UpdateProductImage/' + response.data.NewProduct.ProductId);
                      }, 4000);
                  }
                  else if (response.data && response.data.StatusString.toLowerCase() === 'alreadyexist') {

                      $scope.savedSuccessfully = false;
                      $scope.message = newProduct.Name + " already availble in catalog";

                  }
                  else {

                      $scope.savedSuccessfully = false;
                      $scope.message = " Error updating " + newProduct.Name;

                  }

              },
           function (err) {
               $scope.message = err.error_description;
           });
        }
    }
}]);
