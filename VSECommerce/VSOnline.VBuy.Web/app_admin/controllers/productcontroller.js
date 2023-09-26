 ////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
//</copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce
///////////////////////////////////////////////////////////////////////////////////////////
 app_admin.controller('AdminCategoryController', ['$rootScope', '$scope', '$http', '$routeParams', '$timeout', '$location'
    ,'adminProductService', 'authInterceptorService',
function ($rootScope, $scope, $http, $routeParams, $timeout, $location, adminProductService, authInterceptorService) {
    {
        $scope.savedSuccessfully = false;
        $scope.message = "";
        $scope.filterParentCategoryList = {};
        $scope.newCategory = {};

        InitializeCategorySpecifications();

        function InitializeCategorySpecifications() {
            $scope.categoryId = ($routeParams.categoryId) ? parseInt($routeParams.categoryId) : 0;


            adminProductService.getParentCategory($http)
                .then(function (response) {
                    $scope.filterParentCategoryList = response.data;
                });
            loadCategoryData();
        }

        function loadCategoryData() {
            adminProductService.getCategory($scope, $http)
               .then(function (response) {
                   if (response.data != null)
                   {
                       $scope.newCategory = response.data;
                       $scope.selectedCategory = response.data.ParentCategoryId;
                   }
               });
        }

        $scope.changeProductCategory = function () {
            $scope.newCategory.selectedCategory = $scope.selectedCategory;
        }

        $scope.CreateCategory = function (newCategory) {
            $scope.newCategory.selectedCategory = $scope.selectedCategory;
            adminProductService.insertCategory($scope, $http, newCategory)
              .then(function (response) {
                  if (response.data.StatusString === 'Success') {
                      $scope.savedSuccessfully = true;
                      $scope.message = newCategory.Name + " - Updated. Redirecting to Update Filter Parameters";
                      if ($scope.selectedCategory > 0) {
                          $timeout(function () {
                              $location.path('/updatecategoryfilter/' + response.data.UpdatedId);
                          }, 2000);
                      }
                  }
                  else {
                      $scope.savedSuccessfully = false;
                      $scope.message = " Error updating Category " + newCategory.Name;
                  }

              },
           function (err) {
               $scope.message = err.error_description;
           });
        }
    }
}]);

app_admin.controller('AdminCategoryFilterController', ['$rootScope', '$scope', '$http', '$routeParams',
    'adminProductService', 'authInterceptorService',
function ($rootScope, $scope, $http, $routeParams, adminProductService, authInterceptorService) {
    {
        $scope.savedSuccessfully = false;
        $scope.message = "";
        $scope.filterList = {};
        $scope.categoryFilters = {};
        $scope.filterRows = [{}];
        $scope.addfilterRow = function () {
            $scope.filterRows.push({
            });
        };

        InitializeCategorySpecifications();

        function InitializeCategorySpecifications() {
            $scope.categoryId = ($routeParams.categoryId) ? parseInt($routeParams.categoryId) : 0;

            adminProductService.getCategory($scope, $http)
               .then(function (response) {
                   $scope.category = response.data;
                   $scope.categoryId = $scope.category.categoryId;
               });

            loadCategoryFilters();

        }

        function loadCategoryFilters() {
            adminProductService.getCategoryFilters($scope, $http)
               .then(function (response) {
                   $scope.filterRows = response.data;
                   if ($scope.filterRows.length == 0) {
                       $scope.addfilterRow();
                   }
               });
        }

        $scope.updateFilterParameters = function () {
            adminProductService.updateFilterParameters($scope, $http, $scope.categoryId, $scope.filterRows)
                   .then(function (response) {
                       $scope.flagUpdated = response.data
                       if ($scope.flagUpdated == true) {
                           $scope.savedSuccessfully = true;
                           $scope.message = "Updated Filter Parameters";
                           loadCategoryFilters();
                       }
                       else
                       {
                           $scope.savedSuccessfully = false;
                           $scope.message = "Update unsuccessful";
                       }
                   });
        }
    }
}]);
