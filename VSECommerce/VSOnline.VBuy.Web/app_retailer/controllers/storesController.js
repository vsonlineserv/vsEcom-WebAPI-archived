 ////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
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
