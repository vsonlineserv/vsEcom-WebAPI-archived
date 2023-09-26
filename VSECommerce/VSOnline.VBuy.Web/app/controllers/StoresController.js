////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
app.controller('StoresController', ['$scope', '$http', '$routeParams', '$rootScope', 'localStorageService', 'storesService', 'productService', 'breadcrumbs',
function ($scope, $http, $routeParams, $rootScope, localStorageService, storesService, productService, breadcrumbs) {
    {
        $scope.message = "";
        $scope.filterList = {};
        $scope.products = {};
        $scope.StoreInfo = {};
        $scope.filters = {};
        $scope.branchAddress = {};
        $scope.branchRating = 0;
        $scope.contactData = {};
        $scope.contactData.message = '';
        $scope.EnableBuy = false;

        breadcrumbs.options = { 'Stores': $routeParams.friendlyUrl };

        $scope.GetProducts = function () {
            storesService.getStoreProducts($scope, $http)
             .then(function (response) {
                 $scope.products = response.data;
             },
          function (err) {
              $scope.message = err.error_description;
          });
        }

        function InitializeStores() {
            var storeId = ($routeParams.storeId) ? parseInt($routeParams.storeId) : 0;
            var branchId = ($routeParams.branchId) ? parseInt($routeParams.branchId) : 0;
            var productId = ($routeParams.productId) ? parseInt($routeParams.productId) : 0;
            $scope.EnableBuy = false;

            storesService.getStoreInfo($http, storeId)
            .then(function (response) {
                $scope.StoreInfo = response.data;
                if (branchId > 0) {
                    $scope.selectedBranchId = branchId
                    // RefreshBranchAddress();
                    $scope.EnableBuy = response.data.Branches[0].EnableBuy;
          
                    loadSellerRating();
                }
                else
                {
                    $scope.selectedBranchId = response.data.Branches[0].BranchId;
                    //  RefreshBranchAddress();
                    $scope.EnableBuy = response.data.Branches[0].EnableBuy;
                 
                    loadSellerRating();
                }
            },
         function (err) {
             $scope.message = err.error_description;
         });

            $scope.RefreshBranchAddress = function () {
                //var branchId = $scope.selectedBranchId
                //var currentBranch = $scope.StoreInfo.Branches
                //$scope.branchAddress.Address1 = "Add1";
                //$scope.branchAddress.Address2 = "";
                //$scope.branchAddress.City = "";
                //$scope.branchAddress.State = "State";
                loadSellerRating();

            }
            storesService.getFilter($http, storeId, productId)
               .then(function (response) {
                   $scope.filterList = response.data;
                   if (response.data.SelectedFilters.SelectedCategory) {
                       $scope.filters.selectedCategory = response.data.SelectedFilters.SelectedCategory;
                       $scope.filters.selectedSubCategory = response.data.SelectedFilters.SelectedSubCategory;
                   }
                   else
                   {                       
                       $scope.filters.selectedSubCategory = response.data.SubCategoryFilter[0].CategoryId;
                       $scope.filters.selectedCategory = response.data.SubCategoryFilter[0].ParentCategoryId;
                   }
                   $scope.GetProducts();
               },
            function (err) {
                $scope.message = err.error_description;
            });
        }

        function loadSellerRating() {
            storesService.getRatings($scope, $http, $scope.selectedBranchId)
           .then(function (results) {
               var ratingValue = CalculateStarRating(results.data);
               $scope.branchRating = ratingValue.toFixed(1);
           });
        }       

        $scope.onSellerRatingChanged = function (rating) {
            if ($scope.userName && $scope.userName.length > 0) {
                storesService.updateRatings($scope, $http, $scope.userName, $scope.selectedBranchId, rating)
           .then(function (results) {
               var ratingValue = CalculateStarRating(results.data);
               $scope.branchRating = ratingValue.toFixed(1);
           });
            }
            else {
                loadSellerRating();
                $('#modal-container-Register').modal({
                    show: true
                });

            }
        }
        var CalculateStarRating = function (ratingList) {
            var rating = 0;
            var totalCount = 0;
            for (var i = 0; i < ratingList.length; i++) {
                rating = rating + (ratingList[i].Rating * ratingList[i].RatingCount);
                totalCount = totalCount + ratingList[i].RatingCount
            }
            return rating / totalCount;
        }

        InitializeStores();

       

        $scope.ContactSeller = function (contactData, branchid, productId) {
            contactData.message = "";
            if (!contactData.Mobile || contactData.Mobile.toString().length != 10) {
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
                   else if (result.statusText == 'OK') {
                       contactData.savedSuccessfully = true
                       contactData.message = "Message Sent";
                       $timeout(function () {
                           contactData.message = '';
                       }, 4000);
                   }
                   else {
                       contactData.savedSuccessfully = false
                       contactData.message = "Sorry. Please resend the details.";
                   }
               });
            }
            return false;
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

        function updateComparisonProductIdList() {
            $rootScope.comparisonlistProductId.splice(0, $rootScope.comparisonlistProductId.length);
            for (var i = 0; i < $rootScope.comparisonlist.length; i++) {
                $rootScope.comparisonlistProductId.push($rootScope.comparisonlist[i].ProductId);
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
    }
}]);