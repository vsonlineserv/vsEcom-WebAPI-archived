 ////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
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
            url: 'http://localhost:49475/api/FileUpload/UploadFile?productId=' + $scope.productId,
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